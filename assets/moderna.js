/** ************************************************************ */

let inputText = document.getElementById('inputText');
let outputText = document.getElementById('outputText');

let botonCopiar = document.getElementById('botonCopiar');

const regExp = '^[a-zñ ,\n]+$';


function procesar(metodo = null) {

    const flipCard = document.getElementById('flip-card');

    outputText.innerHTML = '';

    let texto = new String(inputText.value);
    texto = texto.trim();
    let resultado = '';

    if (texto.length < 1) {
        mostrarModal('Ingrese el texto', true);

        flipCard.classList.remove('flip');
        botonCopiar.setAttribute('disabled', true);

        return;
    }

    if (texto.search(regExp) === -1) {
        mostrarModal('Carateres no válidos. Solo letras minúsculas y espacios', true);

        flipCard.classList.remove('flip');
        botonCopiar.setAttribute('disabled', true);

        return;
    }

    flipCard.classList.remove('flip');
    botonCopiar.setAttribute('disabled', true);

    switch (metodo) {
        case 'encriptar':
            mostrarModal('Encriptando, espere por favor...');
            resultado = encriptar(texto);
            break;

        case 'desencriptar':
            mostrarModal('Desencriptando, espere por favor...');
            resultado = desencriptar(texto);
            break;

        default:
            mostrarModal('Metodo nos disponible');

            return;
    }

    setTimeout(() => {
        outputText.innerHTML = resultado;
        botonCopiar.removeAttribute('disabled');
        flipCard.classList.add('flip');
        cerrarModal();
    }, 3000);



}

async function copiar() {

    const textoCopiado = outputText.innerHTML

    if (textoCopiado === '') return;


    if (navigator.clipboard && window.isSecureContext) {


        await navigator.clipboard
            .writeText(textoCopiado)
            .then(() => {
                mostrarModal('Mensaje copiado');
                setTimeout(() => cerrarModal(),
                    3000);
            });

    } else {

        mostrarModal("No es posible usar el método de copiar", true);

    }
}

function encriptar(mensaje = null) {

    return mensaje
        .replaceAll('e', 'enter')
        .replaceAll('i', 'imes')
        .replaceAll('a', 'ai')
        .replaceAll('o', 'ober')
        .replaceAll('u', 'ufat');

}

function desencriptar(mensaje = null) {

    return mensaje
        .replaceAll('enter', 'e')
        .replaceAll('imes', 'i')
        .replaceAll('ai', 'a')
        .replaceAll('ober', 'o')
        .replaceAll('ufat', 'u');

}

/** ************************************************************ */



const modal = document.getElementById("modal");
const botonCerrar = document.getElementById("modal-cerrar");


function mostrarModal(texto = 'Error no definido', mostrarBoton = false, color = null) {
    document.getElementById("modal-info").innerText = texto

    if (mostrarBoton) {

        botonCerrar.classList.add('show');
    }
    modal.showModal();
}

function cerrarModal() {
    modal.classList.add("hide");
    botonCerrar.classList.remove('show');

    modal.addEventListener("animationend", function close() {
        modal.classList.remove("hide");
        modal.close();
        modal.removeEventListener("animationend", close);
    });
}

function salir() {
    window.location = '../index.html';
}