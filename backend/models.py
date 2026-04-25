from pydantic import BaseModel, Field


# ── Agente 1: Etnógrafo ────────────────────────────────────────────────────────

class Route(BaseModel):
    id: int
    title: str
    description: str
    local_context: str
    key_materials: list[str]

class RoutesOutput(BaseModel):
    community_context: str
    routes: list[Route]


# ── Agente 2: Investigador ─────────────────────────────────────────────────────

class Experiment(BaseModel):
    name: str
    objective: str
    materials: list[str]
    steps: list[str]
    expected_result: str

class InvestigatorOutput(BaseModel):
    main_concept: str
    scientific_explanation: str
    local_adaptation: str
    key_facts: list[str]
    experiments: list[Experiment]


# ── Agente 3: Validador ────────────────────────────────────────────────────────

class ValidatedExperiment(BaseModel):
    name: str
    is_safe: bool
    materials_locally_available: bool
    steps: list[str]
    safety_notes: str
    is_approved: bool

class ValidatorOutput(BaseModel):
    curriculum_competencies: list[str]
    validated_explanation: str
    validated_experiments: list[ValidatedExperiment]
    corrections_made: list[str]
    grade_appropriate: bool


# ── Agente 4: Arquitecto ───────────────────────────────────────────────────────

class InicioPedagogico(BaseModel):
    duration_minutes: int
    motivating_activity: str
    cognitive_conflict: str
    teacher_questions: list[str]

class DesarrolloPedagogico(BaseModel):
    duration_minutes: int
    problem_statement: str
    hypothesis_guide: str
    inquiry_plan: str
    teacher_questions: list[str]

class CierrePedagogico(BaseModel):
    duration_minutes: int
    metacognition_questions: list[str]
    evaluation_criteria: list[str]
    reflection_activity: str

class GuideOutput(BaseModel):
    title: str
    grade_level: str
    total_duration_minutes: int
    learning_objective: str
    inicio: InicioPedagogico
    desarrollo: DesarrolloPedagogico
    cierre: CierrePedagogico
    materials_list: list[str]
    curriculum_alignment: list[str]


# ── Request/Response de la API ─────────────────────────────────────────────────

class GenerateRoutesRequest(BaseModel):
    location: str = Field(examples=["Cusco, Perú - Zona altoandina"])
    level: str = Field(examples=["4to grado de primaria"])
    topic: str = Field(examples=["Contaminación del agua"])

class GenerateGuideRequest(BaseModel):
    location: str
    level: str
    chosen_route: Route
