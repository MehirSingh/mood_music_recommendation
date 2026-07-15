# Interview Guide

## 1. Major Module: FastAPI Backend
### Common interview questions
- How does the backend handle both manual and upload-based analysis?
- Why is the system designed to degrade gracefully when models are unavailable?
- How do you structure request validation in FastAPI?

### Deep follow-up questions
- What is the difference between using the LSTM classifier and the AV regressor?
- How would you scale this backend if many users uploaded audio simultaneously?
- What changes would you make for production deployment?

### Common mistakes candidates make
- Confusing the classification and regression paths
- Ignoring the fallback logic for missing Azure credentials
- Overlooking the role of the frontend route proxies

### How to explain it confidently
Say that the backend is the orchestration layer that turns user input into model-ready data, runs inference, and returns structured results with resilience and fallback support.

## 2. Major Module: Audio Feature Extraction
### Common interview questions
- Why is feature extraction needed before inference?
- What is the difference between tabular and mel-spectrogram features?

### Deep follow-up questions
- How would you improve the robustness of audio preprocessing?
- Why use mel-spectrograms instead of raw waveform input here?

### Common mistakes candidates make
- Treating audio features as simple scalar values without sequence context
- Ignoring normalization and resampling details

### How to explain it confidently
Emphasize that audio feature extraction converts raw audio into structure suitable for sequence models while preserving enough signal for emotion prediction.

## 3. Major Module: BiLSTM Regressor
### Common interview questions
- Why use a BiLSTM for arousal and valence prediction?
- What is the benefit of a sequence model over a flat classifier?

### Deep follow-up questions
- How do you handle varying-length input sequences?
- What are the tradeoffs between regression and classification for emotion recognition?

### Common mistakes candidates make
- Assuming the model directly predicts from raw audio
- Forgetting about sequence padding and windowing

### How to explain it confidently
Describe it as a temporal model that learns patterns across consecutive frames rather than treating each sample as independent.

## 4. Major Module: Frontend and UX
### Common interview questions
- How does the frontend communicate with the backend?
- Why is the app designed with both a modern and a legacy UI?

### Deep follow-up questions
- How would you add authentication or user accounts?
- What would you change if the app needed to support real-time streaming results?

### Common mistakes candidates make
- Ignoring the role of the API route proxies
- Not mentioning the separation between UI state and backend state

### How to explain it confidently
Explain that the UI is a thin client that collects input, routes requests, and renders the returned analysis clearly.

## 5. Major Module: Azure Integrations
### Common interview questions
- What happens if Azure OpenAI is not configured?
- Why are these integrations optional instead of core requirements?

### Deep follow-up questions
- How would you design failover behavior for external APIs?
- How would you secure secrets in a real deployment?

### Common mistakes candidates make
- Treating Azure services as mandatory for the app to function
- Not mentioning graceful fallback behavior

### How to explain it confidently
Say that the application is intentionally resilient; it works with local heuristics and deterministic recommendations when external services are unavailable.
