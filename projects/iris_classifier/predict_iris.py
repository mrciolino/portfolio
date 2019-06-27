from joblib import load
import warnings
import os

# read in the inputs
input = [5, 1, 7, 2]

# load model
model_pkls = ["projects/iris_classifier/model/iris_model_naive_bayes.joblib",
              "projects/iris_classifier/model/iris_model_svc.joblib",
              "projects/iris_classifier/model/iris_model_knn.joblib",
              "projects/iris_classifier/model/iris_model_random_forest.joblib",
              "projects/iris_classifier/model/iris_model_nerual.joblib"]


warnings.filterwarnings("ignore")


def run_iris(input):

    predictions = []

    def predict(clf, input):
        # predict
        prediction_index = clf.predict([input])
        prediction = ['setosa', 'versicolor', 'virginica'][int(prediction_index)]

        # return the results
        predictions.append(prediction)

    for model in model_pkls:
        with open(os.getcwd() + '/' + model, 'rb') as file:
            clf = load(file)
            file.close()
        predict(clf, input)

    return [max(predictions, key=predictions.count), predictions]
