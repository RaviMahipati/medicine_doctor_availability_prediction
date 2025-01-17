

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score


data = pd.read_csv('Medicine_Avaibility.csv')

data.head()

data.dropna(inplace=True)

categorical_cols = data.select_dtypes(include=['object']).columns

for col in categorical_cols:
    data[col] = LabelEncoder().fit_transform(data[col])

X = data.drop('Avaibility', axis=1)
y = data['Avaibility']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=52)

rf_model = RandomForestClassifier(n_estimators=100, random_state=42)

rf_model.fit(X_train, y_train)

y_pred = rf_model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy of the Random Forest model: {accuracy:.2f}")

feature_importances = rf_model.feature_importances_
features = X.columns
indices = np.argsort(feature_importances)

plt.figure(figsize=(10, 6))
plt.title('Feature Importances')
plt.barh(range(len(indices)), feature_importances[indices], color='b', align='center')
plt.yticks(range(len(indices)), [features[i] for i in indices])
plt.xlabel('Relative Importance')
plt.show()

