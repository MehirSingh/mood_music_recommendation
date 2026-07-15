# Configuration Documentation

## 1. Environment Variables
The project optionally uses environment variables for Azure services.

Expected variables:
- `AZURE_OPENAI_ENDPOINT`
- `AZURE_OPENAI_API_KEY`
- `AZURE_OPENAI_DEPLOYMENT`
- `AZURE_OPENAI_API_VERSION`
- `AZURE_SPEECH_KEY`
- `AZURE_SPEECH_REGION`

These are loaded via `python-dotenv` when a `.env` file exists.

## 2. requirements.txt
The Python dependency list is defined in [requirements.txt](../requirements.txt).

It includes:
- TensorFlow
- NumPy / pandas
- scikit-learn
- librosa / soundfile
- FastAPI / uvicorn
- pytest
- Azure SDK-related packages

## 3. package.json
The modern frontend dependencies are defined in [frontend/package.json](../frontend/package.json).

Important scripts:
- `npm run dev` — start the Next.js development server
- `npm run build` — create a production build
- `npm run start` — start the built app

## 4. Docker
No Docker configuration files were found in the repository snapshot.

## 5. Config Files
- [pytest.ini](../pytest.ini) — pytest configuration
- [AGENTS.md](../AGENTS.md) — repository guidance for this workspace
- [CLAUDE.md](../CLAUDE.md) — workflow notes and principles

## 6. Startup Scripts
The project uses direct Python and Node commands rather than a dedicated startup script:
- `uvicorn src.backend.server:app --reload --port 8000`
- `streamlit run src/frontend/app.py`
- `cd frontend && npm run dev`

## 7. Notes on Configuration Strategy
The system is designed to work even when optional configs are missing. Azure features are enabled only when credentials are available; otherwise the app uses fallback logic.
