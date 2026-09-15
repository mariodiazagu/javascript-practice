// ID única de cada canción
let contadorId = 0;

class Cancion {
    constructor(titulo, artista, duracion, escuchada){
        this.id = contadorId++; //asigna el valor actual y después incrementa.
        this.titulo = titulo;
        this.artista = artista;
        this.duracion = duracion;
        this.escuchada = escuchada;
    }
}

let misCanciones = [];

//guardar canciones a JSON
function guardarCanciones(){
    const cancionesJson = JSON.stringify(misCanciones);
    localStorage.setItem("canciones", cancionesJson);
}



function anadirCancion(titulo, artista, duracion, escuchada){
    const nuevaCancion = new Cancion(titulo, artista, duracion, escuchada);
    misCanciones.push(nuevaCancion);
    guardarCanciones();
};

let datosGuardados = localStorage.getItem("canciones");

if (datosGuardados) {
    misCanciones = JSON.parse(datosGuardados);
    let idMasAlto = misCanciones.reduce(function(acumulador, cancion){
        if (acumulador > cancion.id){
            return acumulador;
        } else {
            return cancion.id
        }
    }, 0);
    contadorId = idMasAlto + 1;
}

const contenedorCanciones = document.getElementById("contenedorCanciones");

function mostrarCanciones(canciones){
    //primero se vacía lo que ya hay
    contenedorCanciones.replaceChildren();

    //después muestra todas las canciones
    for (const cancion of canciones){
        let nuevaCancion = document.createElement("div");
        nuevaCancion.dataset.id = cancion.id;
        nuevaCancion.textContent = `${cancion.titulo} - ${cancion.artista} (${cancion.duracion})`;
        contenedorCanciones.append(nuevaCancion);

        //boton eliminar cada cancion
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar"
        nuevaCancion.append(botonEliminar);
        botonEliminar.addEventListener("click", function(){
            console.log(botonEliminar.closest("div").dataset.id + " eliminar");
            const idCancionEliminada = Number(botonEliminar.closest("div").dataset.id)
            misCanciones = misCanciones.filter(cancion => cancion.id !== idCancionEliminada);
            guardarCanciones();
            mostrarCanciones(misCanciones)
        });

        // boton escuchado/no escuchado
        let botonEscuchar = document.createElement("button");
        if (cancion.escuchada){
            botonEscuchar.textContent = "No escuchada"
        } else {
            botonEscuchar.textContent = "Escuchada"
            
        }
        nuevaCancion.append(botonEscuchar);
        botonEscuchar.addEventListener("click", function(){
            const idCancionElegida = Number(botonEscuchar.closest("div").dataset.id)
            const cancionElegida = misCanciones.find(cancion => cancion.id === idCancionElegida);
            cancionElegida.escuchada = !cancionElegida.escuchada;
            guardarCanciones();
            mostrarCanciones(misCanciones);
        });
    };
};


const botonNuevaCancion = document.getElementById("botonNuevaCancion");
const dialogoNuevaCancion = document.getElementById("dialogoNuevaCancion")
botonNuevaCancion.addEventListener("click", function(){
    dialogoNuevaCancion.showModal();
})

mostrarCanciones(misCanciones);

const formNuevaCancion = document.getElementById("formNuevaCancion");
const inputTitulo = document.getElementById("inputTitulo");
const inputArtista = document.getElementById("inputArtista");
const inputDuracion = document.getElementById("inputDuracion");

const botonSubmitNuevaCancion = document.getElementById("botonSubmitNuevaCancion");

formNuevaCancion.addEventListener("submit", function(evento){
    evento.preventDefault();

    const titulo = inputTitulo.value;
    const artista = inputArtista.value;
    const duracion = inputDuracion.value;
    anadirCancion(titulo, artista, duracion, false);
    dialogoNuevaCancion.close();
    inputTitulo.value = ""
    inputArtista.value = ""
    inputDuracion.value = ""
    
    mostrarCanciones(misCanciones);

});


