import os
import json
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from agents import Runner

from models import (
    GenerateRoutesRequest,
    GenerateGuideRequest,
    GuideOutput,
)
from guide_agents import etnografo, arquitecto

load_dotenv(dotenv_path="env.local")


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(
    title="EUREKA Guide Builder API",
    description="Pipeline multi-agente para generación de guías de indagación pedagógica",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "pipeline": ["etnografo", "investigador", "validador", "arquitecto"],
    }


@app.post("/api/guide/routes")
async def generate_routes(request: GenerateRoutesRequest):
    """
    Agente 1 — El Etnógrafo de Datos.
    Recibe ubicación + nivel, devuelve 3 rutas de aprendizaje contextualizadas.
    El usuario elige una ruta antes de llamar a /api/guide/generate.
    """
    try:
        result = await Runner.run(
            etnografo,
            f"Ubicación: {request.location}\nNivel educativo: {request.level}\nTema: {request.topic}",
        )
        return result.final_output.model_dump()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/api/guide/generate")
async def generate_guide(request: GenerateGuideRequest):
    """
    Pipeline Agentes 2 → 3 → 4 con Server-Sent Events.

    Eventos emitidos:
    - agent_start  { step, agent, name, message }
    - agent_done   { step, agent, output }
    - complete     { guide }
    - error        { message }
    """

    async def stream():
        try:
            # ── Agente 2: Arquitecto ───────────────────────────────────────────
            yield _sse("agent_start", {
                "step": 2,
                "agent": "arquitecto",
                "name": "El Arquitecto Pedagógico",
                "message": "Estructurando los momentos pedagógicos de la sesión...",
            })

            result = await Runner.run(
                arquitecto,
                f"Nivel educativo: {request.level}\n"
                f"Ubicación: {request.location}\n"
                f"Ruta: {request.chosen_route.title}\n"
                f"Descripción: {request.chosen_route.description}\n"
                f"Contexto local: {request.chosen_route.local_context}\n"
                f"Materiales disponibles: {', '.join(request.chosen_route.key_materials)}",
            )
            guide: GuideOutput = result.final_output
            yield _sse("agent_done", {
                "step": 2,
                "agent": "arquitecto",
                "output": guide.model_dump(),
            })

            yield _sse("complete", {"guide": guide.model_dump()})

        except Exception as exc:
            yield _sse("error", {"message": str(exc)})

    return StreamingResponse(
        stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
