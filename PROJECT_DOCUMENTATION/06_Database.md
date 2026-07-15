# Database Documentation

## 1. Summary
This project does not use a traditional database such as PostgreSQL, MySQL, or MongoDB. The application stores its state in:
- local CSV files
- JSON files
- serialized model files
- in-memory objects during API runtime

## 2. Data Stores Used
### File-based datasets
- [data/raw/SpotifyFeatures.csv](../data/raw/SpotifyFeatures.csv)
- [data/processed/spotify_features_with_emotions.csv](../data/processed/spotify_features_with_emotions.csv)

### Model artifact storage
- [models](../models)

### Configuration and statistics
- `feature_stats_av.json`
- `mel_stats_av.json`
- `training_results.json`

## 3. Schema Conceptually
The main training dataset is tabular and has the following conceptual structure:
- `acousticness`
- `danceability`
- `energy`
- `instrumentalness`
- `liveness`
- `loudness`
- `speechiness`
- `tempo`
- `valence`
- `arousal`
- `enhanced_valence`
- `emotion_label`

## 4. Why Each Field Exists
- `energy`, `tempo`, `loudness` contribute to arousal estimation
- `valence`, `danceability`, `acousticness` contribute to valence estimation
- `arousal` and `enhanced_valence` are derived targets for regression
- `emotion_label` is the discrete class used for classification

## 5. Relationships
There are no relational tables. The data is effectively a flat table with rows representing songs or audio items and columns representing features and labels.

## 6. Queries
The project does not define database queries in the usual SQL sense. Data is loaded with pandas and processed in memory.

## 7. Notes
Because the project is primarily a research and product prototype, local file storage is sufficient. If persistence for user history or recommendation logs were needed, a database layer would be the next architectural step.
