# API and Backend Documentation

## 1. Backend Overview
The backend is implemented with FastAPI in [src/backend/server.py](../src/backend/server.py). It exposes REST endpoints for emotion analysis, recommendation generation, status checks, and text-to-speech.

## 2. Endpoint Catalog

| Route | Method | Request | Response | Controller |
|---|---|---|---|---|
| `/analyze` | POST | manual or feature-based payload | emotion label, confidence, A/V values | `analyze_emotion()` |
| `/analyze/upload` | POST | uploaded audio file | emotion result plus extracted features | `analyze_upload()` |
| `/recommend` | POST | emotion quadrant and coordinates | recommendation styles, tracks, AI flag | `recommend()` |
| `/api/analyze/insight` | POST | emotion quadrant and coordinates | therapeutic insight text | `analyze_insight()` |
| `/api/analyze/models` | POST | feature payload | model comparison predictions | `analyze_models()` |
| `/api/status` | GET | none | availability of services and models | `get_status()` |
| `/tts` | POST | text payload | WAV audio bytes | `text_to_speech()` |

## 3. Endpoint Details

### `/analyze`
- Request: object containing `method`, `arousal`, `valence`, or `features`
- Validation: ensures manual requests have A/V values and feature requests have a valid payload
- Business logic: builds a sequence tensor and runs the LSTM classifier or fallback heuristic
- Error handling: returns `400` for malformed input and `500` for internal errors

### `/analyze/upload`
- Request: multipart upload with a file field
- Validation: requires a file and checks whether the AV regressor is loaded
- Business logic: extracts audio features, runs AV regressor inference, and maps the result to a quadrant label
- Error handling: returns `503` if the model is not available and `500` for failures

### `/recommend`
- Request: emotion label plus arousal and valence
- Validation: ensures emotion label is within supported values
- Business logic: chooses style suggestions and track lists; optionally uses Azure OpenAI when configured
- Error handling: falls back to deterministic lists when AI is unavailable

### `/api/analyze/insight`
- Request: emotion label plus A/V values
- Validation: ensures the payload is structurally correct
- Business logic: calls the Azure OpenAI explanation service if configured
- Error handling: returns `503` if no explanation is available

### `/api/analyze/models`
- Request: audio feature payload
- Validation: expects a valid feature set
- Business logic: runs LSTM and baseline models for comparison
- Error handling: returns `500` on exceptions while preserving partial results when possible

### `/api/status`
- Request: none
- Validation: none
- Business logic: reports the status of Azure services and loaded model artifacts
- Error handling: simple success response with booleans

### `/tts`
- Request: text payload
- Validation: requires non-empty input and Azure Speech availability
- Business logic: synthesizes speech and returns audio bytes
- Error handling: returns `503` when Azure Speech is unavailable or `502` on empty synthesis results

## 4. Controllers and Roles
- `analyze_emotion()` handles manual and feature-based requests
- `analyze_upload()` handles audio uploads
- `recommend()` handles music suggestions
- `analyze_insight()` handles therapeutic narrative generation
- `analyze_models()` handles side-by-side model comparison
- `get_status()` handles operational monitoring
- `text_to_speech()` handles speech generation

## 5. Validation Strategy
- Pydantic models define the request shape
- Numeric ranges are constrained for audio features and emotional values
- The backend also performs runtime checks for missing files, missing models, and missing Azure configuration

## 6. Error Handling Approach
The backend uses FastAPI exceptions and returns clear HTTP statuses:
- `400` for malformed input
- `503` for unavailable services/models
- `502` for upstream or synthesis failures
- `500` for unexpected application errors

## 7. Business Logic Notes
The backend is intentionally resilient:
- It always returns a quadrant label even if the classifier is absent
- It uses fallback recommendations when Azure services are unavailable
- It degrades gracefully when TensorFlow or model files are missing
