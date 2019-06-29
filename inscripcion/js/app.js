function encode(){

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;

    let random = Math.round(Math.random() * (60 - 10) + 10);
    let resultado = ((nombre.length + apellido.length) * edad ) / random;


    swal(`El Resultado es: ${resultado}`);

}