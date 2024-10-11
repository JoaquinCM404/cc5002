from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("donations/index.html")

@app.route("/agregar-donacion")
def agregar_donacion():
    return render_template("donations/agregar-donacion.html")

@app.route("/informacion-dispositivo")
def informacion_dispositivo():
    return render_template("donations/informacion-dispositivo.html")

@app.route("/ver-dispositivos")
def ver_dispositivos():
    return render_template("donations/ver-dispositivos.html")

if __name__ == "__main__":
    app.run(debug=True)
