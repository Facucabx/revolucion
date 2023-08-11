const locales = {
    restaurante: {
        nombre: "Restaurante del Mar",
        horario: "13:00 - 22:00",
        ubicacion: "Calle Principal 123",
        tipo: "restaurante"
    },
    bar: {
        nombre: "Bar La Fiesta",
        horario: "18:00 - 02:00",
        ubicacion: "Avenida Central 456",
        tipo: "bar"
    },
    canchaFutbol: {
        nombre: "Cancha Fútbol Total",
        horario: "09:00 - 21:00",
        ubicacion: "Calle Deportiva 789",
        tipo: "canchaFutbol"
    },
    canchaPadel: {
        nombre: "Pádel Pro",
        horario: "10:00 - 23:00",
        ubicacion: "Calle Deportiva 789",
        tipo: "canchaPadel"
    },
    estacionamiento: {
        nombre: "EstacionaSeguro",
        horario: "24/7",
        ubicacion: "Calle Estacionamiento 101",
        tipo: "estacionamiento"
    },
    restaurante2: {
        nombre: "La Trattoria",
        horario: "12:00 - 23:00",
        ubicacion: "Plaza Italia 456",
        tipo: "restaurante"
    },
    bar2: {
        nombre: "Cervecería BrewHaven",
        horario: "16:00 - 01:00",
        ubicacion: "Calle de los Cerveceros 789",
        tipo: "bar"
    },
    canchaFutbol2: {
        nombre: "Arena Fútbol Rápido",
        horario: "08:00 - 20:00",
        ubicacion: "Calle Deportiva 123",
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
    
    localSelect.innerHTML = "";
    
    for (const localKey in locales) {
        if (locales[localKey].tipo === localType) {
            const option = document.createElement("option");
            option.value = localKey;
            option.textContent = locales[localKey].nombre;
            localSelect.appendChild(option);
        }
    }
    
    // Mostrar los datos del local seleccionado
    mostrarDatosLocal();
}

function mostrarDatosLocal() {
    const localKey = document.getElementById("localSelect").value;
    const local = locales[localKey];
    
    document.getElementById("nombreLocalInfo").textContent = `Nombre: ${local.nombre}`;
    document.getElementById("horarioLocalInfo").textContent = `Horario: ${local.horario}`;
    document.getElementById("ubicacionLocalInfo").textContent = `Ubicación: ${local.ubicacion}`;
}

function mostrarFormularioReserva() {
    const localKey = document.getElementById("localSelect").value;
    const local = locales[localKey];
    
    document.getElementById("formularioReserva").style.display = "block";
    document.getElementById("nombre").placeholder = `Nombre para ${local.nombre}`;
}

function realizarReserva() {
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const localKey = document.getElementById("localSelect").value;
    const local = locales[localKey];
    
    // Implementa aquí la lógica de reserva
    
    document.getElementById("formularioReserva").style.display = "none";
    document.getElementById("mensajeReserva").style.display = "block";
}