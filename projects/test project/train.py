import pickle as pkl
from sklearn import svm
from sklearn import datasets

# train
clf = svm.SVC(gamma='scale')
iris = datasets.load_iris()
X, y = iris.data, iris.target

# fit and save
clf.fit(X, y)
with open("projects/test project/model/iris_model.pkl", 'wb') as file:
    s = pkl.dump(clf, file)
    file.close()
