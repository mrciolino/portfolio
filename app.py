from flask import Flask, request, render_template, jsonify
import sys
import os

sys.path.append(os.getcwd() + "/projects/test_project")
import predict


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/test_project')
def test_project():
    return render_template('test_project.html')


@app.route('/job_tag_classifier')
def job_tag_classifier():
    return render_template('job_tag_classifier.html')


@app.route('/predict_iris', methods=['POST'])
def predict_iris():
    app.logger.info('Running Iris Classifers')
    # get the data
    data = request.get_json()
    # convert data into array
    features = [float(i) for i in list(data[0].values())]
    app.logger.info(features)
    # run the prediction and return
    result = predict.run_predictions(features)
    app.logger.info(result)
    return jsonify(result=result)


if __name__ == "__main__":
    app.run(debug=True)
