from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/')
def my_form():
    return render_template('project_1.html')


@app.route('/', methods=['POST'])
def my_form_post():
    return 'You entered: {}'.format(request.form['Description'])


@app.route('/', methods=['POST'])
def my_form_post():
    return 'You entered: {}'.format(request.form['Description'])


if __name__ == "__main":
    app.run()
