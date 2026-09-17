//global variables
let idCounter = 0;
let savedCocktails = loadLocalCocktails();



//global html variables
const cocktailContainer = document.getElementById("cocktailContainer");

const addButton = document.getElementById("addButton");
const addCocktailModal = document.getElementById("addCocktailModal");
const closeModalButton = document.getElementById("closeModal");

const addCocktailForm = document.getElementById("addCocktailForm")
const nameInput = document.getElementById("nameInput");
const basetypeInput = document.getElementById("basetypeInput");

//cocktail class constructor
class Cocktail {
    constructor(name, baseType, tried){
        this.id = idCounter++;
        this.name = name;
        this.baseType = baseType;
        this.tried = tried;
    };
};

//functions


function showCocktails(cocktails){
    cocktailContainer.replaceChildren();
    for (const cocktail of cocktails) {
        const cocktailDisplay = document.createElement("div");
        cocktailDisplay.textContent = cocktail.name + " - Base: " + cocktail.baseType;
        cocktailContainer.append(cocktailDisplay);

        //generate the buttons
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        cocktailDisplay.append(deleteButton);

        const markAsTriedButton = document.createElement("button");
        if (cocktail.tried){
            markAsTriedButton.textContent = "Tried"
        } else {
            markAsTriedButton.textContent = "Mark as tried";
        }
        
        cocktailDisplay.dataset.id = cocktail.id;
        cocktailDisplay.append(markAsTriedButton);

        //listeners
        markAsTriedButton.addEventListener("click", () =>{
            const idChangedCocktail = Number(markAsTriedButton.closest("div").dataset.id);

            const chosenCocktail = savedCocktails.find(cocktail => cocktail.id === idChangedCocktail);
            chosenCocktail.tried = !chosenCocktail.tried;
            saveLocalCocktails(savedCocktails);
            showCocktails(savedCocktails);
        });

        deleteButton.addEventListener("click", function(){
            const idDeletedCocktail = Number(deleteButton.closest("div").dataset.id);
            const savedNewCocktails = savedCocktails.filter(cocktail => cocktail.id !== idDeletedCocktail);
            savedCocktails = savedNewCocktails;
            saveLocalCocktails(savedCocktails);
            showCocktails(savedCocktails);
        });
    }; 
};
showCocktails(savedCocktails);

function addCocktail(name, baseType){
    const newCocktail = new Cocktail(name, baseType, false);
    savedCocktails.push(newCocktail);
    saveLocalCocktails(savedCocktails);
    showCocktails(savedCocktails);
};

function saveLocalCocktails(cocktailList){
    const cocktailsText = JSON.stringify(cocktailList);
    localStorage.setItem("savedLocal", cocktailsText);
    return "Data saved in the local storage.";
};

function loadLocalCocktails(){
    if (localStorage.getItem("savedLocal")){
        const newList = localStorage.getItem("savedLocal");
        const savedCocktailsJSON = JSON.parse(newList);
        idCounter = findHigherId(savedCocktailsJSON) + 1
        return savedCocktailsJSON
    } else {
        return [];
    };
};

function findHigherId(cocktails){
    const higherId = cocktails.reduce((accumulator, cocktail) => {
        if(accumulator > cocktail.id){
            return accumulator;
        } else {
            return cocktail.id;
        };
    }, 0);
    return higherId;
};

//add cocktail form
addButton.addEventListener("click", function(){
    addCocktailModal.showModal();
    nameInput.focus();
});

closeModalButton.addEventListener("click", () => {
    addCocktailModal.close();
});

addCocktailForm.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const newName = nameInput.value;
    const newBasetype = basetypeInput.value;

    addCocktail(newName, newBasetype);

    nameInput.value = "";
    basetypeInput.value = "";
    addCocktailModal.close();

    
});
