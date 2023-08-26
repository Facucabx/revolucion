const locales = {
    restaurante: {
        nombre: "Restaurante Bartolomé",
        horario: "08:00 - 23:59",
        ubicacion: "Calle Mitre 90",
        tipo: "restaurante",
        imagen: "../img/locales/bartolome.png"

    },
    bar: {
        nombre: "Cervecia",
        horario: "19:00 - 02:00",
        ubicacion: "Calle Mitre 148",
        tipo: "bar"
    },
    canchaFutbol: {
        nombre: "Cancha Fútbol El Camp Nou",
        horario: "09:00 - 00:00",
        ubicacion: "Juan B. Justo 480",
        tipo: "canchaFutbol"
    },
    canchaPadel: {
        nombre: "Pádel El Galpón",
        horario: "10:00 - 00:00",
        ubicacion: "Calle Mitre 599",
        tipo: "canchaPadel"
    },
    estacionamiento: {
        nombre: "EstacionaSeguro",
        horario: "24/7",
        ubicacion: "Calle Mitre 575",
        tipo: "estacionamiento",
    },
    restaurante2: {
        nombre: "Restaurante El Cafe",
        horario: "08:00 - 00:00",
        ubicacion: "Calle Mitre 100",
        tipo: "restaurante"
    },
    bar2: {
        nombre: "Bar Villa Rocca",
        horario: "19:00 - 01:00",
        ubicacion: "Pellegrini 157",
        tipo: "bar"
    },
    canchaFutbol2: {
        nombre: "Fútbol más",
        horario: "08:00 - 00:00",
        ubicacion: "Belgrano 523",
        tipo: "canchaFutbol"
    },
    canchaPadel2: {
        nombre: "Pádel Deluxe",
        horario: "09:00 - 22:00",
        ubicacion: "Calle Deportiva 234",
        tipo: "canchaPadel"
    },
    estacionamiento2: {
        nombre: "ParkEasy",
        horario: "24/7",
        ubicacion: "Calle EstacionaFácil 202",
        tipo: "estacionamiento"
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
}

function mostrarDatosLocal() {
    const localKey = document.getElementById("localSelect").value;
    const local = locales[localKey];

    document.getElementById("nombreLocalInfo").textContent = `Nombre: ${local.nombre}`;
    document.getElementById("horarioLocalInfo").textContent = `Horario: ${local.horario}`;
    document.getElementById("ubicacionLocalInfo").textContent = `Ubicación: ${local.ubicacion}`;

    // Agrega la imagen del local
    const imagenLocal = document.getElementById("imagenLocal");
    imagenLocal.src = local.imagen;
    imagenLocal.alt = `Imagen de ${local.nombre}`;
    imagenLocal.style.display = "block"; // Muestra la imagen
}

function mostrarFormularioReserva() {
    const localKey = document.getElementById("localSelect").value;
    const local = locales[localKey];

    document.getElementById("formularioReserva").style.display = "block";
    document.getElementById("nombre").placeholder = `Nombre para ${local.nombre}`;

    // Mostrar campo de cantidad de personas solo si es restaurante o bar
    if (local.tipo === "restaurante" || local.tipo === "bar") {
        document.getElementById("cantidadPersonas").style.display = "block";
    } else {
        document.getElementById("cantidadPersonas").style.display = "none";
    }

    // Mostrar campo de tipo de cancha solo si es una cancha de fútbol
    if (local.tipo === "canchaFutbol") {
        document.getElementById("tipoCancha").style.display = "block";
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
        alert("La fecha seleccionada debe ser posterior a la fecha actual.");
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
        alert("La hora seleccionada está fuera del horario de funcionamiento del comercio.");
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

    // Mostrar o no el "Tipo de Cancha" según el tipo de local
    if (localType === "canchaFutbol") {
        document.getElementById("tipoCanchaComprobante").textContent = `Tipo de Cancha: ${tipoCancha}`;
    } else {
        document.getElementById("tipoCanchaComprobante").textContent = "";
    }

    // Mostrar o no la cantidad de personas según el tipo de local
    if (localType === "restaurante" || localType === "bar") {
        document.getElementById("cantidadPersonasComprobante").textContent = `Cantidad de Personas: ${cantidadPersonas}`;
    } else {
        document.getElementById("cantidadPersonasComprobante").textContent = "";
    }

    // Mostrar el comprobante
    document.getElementById("comprobanteReserva").style.display = "block";
}

function toggleMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
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