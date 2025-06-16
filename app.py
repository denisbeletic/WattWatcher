from flask import Flask, render_template, jsonify, url_for, make_response, request

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/mjerna_mjesta")
def mjerna_mjesta():
    return render_template('mjerna_mjesta.html')

@app.route("/potrosnja")
def potrosnja():
    return render_template('potrosnja.html')

@app.route("/vizualizacija")
def vizualizacija():
    return render_template('vizualizacija.html')

@app.route("/statistika")
def statistika():
    return render_template('statistika.html')

@app.route("/kalkulator")
def kalkulator():
    return render_template('kalkulator.html')

if __name__ == "__main__":
    app.run(port=8080, debug=True)

