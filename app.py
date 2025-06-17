from flask import Flask, render_template, jsonify, url_for, make_response, redirect, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///wattwatcher.db'
db = SQLAlchemy(app)


class Popis_mm(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    broj_omm = db.Column(db.Integer, nullable = False)
    vlasnik = db.Column(db.String(200))
    adresa = db.Column(db.String(200))
    postanski_broj = db.Column(db.Integer)

    def __repr__(self):
        return '- ID: %r -' % self.id


@app.route("/", methods=["GET"])
def index():
    return render_template('index.html')



@app.route("/mjerna_mjesta", methods=["GET", "POST"])
def mjerna_mjesta():
    if request.method == "POST":
        novo_mm = Popis_mm(
            broj_omm = int(request.form.get('broj_omm')),
            vlasnik = request.form.get('vlasnik'),
            adresa = request.form.get('adresa'),
            postanski_broj = int(request.form.get('postanski_broj'))
        )

        db.session.add(novo_mm)
        db.session.commit()

        return redirect(url_for('mjerna_mjesta'))
    else:
        pokazi_mm = Popis_mm.query.order_by(Popis_mm.id).all()
        return render_template('mjerna_mjesta.html', pokazi_mm = pokazi_mm)

@app.route("/mjerna_mjesta/delete/", methods=["POST"])
def delete():
    id = request.form.get('uklanjanje_mm_odabir')
    mm_target = Popis_mm.query.get(id)
    db.session.delete(mm_target)
    db.session.commit()
    return redirect(url_for('mjerna_mjesta'))

@app.route("/mjerna_mjesta/edit/", methods=["GET", "POST"])
def edit():
    if request.method == "POST":
        id = request.form.get('edit_id')
        broj_omm = request.form.get('edit_broj_omm')
        vlasnik = request.form.get('edit_vlasnik')
        adresa = request.form.get('edit_adresa')
        postanski_broj = request.form.get('edit_postanski_broj')

        mm_target = Popis_mm.query.get(id)
        mm_target.broj_omm = broj_omm
        mm_target.vlasnik = vlasnik
        mm_target.adresa = adresa
        mm_target.postanski_broj = postanski_broj

        db.session.commit()
        return redirect(url_for('mjerna_mjesta'))



@app.route("/potrosnja", methods=["GET"])
def potrosnja():
    return render_template('potrosnja.html')



@app.route("/vizualizacija", methods=["GET"])
def vizualizacija():
    return render_template('vizualizacija.html')



@app.route("/statistika", methods=["GET"])
def statistika():
    return render_template('statistika.html')



@app.route("/kalkulator", methods=["GET"])
def kalkulator():
    return render_template('kalkulator.html')



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(port=8080, debug=True)