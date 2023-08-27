const locales = {
    restaurante: {
        nombre: "Restaurante Bartolomé",
        horario: "08:00 - 23:59",
        ubicacion: "Calle Mitre 90",
        tipo: "restaurante",
        imagen: "../img/locales/bartolome.png"
    },
    bar: {
        nombre: "Cervesia",
        horario: "19:00 - 23:59",
        ubicacion: "Calle Mitre 148",
        tipo: "bar",
        imagen: "../img/locales/cervesia.png"
    },
    canchaFutbol: {
        nombre: "Cancha Fútbol El Camp Nou",
        horario: "09:00 - 23:59",
        ubicacion: "Juan B. Justo 480",
        tipo: "canchaFutbol",
        imagen: "../img/locales/camp.png"
    },
    canchaPadel: {
        nombre: "Pádel El Galpón",
        horario: "10:00 - 23:59",
        ubicacion: "Calle Mitre 599",
        tipo: "canchaPadel",
        imagen: "../img/locales/elgalpon.png"
    },
    estacionamiento: {
        nombre: "EstacionaSeguro",
        horario: "24/7",
        ubicacion: "Calle Mitre 575",
        tipo: "estacionamiento",
        imagen: "../img/locales/estacionamiento.png"
    },
    restaurante2: {
        nombre: "Restaurante El Cafe",
        horario: "08:00 - 23:59",
        ubicacion: "Calle Mitre 100",
        tipo: "restaurante",
        imagen: "../img/locales/elcafe.png"
    },
    bar2: {
        nombre: "Bar Villa Rocca",
        horario: "19:00 - 01:00",
        ubicacion: "Pellegrini 157",
        tipo: "bar",
        imagen: "../img/locales/villarocca.png"
    },
    canchaFutbol2: {
        nombre: "Fútbol Contreras",
        horario: "08:00 - 23:59",
        ubicacion: "Belgrano 523",
        tipo: "canchaFutbol",
        imagen: "../img/locales/contreras.png"
    },
    canchaPadel2: {
        nombre: "Open Pádel",
        horario: "09:00 - 23:59",
        ubicacion: "Calle Deportiva 234",
        tipo: "canchaPadel",
        imagen: "../img/locales/open.png"
    },
    estacionamiento2: {
        nombre: "ParkEasy",
        horario: "09:00 - 23:59",
        ubicacion: "Calle EstacionaFácil 202",
        tipo: "estacionamiento",
        imagen: "../img/locales/estacionamiento.png"
    }
};

function mostrarLocales() {
    const localType = document.getElementById("localType").value;
    const localSelect = document.getElementById("localSelect");

    localSelect.innerHTML = '<option value="" disabled selected>Elegir local</option>'; // Limpiar opciones

    for (const localKey in locales) {
        if (locales[localKey].tipo === localType) {
            const option = document.createElement("option");
            option.value = localKey;
            option.textContent = locales[localKey].nombre;
            localSelect.appendChild(option);
        }
    }

    // Ocultar datos del local seleccionado
    document.getElementById("nombreLocalInfo").textContent = "";
    document.getElementById("horarioLocalInfo").textContent = "";
    document.getElementById("ubicacionLocalInfo").textContent = "";
    document.getElementById("formularioReserva").style.display = "none";
    document.getElementById("mensajeReserva").style.display = "none";
    document.getElementById("cantidadPersonas").style.display = "none"; // Ocultar campo de cantidad de personas
    document.getElementById("tipoCancha").style.display = "none"; // Ocultar campo de tipo de cancha

    // Ocultar la imagen del local
    const imagenLocal = document.getElementById("imagenLocal");
    imagenLocal.src = "";
    imagenLocal.alt = "";
    imagenLocal.style.display = "none"; // Oculta la imagen
}

window.onload = function() {
    // Configurar la imagen vacía
    const imagenLocal = document.getElementById("imagenLocal");
    imagenLocal.src = "";
    imagenLocal.alt = "";
    imagenLocal.style.display = "none"; // Oculta la imagen
}

function mostrarDatosLocal() {
    const localKey = document.getElementById("localSelect").value;
    const local = locales[localKey];

    document.getElementById("nombreLocalInfo").textContent = ` ${local.nombre}`;
    document.getElementById("horarioLocalInfo").textContent = `Horario: ${local.horario}`;
    document.getElementById("ubicacionLocalInfo").textContent = `Ubicación: ${local.ubicacion}`;

    // Agrega la imagen del local
    const imagenLocal = document.getElementById("imagenLocal");
    imagenLocal.src = local.imagen;
    imagenLocal.alt = `Imagen de ${local.nombre}`;
    imagenLocal.style.display = ""; // Muestra la imagen

    // Muestra la cajaLocal
    document.getElementById("cajaLocal").style.display = "";
}


function mostrarFormularioReserva() {
    const localKey = document.getElementById("localSelect").value;
    const local = locales[localKey];

    document.getElementById("formularioReserva").style.display = "";


    // Mostrar campo de cantidad de personas solo si es restaurante o bar
    if (local.tipo === "restaurante" || local.tipo === "bar") {
        document.getElementById("cantidadPersonas").style.display = "block";
    } else {
        document.getElementById("cantidadPersonas").style.display = "none";
    }

    // Mostrar campo de tipo de cancha solo si es una cancha de fútbol
    if (local.tipo === "canchaFutbol") {
        document.getElementById("tipoCancha").style.display = "";
    } else {
        document.getElementById("tipoCancha").style.display = "none";
    }
}

function realizarReserva() {
    const nombre = document.getElementById("nombre").value;
    const fechaInput = document.getElementById("fecha").value;
    const horaInput = document.getElementById("hora").value;
    const localKey = document.getElementById("localSelect").value;
    const localType = document.getElementById("localType").value;
    const local = locales[localKey];

    // Obtener la fecha y hora actual
    const fechaActual = new Date();
    const horaActual = fechaActual.getHours();
    const minutosActual = fechaActual.getMinutes();

    // Convertir la fecha y hora seleccionadas por el usuario a objetos Date
    const fechaSeleccionada = new Date(fechaInput);
    const horaSeleccionada = parseInt(horaInput.split(':')[0], 10);
    const minutosSeleccionados = parseInt(horaInput.split(':')[1], 10);

    // Verificar que la fecha seleccionada sea posterior a la fecha actual
    if (fechaSeleccionada < fechaActual) {
        alert("La fecha seleccionada ya pasó. Por favor, seleccione una de hoy en adelante");
        return;
    }

    // Verificar que la hora seleccionada esté dentro del horario del comercio
    const horarioComercio = local.horario.split(' - ');
    const horaApertura = parseInt(horarioComercio[0].split(':')[0], 10);
    const minutosApertura = parseInt(horarioComercio[0].split(':')[1], 10);
    const horaCierre = parseInt(horarioComercio[1].split(':')[0], 10);
    const minutosCierre = parseInt(horarioComercio[1].split(':')[1], 10);

    if (
        (horaSeleccionada < horaApertura || (horaSeleccionada === horaApertura && minutosSeleccionados < minutosApertura)) ||
        (horaSeleccionada > horaCierre || (horaSeleccionada === horaCierre && minutosSeleccionados > minutosCierre))
    ) {
        alert("La hora seleccionada está fuera del horario de atención al cliente. Por favor, seleccione una dentro del horario de atención");
        return;
    }

    // Verificar campos completos y selección de rubro y local
    if (nombre === "" || fechaInput === "" || horaInput === "" || localKey === "" || localType === "") {
        document.getElementById("avisoCamposIncompletos").style.display = "block";
        document.getElementById("avisoSeleccionRubroLocal").style.display = "block";
        return;
    } else {
        document.getElementById("avisoCamposIncompletos").style.display = "none";
        document.getElementById("avisoSeleccionRubroLocal").style.display = "none";
    }

    // Obtener la cantidad de personas si es un restaurante o bar
    let cantidadPersonas = "";
    if (localType === "restaurante" || localType === "bar") {
        cantidadPersonas = document.getElementById("cantidadPersonasInput").value;
    }

    // Obtener el tipo de cancha si es una cancha de fútbol
    let tipoCancha = "";
    if (localType === "canchaFutbol") {
        tipoCancha = document.querySelector('input[name="tipoCancha"]:checked').value;
    }

    // Actualizar el contenido del comprobante
    document.getElementById("nombreComprobante").textContent = nombre;
    document.getElementById("fechaComprobante").textContent = fechaInput;
    document.getElementById("horaComprobante").textContent = horaInput;
    document.getElementById("localComprobante").textContent = local.nombre;
    document.getElementById("tipoComprobante").textContent = localType;

    // Obtener el mensaje ingresado por el usuario
    const mensaje = document.getElementById("mensaje").value;

    // Establecer el mensaje en el elemento HTML del modal
    document.getElementById("mensajeUsuario").textContent = `Mensaje: ${mensaje}`;

    // Mostrar el comprobante
    document.getElementById("comprobanteReserva").style.display = "block";

    // Mostrar o no el "Tipo de Cancha" según el tipo de local en el comprobante
    if (localType === "canchaFutbol") {
        document.getElementById("tipoCanchaComprobante").textContent = `Tipo de Cancha: ${tipoCancha}`;
    } else {
        document.getElementById("tipoCanchaComprobante").textContent = "";
    }

    // Mostrar o no la cantidad de personas según el tipo de local en el comprobante
    if (localType === "restaurante" || localType === "bar") {
        document.getElementById("cantidadPersonasComprobante").textContent = `Cantidad de Personas: ${cantidadPersonas}`;
    } else {
        document.getElementById("cantidadPersonasComprobante").textContent = "";
    }
}

function cerrarModal() {
    document.getElementById("comprobanteReserva").style.display = "none";
}

function validarCantidadPersonas() {
    const cantidadPersonasInput = document.getElementById("cantidadPersonasInput");
    const cantidadPersonas = parseInt(cantidadPersonasInput.value, 10);

    if (isNaN(cantidadPersonas) || cantidadPersonas <= 0) {
        cantidadPersonasInput.setCustomValidity("La cantidad de personas debe ser un número válido y mayor que 0.");
    } else {
        cantidadPersonasInput.setCustomValidity(""); // Restablecer la validación personalizada
    }
}
function cerrarModal() {
    document.getElementById("comprobanteReserva").style.display = "none";
}