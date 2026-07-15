# Project Overview

## 1. Project Objective
Swar_Manovigyan_ML is an emotion-aware music therapy system that predicts emotional state from audio-derived features and recommends music in a therapeutic style. The project combines audio analysis, machine learning, backend APIs, and a modern web interface.

## 2. Problem Statement
Traditional music recommendation systems mostly optimize for popularity, genre, or user history. This project addresses a different problem: helping users with emotional regulation by identifying current mood and suggesting music that is emotionally appropriate.

## 3. Target Users
- Individuals seeking mood-aware music recommendations
- Students or researchers studying emotion recognition
- Developers evaluating a full-stack ML application
- Teams building therapeutic or wellness-oriented recommendation products

## 4. Main Features
- Manual arousal/valence input
- Audio-feature-based emotion analysis
- Audio upload for prediction
- Four-quadrant emotion classification
- Music recommendations with fallback logic
- Optional Azure OpenAI and Azure Speech integration
- Modern Next.js frontend plus a legacy Streamlit interface

## 5. Technologies Used
### Python
- TensorFlow / Keras
- scikit-learn
- pandas, NumPy
- librosa, soundfile
- FastAPI, uvicorn
- joblib, python-dotenv

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- shadcn-style UI components

## 6. Overall Architecture
The repository follows a layered architecture:

```text
User Input -> Frontend (Next.js / Streamlit) -> FastAPI Backend -> ML Models / Audio Utils -> Recommendations / Insights -> UI
```

### Main layers
- Presentation layer: frontend components and pages
- API layer: FastAPI endpoints
- Processing layer: audio feature extraction and inference
- ML layer: regression/classification models and training pipeline
- Persistence layer: local files, CSV, model artifacts, JSON stats

## 7. End-to-End Workflow
1. User provides input through manual sliders, feature form, or audio upload.
2. The frontend sends the request to the backend API.
3. The backend builds feature sequences or extracts audio features.
4. The ML models predict arousal/valence and emotion class.
5. The app returns results, recommendations, and optional insight text.
6. The UI renders the final output and recommendation cards.

## 8. High-Level Interview Explanation
This project is a strong example of applied machine learning because it demonstrates not only model training but also deployment, API design, and user-facing product integration. It shows how a model can move from research code to a real system that accepts user input, performs inference, and returns meaningful recommendations.
