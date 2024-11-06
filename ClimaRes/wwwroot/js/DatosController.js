
var fecha;
var hoy;
var hora;

window.onload = function () {
    $('#CiudadFecha').css('visibility', 'hidden');

    //Ciudad, Fecha y Hora
    fecha = new Date();
    hoy = fecha.toLocaleDateString();
    //console.log(hoy);
    hora = fecha.toLocaleTimeString('en-US');
    //console.log(hora);
}

window.ononline = function(){
    document.getElementById('conexion').innerHTML = "<p class='text-success'>Conectado a internet</p>"
};

window.onoffline = function (){
    document.getElementById('conexion').innerHTML = "<p class='text-danger'>sin conexión a internet</p>"
};

function DatosClimaControlador() {
    var Mensaje;

    let ciudadCaptura = document.getElementById('ciudad').value;
    if (ciudadCaptura == '') {
        Mensaje = 'Escriba el nombre de una ciudad';
        MuestraToast(Mensaje);
    }
    else {
        //var urlCompleta = window.location.protocol + "//" + window.location.host + "/Home/AlmacenaDatosClima?Ciudad=" + "'" + ciudadCaptura + "'"
        var urlCompleta = window.location.protocol + "//" + window.location.host + "/Home/AlmacenaDatosClima?Ciudad=" + ciudadCaptura
        //var urlCompleta = window.location.protocol + "//" + window.location.host + "/Home/AlmacenaDatosClima"
        fetch(urlCompleta)
            .then(response => response.json())
            .then(data => {
                if (data.length == 0) {
                    Mensaje = 'Ciudad no encontrada';
                    MuestraToast(Mensaje);
                }
                else {
                    document.getElementById("nombreciudad").innerText = data[0].climaCiudad;
                    document.getElementById("descripcion").innerText = data[0].climaDescripcion;
                    document.getElementById("imagen").src = data[0].imagen;
                    document.getElementById("temp").innerText = data[0].temperatura + " °C";
                    document.getElementById("nubocidad").innerText = data[0].porcentajeNubes + " %";
                    document.getElementById("viento").innerText = data[0].viento;
                    document.getElementById("humedad").innerText = data[0].porcentajeHumedad+ " %";

                    //Convertir timestamp a fecha
                    var HoraNormal = new Date(data[0].amanecer * 1000).toLocaleTimeString();
                    console.log(HoraNormal);
                    document.getElementById("amanecer").innerText = HoraNormal;
                    HoraNormal = new Date(data[0].ocaso * 1000).toLocaleTimeString();
                    document.getElementById("ocaso").innerText = HoraNormal;

                    //Ciudad, Fecha y Hora
                    document.getElementById("Ciudad").innerText = data[0].climaCiudad;
                    document.getElementById("FechaHora").innerText = hoy + "--" + hora;
                    $('#CiudadFecha').css('visibility', 'visible');
                }
            })
            .catch(error => {
                Mensaje = 'No tiene conexión a Internet';
                MuestraToast(Mensaje);
                console.log(error.message);
                //alert("No tiene conexiÃ³n a Internet ");
            });
    }
}

function MuestraToast(Mensaje) {
    document.getElementById('msjnotif').innerHTML = Mensaje;
    let myAlert = document.querySelector('.toast');
    let bsAlert = new bootstrap.Toast(myAlert, { autohide: true, delay: 2000 });
    bsAlert.show();
}