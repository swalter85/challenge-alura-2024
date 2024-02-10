/** ************************************************************ */

let inputText = document.getElementById('inputText');
let outputText = document.getElementById('outputText');

let botonCopiar = document.getElementById('botonCopiar');

const regExp = '^[a-zñ ,\n]+$';


function procesar(metodo = null) {

    outputText.innerHTML = '';
    botonCopiar.setAttribute('disabled', true);

    let texto = new String(inputText.value);

    texto = texto.trim();
    let resultado = '';

    if (texto.length < 1) {
        mostrarModal('bg-red', 'Por favor, ingrese el texto', true);
        return;
    }

    if (texto.search(regExp) === -1) {
        mostrarModal('bg-red', 'Ingrese un texto válido. <br> Solo se permiten letras minísculas y espacios.', true);
        return;
    }


    switch (metodo) {
        case 'encriptar':
            mostrarModal('bg-gray', 'Encriptando, espere por favor...', false);
            resultado = encriptar(texto);
            break;

        case 'desencriptar':
            mostrarModal('bg-gray', 'Desencriptando, espere por favor..', false);
            resultado = desencriptar(texto);
            break;

        default:
            cerrarModal();
            mostrarModal('bg-red', 'Método incorrecto', true);
            return;
    }

    setTimeout(() => {
        outputText.innerHTML = resultado;
        botonCopiar.classList.remove('bg-red', 'text-white', 'disabled');
        botonCopiar.removeAttribute('disabled');
        cerrarModal();
    }, 3000);



}

async function copiar() {


    const textoCopiado = outputText.innerHTML

    if (textoCopiado === '') return;

    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard
            .writeText(textoCopiado)
            .then(() => mostrarModal('bg-gray', '¡Texto copiado!', true));
    } else {

        mostrarModal('bg-red', 'No es posible usar el método de copiar', true);

    }
}

function encriptar(mensaje = '') {

    let mensajeEncriptado = '';

    for (const letra of mensaje) {

        switch (letra) {
            case 'a':
                mensajeEncriptado += 'ai';
                break;
            case 'e':
                mensajeEncriptado += 'enter';
                break;
            case 'i':
                mensajeEncriptado += 'imes';
                break;
            case 'o':
                mensajeEncriptado += 'ober';
                break;
            case 'u':
                mensajeEncriptado += 'ufat';
                break;
            default:
                mensajeEncriptado += letra;
                break;
        }

    }

    return mensajeEncriptado;

}

function desencriptar(mensaje = '') {

    let mensajeDesencriptado = '';

    for (let indice = 0; indice < mensaje.length; indice++) {

        const letra = mensaje[indice];


        if (letra === 'a') {

            mensajeDesencriptado += letra;
            indice += 1;

        } else if (letra === 'e') {

            mensajeDesencriptado += letra;
            indice += 4;

        }
        else if (letra === 'i') {

            mensajeDesencriptado += letra;
            indice += 3;

        }
        else if (letra === 'o') {

            mensajeDesencriptado += letra;
            indice = indice + 3;

        }
        else if (letra === 'u') {

            mensajeDesencriptado += letra;
            indice += 3;

        }
        else {

            mensajeDesencriptado += letra;

        }


    } //FIN DEL CICLO FOR


    return mensajeDesencriptado;

}


/** ************************************************************ */












/** ************************************************************ */
const relojHTML = document.getElementById('reloj');

function domReady(fn) {

    document.addEventListener('DOMContentLoaded', fn);

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        fn();
    }
}

domReady(function () {
    mostrarPresentacion();
    condicionInicial();
    controlarFechaHora();
    posicionCursos();
});

function condicionInicial() {
    inputText.value = '';
    outputText.innerHTML = '';
    botonCopiar.classList.add('bg-red', 'text-white', 'disabled');
    botonCopiar.setAttribute('disabled', 'true');
    document.getElementById('posicion').innerText = '1:1';
    toggleMostrarVentana('ventana-1', 'checkbox-1', true);
    toggleMostrarVentana('ventana-2', 'checkbox-2', true);
    toggleMenuArchivo(true);
}

function salir() {
    window.location = '../index.html';
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    const overlay = document.querySelector('.overlay');
    const botonCerrarModal = document.getElementById('botonCerrarModal');
    const color = modal.children[0].classList[1];


    modal.children[0].classList.remove(color);

    document.getElementById('informacion').innerHTML = '';

    botonCerrarModal.classList.remove('active');

    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function controlarFechaHora() {

    let hora = "";
    let tiempo = new Date();
    let horas = tiempo.getHours();
    let minutos = tiempo.getMinutes();
    let segundos = tiempo.getSeconds();

    horas = (horas <= 9) ? ("0" + horas) : horas;
    minutos = (minutos <= 9) ? ("0" + minutos) : minutos;
    segundos = (segundos <= 9) ? ("0" + segundos) : segundos;
    hora = horas + ":" + minutos + ":" + segundos

    const mes = (tiempo.getMonth() + 1).toString().padStart(2, '0');
    const dia = tiempo.getDate().toString().padStart(2, '0');
    const anio = tiempo.getFullYear().toString();


    relojHTML.innerHTML = `${dia}/${mes}/${anio} ${hora}`;


    setTimeout("controlarFechaHora()", 1000);

}

function mostrarModal(color = null, texto = 'Error no definido', mostrarBoton = false) {

    const overlay = document.querySelector('.overlay');
    const modal = document.getElementById('modal');
    const botonCerrarModal = document.getElementById('botonCerrarModal');

    modal.children[0].classList.add(color);

    document.getElementById('informacion').innerHTML = texto;


    if (mostrarBoton === true) {
        botonCerrarModal.classList.add('active');
    }
    else {
        botonCerrarModal.classList.remove('active');
    }

    modal.classList.add('active');
    overlay.classList.add('active');

}

function mostrarPresentacion() {

    mostrarModal(null,
        `Bienvenidos al encriptador de mensajes.
        <br> <br> Corresponde al primer challenge del curso de Alura LATAM 2024`,
        true
    );

}

function posicionCursos() {
    inputText.addEventListener('keyup', function (e) {

        const fila = e.target.value.substring(0, e.target.selectionStart).split("\n")
        const columna = fila[fila.length - 1].length + 1;

        document.getElementById('posicion').innerText = `${fila.length}:${columna}`;

    });
}

function toggleMostrarVentana(idVentana = null, idCheck = null, forzarMostrarVentana = false) {

    if (idVentana === 'undefined' || idVentana === null) return;


    const ventana = document.getElementById(idVentana);
    const check = document.getElementById(idCheck);



    if (ventana.classList.contains('hide') || forzarMostrarVentana) {

        ventana.classList.remove('hide');

        check.classList.remove('deactivated');
        check.classList.add('activated');

    } else {

        ventana.classList.add('hide');

        check.classList.remove('activated');
        check.classList.add('deactivated');
    }

}

function toggleMenuArchivo(forzarCerrarMenu = false) {
    const menuArchivo = document.getElementById('menu-archivo');
    const archivoContent = document.getElementById('archivo-content');


    if (archivoContent.classList.contains('active') || forzarCerrarMenu) {

        archivoContent.classList.remove('active')

    } else {

        archivoContent.classList.add('active')
    }

    menuArchivo.addEventListener('mouseleave', function () {
        archivoContent.classList.remove('active')
    });
}

function toggleMenuVer() {
    const menuVer = document.getElementById('menu-ventana');
    const verContent = document.getElementById('ventana-content');

    if (verContent.classList.contains('active')) {

        verContent.classList.remove('active')

    } else {

        verContent.classList.add('active')
    }

    menuVer.addEventListener('mouseleave', function () {

        verContent.classList.remove('active')

    });
}
