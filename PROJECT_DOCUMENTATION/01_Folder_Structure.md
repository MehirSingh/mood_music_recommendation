# Folder Structure

## 1. Complete Folder Tree
```text
Swar_Manovigyan_ML/
├── data/
│   ├── audio/
│   └── processed/
├── docs/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── emotion/
│   │   │   ├── layout/
│   │   │   ├── models/
│   │   │   ├── music/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   └── types/
├── models/
├── scripts/
├── src/
│   ├── backend/
│   ├── frontend/
│   ├── models/
│   └── utils/
├── tests/
└── PROJECT_DOCUMENTATION/
```

## 2. Purpose of Every Folder

### Root folders
- `data/` — raw and processed datasets used for training and inference
- `docs/` — repository documentation, reports, and implementation notes
- `frontend/` — Next.js app and its UI components
- `models/` — serialized trained models and supporting metadata files
- `scripts/` — data-generation and retraining utilities
- `src/` — core Python implementation for backend, ML, and legacy UI
- `tests/` — automated tests for utilities, models, and inference behavior
- `PROJECT_DOCUMENTATION/` — this documentation bundle

### Frontend subfolders
- `frontend/src/app/` — app router pages and API proxy routes
- `frontend/src/components/` — reusable UI blocks grouped by concern
- `frontend/src/hooks/` — custom hooks for data flow and analysis state
- `frontend/src/lib/` — shared utilities and constants
- `frontend/src/services/` — API client wrappers
- `frontend/src/types/` — TypeScript interfaces and type aliases

### Backend / ML subfolders
- `src/backend/` — FastAPI server entry point and app lifecycle
- `src/frontend/` — legacy Streamlit application
- `src/models/` — model definitions and training orchestration
- `src/utils/` — reusable logic for features, data prep, inference, and Azure services

## 3. Purpose of Every Source File

### Python source files
- [src/backend/server.py](../src/backend/server.py) — FastAPI backend, request handlers, model loading, recommendations, status reporting
- [src/frontend/app.py](../src/frontend/app.py) — legacy Streamlit front-end for manual and audio-based analysis
- [src/train_av.py](../src/train_av.py) — trains the tabular AV regressor
- [src/train_av_mel.py](../src/train_av_mel.py) — trains the mel-spectrogram-based regressor
- [src/inference_av.py](../src/inference_av.py) — CLI inference entry point
- [src/models/av_regressor.py](../src/models/av_regressor.py) — BiLSTM regressor architecture and training utilities
- [src/models/lstm_model.py](../src/models/lstm_model.py) — LSTM and CNN classifier implementations
- [src/models/baseline_models.py](../src/models/baseline_models.py) — traditional ML baselines
- [src/models/training_pipeline.py](../src/models/training_pipeline.py) — orchestrates training jobs
- [src/models/train_lstm_only.py](../src/models/train_lstm_only.py) — lightweight LSTM-only training workflow
- [src/utils/audio_features.py](../src/utils/audio_features.py) — audio-to-feature engineering and mel extraction
- [src/utils/data_analysis.py](../src/utils/data_analysis.py) — emotion labeling and preprocessing helpers
- [src/utils/feature_stats.py](../src/utils/feature_stats.py) — normalization/statistics helpers for inference
- [src/utils/azure_openai_service.py](../src/utils/azure_openai_service.py) — optional Azure OpenAI integration
- [src/utils/azure_speech_service.py](../src/utils/azure_speech_service.py) — optional Azure Speech integration

### Frontend source files
- [frontend/src/app/page.tsx](../frontend/src/app/page.tsx) — main page and orchestrator for user analysis flow
- [frontend/src/hooks/use-emotion-analysis.ts](../frontend/src/hooks/use-emotion-analysis.ts) — shared analysis state and request orchestration
- [frontend/src/services/api.ts](../frontend/src/services/api.ts) — API wrapper for backend calls
- [frontend/src/lib/utils.ts](../frontend/src/lib/utils.ts) — utility functions for emotion math and formatting
- [frontend/src/types/index.ts](../frontend/src/types/index.ts) — type definitions for app data
- [frontend/src/app/api/analyze/route.ts](../frontend/src/app/api/analyze/route.ts) — Next.js proxy for analysis requests
- [frontend/src/app/api/recommend/route.ts](../frontend/src/app/api/recommend/route.ts) — Next.js proxy for recommendations
- [frontend/src/app/api/status/route.ts](../frontend/src/app/api/status/route.ts) — backend status proxy
- [frontend/src/app/api/tts/route.ts](../frontend/src/app/api/tts/route.ts) — text-to-speech proxy

### Component files
- [frontend/src/components/emotion](../frontend/src/components/emotion) — forms and result panels
- [frontend/src/components/layout](../frontend/src/components/layout) — header, sidebar, navigation
- [frontend/src/components/models](../frontend/src/components/models) — model status and comparison UI
- [frontend/src/components/music](../frontend/src/components/music) — recommendation display
- [frontend/src/components/ui](../frontend/src/components/ui) — reusable UI primitive wrappers

## 4. Entry Point of the Application
- Backend entry point: [src/backend/server.py](../src/backend/server.py)
- Modern frontend entry point: [frontend/src/app/page.tsx](../frontend/src/app/page.tsx)
- Legacy UI entry point: [src/frontend/app.py](../src/frontend/app.py)

## 5. Dependency Relationships Between Files
- The UI depends on the API client in [frontend/src/services/api.ts](../frontend/src/services/api.ts)
- The API client depends on the Next.js route proxies
- The route proxies call the FastAPI backend
- The backend depends on model and utility modules
- Training scripts depend on model classes and data-analysis utilities
- Inference scripts depend on audio feature extraction and the regressor model
