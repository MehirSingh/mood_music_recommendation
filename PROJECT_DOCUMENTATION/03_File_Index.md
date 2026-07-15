# File Index

## 1. Backend and Core Python Files

### [src/backend/server.py](../src/backend/server.py)
- Purpose: Main FastAPI backend application
- Responsibilities: request parsing, model loading, inference orchestration, recommendations, status reporting
- Important classes: `_AppState`, `AudioFeatures`, `AnalyzeRequest`, `AnalyzeResponse`
- Important functions: `_load_models()`, `_estimate_av_from_features()`, `_quadrant_from_av()`, `_predict_lstm()`, `analyze_emotion()`, `analyze_upload()`, `recommend()`
- Imports: FastAPI, numpy, dotenv, joblib, model classes, utility modules
- Exports: FastAPI app instance and route handlers
- Calls: model modules, audio feature utilities, Azure services
- Called by: frontend API routes and local server startup
- Why it exists: It acts as the application backbone for the modern web experience

### [src/frontend/app.py](../src/frontend/app.py)
- Purpose: Legacy Streamlit web app
- Responsibilities: UI for manual input, feature input, audio upload, and inference display
- Important classes: `MusicRecommendationApp`
- Important functions: `load_models()`, `estimate_av_from_features()`, `build_sequence_11_from_form()`, `predict_emotion_lstm()`, `predict_av_from_audio()`
- Imports: Streamlit, pandas, numpy, TensorFlow optional, joblib, model and utility modules
- Exports: The app object and helper methods
- Calls: baseline models, audio feature utilities, Azure services
- Called by: Streamlit runtime
- Why it exists: It preserves the original interactive UI while the project evolves

### [src/train_av.py](../src/train_av.py)
- Purpose: Train the tabular AV regressor
- Responsibilities: sequence generation, dataset splitting, training, and checkpoint export
- Important functions: `build_sequences_for_regression()`, `split_train_val_test()`, `main()`
- Imports: argparse, json, pandas, numpy, AVLSTMRegressor
- Exports: Training helpers
- Calls: [src/models/av_regressor.py](../src/models/av_regressor.py), [src/utils/data_analysis.py](../src/utils/data_analysis.py)
- Called by: CLI training runs
- Why it exists: It provides the main training workflow for the AV regressor

### [src/train_av_mel.py](../src/train_av_mel.py)
- Purpose: Train the mel-spectrogram-based regressor
- Responsibilities: audio loading, mel extraction, sequence construction, training
- Important functions: `extract_mel_spectrogram_from_file()`, `build_frame_sequences_from_mel()`, `load_audio_files_and_labels()`, `build_sequences_from_mel_files()`
- Imports: librosa, soundfile, pandas, numpy, AVLSTMRegressor
- Exports: Training helpers
- Calls: [src/models/av_regressor.py](../src/models/av_regressor.py)
- Called by: CLI training runs
- Why it exists: It enables true temporal modeling over audio frames

### [src/inference_av.py](../src/inference_av.py)
- Purpose: CLI inference for trained AV models
- Responsibilities: load a checkpoint and generate A/V predictions from audio
- Important functions: `predict_from_audio_bytes()`, `main()`
- Imports: numpy, AVLSTMRegressor, audio utilities, feature stats
- Exports: inference helpers
- Calls: [src/models/av_regressor.py](../src/models/av_regressor.py), [src/utils/audio_features.py](../src/utils/audio_features.py), [src/utils/feature_stats.py](../src/utils/feature_stats.py)
- Called by: command-line use
- Why it exists: It decouples inference from the training workflow

## 2. Model Files

### [src/models/av_regressor.py](../src/models/av_regressor.py)
- Purpose: Defines the BiLSTM regressor
- Responsibilities: architecture, training, evaluation, prediction, save/load
- Important classes: `AVLSTMRegressor`
- Important functions: `build()`, `fit()`, `evaluate()`, `predict()`, `save()`, `load()`
- Imports: TensorFlow, Keras layers, numpy
- Exports: `AVLSTMRegressor`
- Calls: TensorFlow components only
- Called by: training scripts and backend inference
- Why it exists: It provides the main continuous A/V prediction model

### [src/models/lstm_model.py](../src/models/lstm_model.py)
- Purpose: LSTM and CNN classifiers for emotion classification
- Responsibilities: classification model building, training, evaluation, plotting, saving
- Important classes: `EmotionLSTM`, `EmotionCNN1D`
- Important functions: `build_model()`, `train()`, `evaluate()`, `predict_emotion()`
- Imports: TensorFlow, scikit-learn, matplotlib, seaborn
- Exports: the two model classes
- Calls: TensorFlow/Keras and metrics libraries
- Called by: training pipeline
- Why it exists: It provides classification-based emotion recognition

### [src/models/baseline_models.py](../src/models/baseline_models.py)
- Purpose: Traditional baseline classifiers
- Responsibilities: training and evaluation for logistic regression, random forest, SVM, and MLP
- Important classes: `BaselineModels`
- Important functions: `train_logistic_regression()`, `train_random_forest()`, `train_svm()`, `train_mlp()`, `compare_models()`
- Imports: scikit-learn, joblib, matplotlib
- Exports: `BaselineModels`
- Calls: no internal project modules
- Called by: backend and training pipeline
- Why it exists: It provides comparison baselines for the deep learning model

### [src/models/training_pipeline.py](../src/models/training_pipeline.py)
- Purpose: End-to-end training orchestration
- Responsibilities: data prep, training, saving models, report generation
- Important classes: `TrainingPipeline`
- Important functions: `load_and_prepare_data()`, `train_lstm()`, `train_cnn1d()`, `train_baselines()`, `run_complete_training()`
- Imports: joblib, pandas, scikit-learn, model classes, data utils
- Exports: `TrainingPipeline`
- Calls: [src/models/lstm_model.py](../src/models/lstm_model.py), [src/models/baseline_models.py](../src/models/baseline_models.py), [src/utils/data_analysis.py](../src/utils/data_analysis.py)
- Called by: [src/models/train_lstm_only.py](../src/models/train_lstm_only.py)
- Why it exists: It standardizes the training workflow

### [src/models/train_lstm_only.py](../src/models/train_lstm_only.py)
- Purpose: LSTM-only training script
- Responsibilities: prepare data and save only the LSTM classifier and scaler
- Important functions: `main()`
- Imports: joblib, numpy, `TrainingPipeline`
- Exports: none
- Calls: [src/models/training_pipeline.py](../src/models/training_pipeline.py)
- Called by: CLI training
- Why it exists: It provides a lightweight path for training the LSTM classifier only

## 3. Utility Files

### [src/utils/audio_features.py](../src/utils/audio_features.py)
- Purpose: Extract features from raw audio
- Responsibilities: mel-spectrogram computation, audio loading, tabular feature estimation
- Important functions: `extract_mel_spectrogram_sequence()`, `extract_tabular_features_sequence()`
- Imports: numpy, librosa, logging
- Exports: feature extraction helpers and constants
- Calls: librosa and soundfile under the hood
- Called by: backend inference, Streamlit app, inference CLI
- Why it exists: It bridges raw audio into model-ready tensors

### [src/utils/data_analysis.py](../src/utils/data_analysis.py)
- Purpose: Data preparation and emotion label generation
- Responsibilities: label creation, preprocessing, visualization, distribution analysis
- Important classes: `EmotionLabeler`, `DataPreprocessor`
- Important functions: `load_and_analyze_data()`, `visualize_emotion_distribution()`
- Imports: pandas, numpy, matplotlib, seaborn, scikit-learn
- Exports: preprocessing helpers and labeler
- Calls: no internal project modules
- Called by: training scripts and preprocessing workflows
- Why it exists: It makes the dataset compatible with the training pipeline

### [src/utils/feature_stats.py](../src/utils/feature_stats.py)
- Purpose: Load and apply feature normalization statistics
- Responsibilities: save/load stats JSON and z-score transformations
- Important functions: `load_feature_stats()`, `apply_zscore()`
- Imports: json, os, numpy
- Exports: stats helpers
- Calls: none
- Called by: backend and inference scripts
- Why it exists: It ensures inference uses the same scaling policy as training

### [src/utils/azure_openai_service.py](../src/utils/azure_openai_service.py)
- Purpose: Optional Azure OpenAI integration
- Responsibilities: therapeutic explanation and AI-generated suggestions
- Important functions: `get_therapeutic_explanation()`, `get_recommendation_blurb()`, `get_ai_music_styles()`, `get_ai_sample_tracks()`
- Imports: os, logging, openai
- Exports: Azure OpenAI helpers
- Calls: Azure OpenAI SDK
- Called by: backend server
- Why it exists: It adds high-end personalization when Azure credentials are available

### [src/utils/azure_speech_service.py](../src/utils/azure_speech_service.py)
- Purpose: Optional text-to-speech integration
- Responsibilities: synthesize audio from text using Azure Speech
- Important functions: `is_azure_speech_available()`, `synthesize_text_to_wav_bytes()`
- Imports: os, logging
- Exports: speech helpers
- Calls: Azure SDK
- Called by: backend server
- Why it exists: It provides audio output for insights and recommendations

## 4. Frontend Files

### [frontend/src/app/page.tsx](../frontend/src/app/page.tsx)
- Purpose: Main Next.js page
- Responsibilities: orchestrates input method selection, analysis execution, result rendering
- Important functions: `HomePage()`
- Imports: React, UI components, hooks, services
- Exports: default React component
- Calls: hooks and child components
- Called by: Next.js router
- Why it exists: It is the application shell for the modern experience

### [frontend/src/hooks/use-emotion-analysis.ts](../frontend/src/hooks/use-emotion-analysis.ts)
- Purpose: State and orchestration hook
- Responsibilities: manage loading, errors, analysis results, and downstream requests
- Important functions: `useEmotionAnalysis()`, `analyze()`, `reset()`
- Imports: React, API service functions
- Exports: hook
- Calls: [frontend/src/services/api.ts](../frontend/src/services/api.ts)
- Called by: [frontend/src/app/page.tsx](../frontend/src/app/page.tsx)
- Why it exists: It centralizes the analysis workflow

### [frontend/src/services/api.ts](../frontend/src/services/api.ts)
- Purpose: API client wrapper
- Responsibilities: call the backend for analysis, recommendations, insight, status, and TTS
- Important functions: `analyzeManual()`, `analyzeFeatures()`, `analyzeAudio()`, `getRecommendations()`, `getInsight()`, `getModelComparison()`, `getSystemStatus()`
- Imports: type definitions and fallback constants
- Exports: API functions
- Calls: backend routes through fetch
- Called by: hook
- Why it exists: It abstracts network details from the UI layer

### [frontend/src/lib/utils.ts](../frontend/src/lib/utils.ts)
- Purpose: Shared frontend utility functions
- Responsibilities: styling helper, emotion quadrant derivation, arousal/valence estimation
- Important functions: `cn()`, `deriveEmotionQuadrant()`, `estimateArousalValence()`
- Imports: clsx, tailwind merge, types
- Exports: utility functions
- Calls: none
- Called by: UI components and services
- Why it exists: It keeps frontend logic reusable and consistent

### [frontend/src/types/index.ts](../frontend/src/types/index.ts)
- Purpose: Shared TypeScript types
- Responsibilities: define emotion, feature, recommendation, and status models
- Important types: `EmotionResult`, `AudioFeatures`, `MusicRecommendation`, `SystemStatus`
- Imports: none
- Exports: all type aliases and interfaces
- Calls: none
- Called by: app, hooks, services, and components
- Why it exists: It provides type safety across the frontend

### API proxy files
- [frontend/src/app/api/analyze/route.ts](../frontend/src/app/api/analyze/route.ts) — proxies analysis requests to FastAPI
- [frontend/src/app/api/recommend/route.ts](../frontend/src/app/api/recommend/route.ts) — proxies recommendation requests
- [frontend/src/app/api/status/route.ts](../frontend/src/app/api/status/route.ts) — proxies status checks
- [frontend/src/app/api/tts/route.ts](../frontend/src/app/api/tts/route.ts) — proxies TTS requests
