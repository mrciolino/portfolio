import matplotlib.pyplot as plt
from sklearn import datasets
import seaborn as sns
import pickle as pkl

# load info on the dataset
iris = datasets.load_iris()

# load model
with open("projects/test project/model/iris_model.pkl", 'rb') as file:
    clf = pkl.load(file)
    file.close()

# read in the inputs
input = [5, 1, 7, 2]

# predict
prediction_index = clf.predict([input])
prediction = list(iris.target_names)[int(prediction_index)]

# create input heatmap
sns.heatmap((input,), linewidths=.5, square=True, cbar=False)

# return the results
print(prediction)
plt.show()
