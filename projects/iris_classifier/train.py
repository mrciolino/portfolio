import pickle as pkl
from sklearn import datasets
from sklearn.model_selection import cross_val_score

from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier


# load data
iris = datasets.load_iris()
X, y = iris.data, iris.target


def train_save_model(clf, file):
    clf.fit(X, y)
    scores = cross_val_score(clf, X, y, cv=5)
    print(clf.__class__, scores.mean())
    with open(file, 'wb') as file:
        s = pkl.dump(clf, file)
        file.close()


models = [[GaussianNB(), "projects/test project/model/iris_model_naive_bayes.pkl"],
          [SVC(gamma='scale'), "projects/test project/model/iris_model_svc.pkl"],
          [KNeighborsClassifier(n_neighbors=3), "projects/test project/model/iris_model_knn.pkl"],
          [RandomForestClassifier(n_estimators=3), "projects/test project/model/iris_model_random_forest.pkl"]]

for model in models:
    train_save_model(*model)