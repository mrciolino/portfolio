from joblib import dump
from sklearn import datasets
from sklearn.model_selection import cross_val_score

from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier

# load data
iris = datasets.load_iris()
X, y = iris.data, iris.target


def train_save_model(clf, file):
    clf.fit(X, y)
    scores = cross_val_score(clf, X, y, cv=5)
    print(clf.__class__, scores.mean())
    with open(file, 'wb') as file:
        s = dump(clf, file)
        file.close()

models = [[GaussianNB(), "projects/iris_classifier/model/iris_model_naive_bayes.joblib"],
          [SVC(gamma='scale'), "projects/iris_classifier/model/iris_model_svc.joblib"],
          [KNeighborsClassifier(n_neighbors=3), "projects/iris_classifier/model/iris_model_knn.joblib"],
          [RandomForestClassifier(n_estimators=3), "projects/iris_classifier/model/iris_model_random_forest.joblib"],
          [MLPClassifier(solver='lbfgs', alpha=.01, hidden_layer_sizes=(15, 10), random_state=1), "projects/iris_classifier/model/iris_model_nerual.joblib"]]

for model in models:
    train_save_model(*model)
