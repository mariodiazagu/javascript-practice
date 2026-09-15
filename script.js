// const elementoTitulo = document.getElementById("titulo");
// const elementoDescripcion = document.querySelector(".descripcion");
// const todosLosParrafos = document.querySelectorAll("p")

// for (const parrafo of todosLosParrafos){
//     console.log(parrafo.textContent);
// };

// const miCampo = document.getElementById("miCampo");
// miCampo.addEventListener("input", function(){
//     console.log(miCampo.value);

// });

// miCampo.addEventListener("keydown", function(evento){
//     if (evento.key === "Enter"){
//         console.log("Has confirmado: " + miCampo.value)
//     };
// });

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        const infoMessage = read ? console.log(`"${this.title}" by ${this.author}, ${this.pages}, already read.`) : (`"${this.title}" by ${this.author}, ${this.pages}, not read yet.`)
    }
};

function addBookToLibrary(){}

