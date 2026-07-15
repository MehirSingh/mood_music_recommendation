# Execution Flow

## 1. Startup Sequence

### Backend startup
```text
uvicorn -> FastAPI app -> lifespan startup -> load models -> ready for requests
```

Steps:
1. The backend is started from [src/backend/server.py](../src/backend/server.py)
2. The app loads environment variables with `load_dotenv()`
3. The app imports model classes and utility modules
4. Model artifacts are loaded from the `models/` folder
5. The server becomes ready to receive requests

### Frontend startup
```text
Next.js dev server -> page loads -> hook initializes -> status fetch -> UI ready
```

Steps:
1. The user opens the app in the browser
2. The main page in [frontend/src/app/page.tsx](../frontend/src/app/page.tsx) mounts
3. The analysis hook initializes state
4. The UI fetches system status from the backend
5. The user can begin interacting with the app

## 2. Configuration Loading
- Environment variables are loaded from `.env` when present
- Azure-related settings are optional and improve functionality only when configured
- The app uses fallback behavior if config is missing

## 3. API Initialization
The FastAPI app:
- creates Pydantic request/response models
- defines CORS rules
- loads the ML models on startup
- exposes routes for analysis, recommendations, insight, status, and TTS

## 4. Request Lifecycle
### Manual or feature analysis
```text
Frontend form -> Next.js route -> FastAPI /analyze -> feature sequence builder -> LSTM inference -> emotion result -> response
```

### Audio upload analysis
```text
Audio file -> upload route -> audio feature extraction -> AV regressor -> A/V values -> quadrant mapping -> response
```

### Recommendation flow
```text
Emotion result -> /recommend -> style selection -> fallback or Azure-generated playlist -> response
```

## 5. Data Flow
- User input is normalized into a request object
- Feature-based requests build a fixed-size sequence tensor
- Audio uploads are transformed into tabular or mel-based input
- The model outputs predictions that are mapped to a quadrant label
- The response is rendered as UI cards, charts, and recommendation blocks

## 6. ML Pipeline Flow
```text
Dataset -> preprocessing -> feature engineering -> sequence construction -> train/validate/test -> model artifact -> inference
```

### Inference path
```text
Input features/audio -> feature extraction -> sequence tensor -> model predict -> confidence + emotion label -> UI
```

## 7. Response Generation
The backend returns:
- emotion label
- arousal/valence values
- confidence score
- optional probabilities
- recommendation styles and tracks
- optional therapeutic insight

The frontend then displays:
- result cards
- recommendation sections
- model comparison panels
- status indicators
