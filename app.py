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
    ocitanja = db.relationship("Ocitanje_mm", backref = "mjerno_mjesto")

    def __repr__(self):
        return '- ID: %r -' % self.id


class Ocitanje_mm(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    mjesec = db.Column(db.Integer, nullable = False)     # morao sam promijeniti, ne treba mi cijeli datetime, samo mjesec i godina
    godina = db.Column(db.Integer, nullable = False)
    val_vt = db.Column(db.Float, nullable = False)
    val_nt = db.Column(db.Float, nullable = False)
    id_mm = db.Column(db.Integer, db.ForeignKey("popis_mm.id"), nullable = False)   # popis_mm je ime tablice -> imena tablice su po defaultu lowercase verzije imena klase 

    def __repr__(self):
        return '< ID: %r >' % self.id



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
def delete_mm():
    id = request.form.get('uklanjanje_mm_odabir')
    mm_target = Popis_mm.query.get(id)
    db.session.delete(mm_target)
    db.session.commit()
    return redirect(url_for('mjerna_mjesta'))

@app.route("/mjerna_mjesta/edit/", methods=["POST"])
def edit_mm():
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



@app.route("/potrosnja", methods=["GET", "POST"])
def potrosnja():
    if request.method == "POST":
        novo_ocitanje = Ocitanje_mm(
            mjesec = request.form.get('mjesec'),
            godina = request.form.get('godina'),
            val_vt = request.form.get('val_vt'),
            val_nt = request.form.get('val_nt'),
            id_mm = request.form.get('id_mm')
        )

        db.session.add(novo_ocitanje)
        db.session.commit()
        return redirect(url_for('potrosnja'))

    else:
        pokazi_mm = Popis_mm.query.order_by(Popis_mm.id).all()
        pokazi_ocitanja = Ocitanje_mm.query.order_by(Ocitanje_mm.id_mm, Ocitanje_mm.godina, Ocitanje_mm.mjesec).all()
        return render_template('potrosnja.html', pokazi_mm = pokazi_mm, pokazi_ocitanja = pokazi_ocitanja)

@app.route("/potrosnja/delete", methods=["POST"])
def delete_potrosnja():
    id = request.form.get('uklanjanje_potrošnje_odabir')
    potrosnja_target = Ocitanje_mm.query.get(id)
    db.session.delete(potrosnja_target)
    db.session.commit()
    return redirect(url_for('potrosnja'))

@app.route("/potrosnja/edit", methods=["POST"])
def edit_potrosnja():
    id = request.form.get('edit_id_potrosnja')
    val_vt = request.form.get('edit_val_vt')
    val_nt = request.form.get('edit_val_nt')
    mjesec = request.form.get('edit_mjesec')
    godina = request.form.get('edit_godina')

    ocitanje_target = Ocitanje_mm.query.get(id)
    ocitanje_target.val_vt = val_vt
    ocitanje_target.val_nt = val_nt
    ocitanje_target.mjesec = mjesec
    ocitanje_target.godina = godina

    db.session.commit()
    return redirect(url_for('potrosnja'))    



@app.route("/vizualizacija", methods=["GET"])
def vizualizacija():
    return render_template('vizualizacija.html')



@app.route("/statistika", methods=["GET"])
def statistika():
    pokazi_mm = Popis_mm.query.order_by(Popis_mm.id).all()
    return render_template('statistika.html', pokazi_mm = pokazi_mm, potrosnja_target=None)

@app.route("/statistika/mm/<int:stat_id_mm>", methods=["GET"])
def get_id_mm(stat_id_mm):
    # print(f'Poslao si STAT_ID_MM: {stat_id_mm}')
    pokazi_mm = Popis_mm.query.order_by(Popis_mm.id).all()
    pokazi_ocitanja = Ocitanje_mm.query.order_by(Ocitanje_mm.id).all()
    return render_template('statistika.html', pokazi_mm = pokazi_mm, stat_id_mm = stat_id_mm, pokazi_ocitanja = pokazi_ocitanja, potrosnja_target=None)    

@app.route("/statistika/potrosnja/<int:stat_id_potrosnje>", methods=["GET"])
def get_id_potrosnja(stat_id_potrosnje):
    # print(f'Poslao si STAT_ID_POTROSNJE: {stat_id_potrosnje}')
    pokazi_mm = Popis_mm.query.order_by(Popis_mm.id).all()
    pokazi_ocitanja = Ocitanje_mm.query.order_by(Ocitanje_mm.id).all()
    potrosnja_target = Ocitanje_mm.query.get(stat_id_potrosnje)

    def izracunaj_postotak(VT, NT):
        ukupno = VT + NT
        if ukupno == 0:
            return 0
        return int((VT / ukupno) * 100)

    distribucija = round(float((potrosnja_target.val_vt * 0.04) + (potrosnja_target.val_nt * 0.02)), 2)
    prijenos = round(float((potrosnja_target.val_vt * 0.02) + (potrosnja_target.val_nt * 0.01)), 2)
    ukupno = round(float(((potrosnja_target.val_vt * 0.09) + (potrosnja_target.val_nt * 0.04) + prijenos + distribucija) * 1.1), 2)
    postotak = izracunaj_postotak(potrosnja_target.val_vt, potrosnja_target.val_nt)

    return render_template(
        'statistika.html', 
        pokazi_mm = pokazi_mm, 
        stat_id_potrosnje = stat_id_potrosnje, 
        pokazi_ocitanja = pokazi_ocitanja, 
        potrosnja_target = potrosnja_target,
        distribucija = distribucija,
        prijenos = prijenos,
        ukupno = ukupno,
        postotak = postotak
    )       

@app.route("/kalkulator", methods=["GET"])
def kalkulator():
    return render_template('kalkulator.html')



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(port=8080, debug=True)