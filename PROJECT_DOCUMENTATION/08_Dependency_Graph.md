# Dependency Graph

## 1. High-Level Module Dependency Graph
```text
frontend/src/app/page.tsx
    └── frontend/src/hooks/use-emotion-analysis.ts
            └── frontend/src/services/api.ts
                    └── frontend/src/app/api/analyze/route.ts
                    └── frontend/src/app/api/recommend/route.ts
                    └── frontend/src/app/api/status/route.ts
                    └── frontend/src/app/api/tts/route.ts
                            └── src/backend/server.py
                                    ├── src/utils/audio_features.py
                                    ├── src/utils/feature_stats.py
                                    ├── src/utils/azure_openai_service.py
                                    ├── src/utils/azure_speech_service.py
                                    ├── src/models/baseline_models.py
                                    └── src/models/av_regressor.py
```

## 2. Training Dependency Graph
```text
src/train_av.py
    └── src/models/av_regressor.py
    └── src/utils/data_analysis.py

src/train_av_mel.py
    └── src/models/av_regressor.py

src/models/training_pipeline.py
    ├── src/models/lstm_model.py
    ├── src/models/baseline_models.py
    └── src/utils/data_analysis.py
```

## 3. Inference Dependency Graph
```text
src/inference_av.py
    ├── src/models/av_regressor.py
    ├── src/utils/audio_features.py
    └── src/utils/feature_stats.py
```

## 4. Legacy UI Dependency Graph
```text
src/frontend/app.py
    ├── src/models/baseline_models.py
    ├── src/utils/audio_features.py
    ├── src/utils/feature_stats.py
    ├── src/utils/azure_openai_service.py
    └── src/utils/azure_speech_service.py
```
