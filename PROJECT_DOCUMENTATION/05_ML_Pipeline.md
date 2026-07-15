# ML Pipeline Documentation

## 1. Dataset
The project uses a Spotify-style feature dataset stored under [data/processed/spotify_features_with_emotions.csv](../data/processed/spotify_features_with_emotions.csv). The raw version is available at [data/raw/SpotifyFeatures.csv](../data/raw/SpotifyFeatures.csv).

This dataset includes audio-related features such as:
- acousticness
- danceability
- energy
- instrumentalness
- liveness
- loudness
- speechiness
- tempo
- valence

The project also derives arousal and enhanced valence values for training.

## 2. Data Preprocessing
The preprocessing workflow is implemented in [src/utils/data_analysis.py](../src/utils/data_analysis.py).

Key steps:
- load CSV data
- handle missing values
- derive arousal and enhanced valence
- create four-class emotion labels
- prepare sliding-window sequences for LSTM training

## 3. Feature Engineering
Feature engineering is split between two paths:

### Tabular path
The model uses a fixed 11-dimensional vector:
- acousticness
- danceability
- energy
- instrumentalness
- liveness
- loudness
- speechiness
- tempo
- valence
- arousal
- enhanced_valence

### Mel-spectrogram path
The project also supports frame-level mel-spectrograms from audio, allowing more temporal modeling.

## 4. Model Selection
The repository supports multiple model families:
- BiLSTM regressor for continuous A/V prediction
- LSTM classifier for four-class emotion classification
- CNN classifier as a secondary classification option
- Baselines: logistic regression, random forest, SVM, MLP

## 5. Training
### AV regressor training
- Workflow: [src/train_av.py](../src/train_av.py)
- Builds sliding-window sequences over the tabular feature data
- Saves feature statistics for later inference

### Mel-based regressor training
- Workflow: [src/train_av_mel.py](../src/train_av_mel.py)
- Extracts mel-spectrograms from audio files
- Builds frame-level sequences from consecutive frames

### Classification training
- Workflow: [src/models/training_pipeline.py](../src/models/training_pipeline.py)
- Trains LSTM, CNN, and baseline models
- Saves scaler and model artifacts under [models](../models)

## 6. Validation
The training scripts split the data into train / validation / test sets and use early stopping and learning rate reduction for the deep models.

## 7. Prediction
Prediction is performed in two main ways:
- LSTM classifier for categorical emotion labels
- AV regressor for continuous arousal/valence prediction

The backend uses the classifier for feature-based input and the regressor for uploaded audio.

## 8. Metrics
The repository evaluates models using:
- loss
- mean absolute error for regression
- accuracy
- confusion matrix
- classification report

## 9. Model Serialization
Model artifacts are saved to [models](../models), including:
- `lstm_emotion_model.keras`
- `lstm_emotion_model.h5`
- `av_regressor.keras`
- `scaler_lstm.joblib`
- baseline model joblib files
- `feature_stats_av.json`

## 10. Model Loading
The backend loads these models in [src/backend/server.py](../src/backend/server.py) during startup. The Streamlit app does the same in [src/frontend/app.py](../src/frontend/app.py).

## 11. Inference Pipeline
```text
Input -> audio feature extraction / sequence construction -> model predict -> A/V values -> quadrant mapping -> response
```

This inference pipeline is used both by the backend and by the standalone inference CLI.
