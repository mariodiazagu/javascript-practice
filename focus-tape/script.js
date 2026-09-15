const formCancion = document.getElementById("formCancion");
const mensaje = document.getElementById("mensaje");
const listaCanciones = document.getElementById("listaCanciones");
const mensajeTotalCanciones = document.getElementById("contador");
const listaVacia = document.getElementById("listaVacia");

const modal = document.getElementById("modalVaciar");
const vaciarPlaylist = document.getElementById("vaciarPlaylist");
const cancelarVaciado = document.getElementById("cancelarVaciado");
const confirmarVaciado = document.getElementById("confirmarVaciado");

function cargarCanciones() {
    const cancionesCargadas = localStorage.getItem("focusTapeCanciones");

    if (cancionesCargadas === null) {
        return [];
    }

    return JSON.parse(cancionesCargadas);
}

let canciones = cargarCanciones();
let totalCanciones = canciones.length;

function guardarCanciones() {
    const cancionesJson = JSON.stringify(canciones);
    localStorage.setItem("focusTapeCanciones", cancionesJson);
}

function actualizarContador(total) {
    if (total === 0) {
        mensajeTotalCanciones.classList.add("oculto");
        return;
    }

    mensajeTotalCanciones.classList.remove("oculto");

    if (total === 1) {
        mensajeTotalCanciones.textContent =
            `${total} canción en la playlist`;
    } else {
        mensajeTotalCanciones.textContent =
            `${total} canciones en la playlist`;
    }
}

function actualizarEstadoVacio() {
    if (totalCanciones === 0) {
        listaVacia.classList.remove("oculto");
    } else {
        listaVacia.classList.add("oculto");
    }
}

function modalVaciar(accion) {
    if (accion) {
        modal.classList.remove("oculto");
    } else {
        modal.classList.add("oculto");
    }
}

function renderizarCancion(cancionObj) {
    const nuevaCancion = document.createElement("li");
    const spanCancion = document.createElement("span");

    spanCancion.textContent =
        `${cancionObj.titulo} - ${cancionObj.artista}`;
    

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";

    nuevaCancion.append(spanCancion);
    nuevaCancion.append(botonEliminar);
    listaCanciones.append(nuevaCancion);
    

    botonEliminar.addEventListener("click", () => {
        nuevaCancion.remove();

        canciones = canciones.filter(
            cancionGuardada => cancionGuardada !== cancionObj
        );

        totalCanciones = canciones.length;

        guardarCanciones();
        actualizarContador(totalCanciones);
        actualizarEstadoVacio();

        mensaje.classList.remove("error");
        mensaje.classList.add("exito");
        mensaje.textContent = `${cancionObj.titulo} eliminada`;
    });
}

formCancion.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombreCancion = document.getElementById("nombreCancion");
    const nombreArtista = document.getElementById("nombreArtista");

    const cancion = nombreCancion.value.trim();
    const artista = nombreArtista.value.trim();

    if (cancion === "" || artista === "") {
        mensaje.classList.remove("exito");
        mensaje.classList.add("error");
        mensaje.textContent =
            "Escribe una canción y un artista antes de añadirla.";

        return;
    }

    const cancionObj = {
        titulo: cancion,
        artista: artista
    };

    canciones.push(cancionObj);
    totalCanciones = canciones.length;

    renderizarCancion(cancionObj);
    guardarCanciones();
    actualizarContador(totalCanciones);
    actualizarEstadoVacio();

    mensaje.classList.remove("error");
    mensaje.classList.add("exito");
    mensaje.textContent =
        `Añadida a Focus Tape: "${cancion}" de ${artista}`;

    nombreCancion.value = "";
    nombreArtista.value = "";
    nombreCancion.focus();
});

vaciarPlaylist.addEventListener("click", () => {
    modalVaciar(true);
});

cancelarVaciado.addEventListener("click", () => {
    modalVaciar(false);
});

confirmarVaciado.addEventListener("click", () => {
    modalVaciar(false);

    listaCanciones.replaceChildren();
    canciones = [];
    totalCanciones = 0;

    guardarCanciones();
    actualizarContador(totalCanciones);
    actualizarEstadoVacio();

    mensaje.classList.remove("error");
    mensaje.classList.add("exito");
    mensaje.textContent = "Playlist vaciada con éxito";
});

document.addEventListener("keydown", (evento) => {
    if (
        evento.key === "Escape" &&
        !modal.classList.contains("oculto")
    ) {
        modalVaciar(false);
    }
});

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        modalVaciar(false);
    }
});

for (const cancionObj of canciones) {
    renderizarCancion(cancionObj);
}

// BUSCAR CANCIONES
const buscarCancion = document.getElementById("buscarCancion");
const mensajeBusqueda = document.getElementById("mensajeBusqueda");

buscarCancion.addEventListener("input", () => {
    const textoBusqueda = buscarCancion.value.toLowerCase();
    const cancionesMostradas = listaCanciones.querySelectorAll("span");
    const listaBusqueda = []
    for (const elementoCancion of cancionesMostradas) {
        
        const textoCancion = elementoCancion.textContent.toLowerCase();
        const coincide = textoCancion.includes(textoBusqueda);
        if (coincide) {
            elementoCancion.classList.remove("oculto");
            listaBusqueda.push(elementoCancion);
        } else {
            elementoCancion.classList.add("oculto");
        }

    
    };

    if (listaBusqueda.length === 0) {
        mensajeBusqueda.classList.remove("oculto")
    } else {
        mensajeBusqueda.classList.add("oculto");
    }
    
});





