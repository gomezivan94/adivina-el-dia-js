// SELECCIONAMOS EL CONTENEDOR DONDE SE MOSTRARA EL MENSAJE HABLADO POR EL USER

const messageDiv = document.getElementById('message');

// ARRAY CON LOS DIAS DE LA SEMANA EN ESPAÑOL

const daysOfWeek = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

// SELECCIONAR UN DIA ALEATORIO DEL ARRAY COMO OBJETIVO

let randomDay = daysOfWeek[Math.floor(Math.random() * 7)];

// INICIALIZAR LA API DE SPEECHRECOGNITION, COMPATIBLE CON DIFERENTES NAVEGADORES

window.speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
const recog = new window.speechRecognition();

// CONFIGURAR IDIOMA DE RECONOCIMIENTO

recog.lang = "es-ES";

// INICIAR EL RECONOCIMIENTO DE VOZ AUTOMATICAMENTE

recog.start();

// CAPTURAR RESULTADO DEL RECONOCIMIENTO DE VOZ

recog.addEventListener("result", (e) => {
    // EXTRAER EL TEXTO RECONOCIDO, LIMPIAR ESPACIOS Y CONVERTIRLO EN MINUSCULAS
    const userSpeech = e.results[0][0].transcript.trim().toLowerCase();

    showMessage(userSpeech);
})

// Reiniciar el reconocimiento de voz automaticamente cuando se detiene

recog.addEventListener("end", () => recog.start());

// Funcion para mostrar el mensaje hablado por el usuario y verificar si coincide con el dia aleatorio

function showMessage(message){
    // Inserta el texto dicho por el usuario en el contenedor del DOM
    messageDiv.innerHTML = `<div>Dijiste: ${message}</div>`;

    checkDaysOfTheWeek(message); // comprobamos si el texto coincide con el dia seleccionado

}

function checkDaysOfTheWeek(message){
    if(message === randomDay){
        recog.abort()

        Swal.fire({
            title: `Correcto! El dia era ${randomDay}!`,
            width: 600,
            padding: "3em",
            color: "#716add",
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://i.gifer.com/PYh.gif")
                left top
                no-repeat
            `,
            showConfirmButton: true,
            confirmButtonText: "¿Intentar nuevamente?"
        });

        restartGame()
    } else {
        Swal.fire({
            toast: true,
            position: "bottom",
            icon: "error",
            title: "Incorrecto! Intenta otra Vez",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            background: "#302927",
            color: "white",
        });
    }
}

// funcion para reiniciar el juego seleecionando un nuevo dia 

function restartGame(){
    // Seleccionamos un nuevo dia aleatorio como objetivo
    randomDay = daysOfWeek[Math.floor(Math.random() * 7)];

    // limpiamos el mensaje mostrado en pantalla

    messageDiv.innerHTML = "";

    // reiniciar reconocimiento de voz

    recog.start();
}