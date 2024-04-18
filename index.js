import { recipes } from './recipes.js';
import { menuCardFactory } from './factories/menu.js';
import { filterFactory } from './factories/filter.js';
import { headerFactory } from './factories/header.js';
import {filterBarFactory } from './factories/filter-recipes.js';



recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
        ingredient.ingredient = ingredient.ingredient.toLowerCase();
    });
    recipe.appliance = recipe.appliance.toLowerCase();
    recipe.ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
});


export let initialRecipes = [...recipes];


const headerFactoryInstance = headerFactory(); // Assurez-vous de définir filterRecipe
const  headerElement  = headerFactoryInstance.createHeader();
const headerContainer = document.querySelector('.header');
headerContainer.appendChild(headerElement);

// Maintenant, récupérez searchInput depuis le DOM
const searchInput = document.querySelector('.form-control'); 

const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.type = 'text/css';
linkElement.href = 'css/styles.css';
document.head.appendChild(linkElement);

const menuContainer = document.getElementById('menuContainer');

const filterContainer = document.getElementById('filterContainer');


 // Fonction pour réinitialiser les filtres et afficher toutes les recettes
 export function resetFilters() {
    currentFilteredRecipes = [...initialRecipes];
    updateMenu(currentFilteredRecipes);
}


function clearMenuContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


// Fonction pour mettre à jour le menu en fonction des résultats du filtre
function updateMenu(filteredRecipes) {
    console.log("updateMenu appelé avec les recettes filtrées :", filteredRecipes);
    if (!Array.isArray(filteredRecipes)) {
        console.error('Erreur: filteredRecipes n\'est pas un tableau');
        return;
    }

    
    let recipeCountElement = document.getElementById('recipeCount');
    if (!recipeCountElement) {
        recipeCountElement = document.createElement('span');
        recipeCountElement.id = 'recipeCount';
        filterContainer.appendChild(recipeCountElement);
    }
    recipeCountElement.textContent = `${filteredRecipes.length} recettes`;

    // Effacez les anciennes cartes de menu
    clearMenuContainer(menuContainer);  // Assurez-vous que cette fonction supprime correctement les éléments

    // Ajoutez les nouvelles cartes de menu
    filteredRecipes.forEach(recipe => {
        const menuCardFactoryInstance = menuCardFactory(recipe);  // Utilisez l'instance factory pour créer la carte
        const menuCardElement = menuCardFactoryInstance.createMenuCard();  // Créez la carte via la factory
        menuContainer.appendChild(menuCardElement);
    });

}

function updateInputHeader(recipes){

    const filterFactoryInstance = filterFactory(recipes, updateMenu);
    searchInput.addEventListener('input', () => {
        const inputValue = searchInput.value.trim(); // Nettoyez la valeur pour ignorer les espaces superflus
        if (inputValue.length === 0) {
            // Si l'input est vide, réaffichez toutes les recettes
            updateMenu(recipes);
        } else {
            // Sinon, filtrez les recettes basées sur la valeur de l'input
            filterFactoryInstance.filterRecipes(inputValue);
        }
    });

}


function closeBtnHandle(recipes){
        // Ciblage de l'icône de réinitialisation et ajout d'un gestionnaire de clic
        const resetIcon = document.querySelector('.reset-icon');
        resetIcon.addEventListener('click', () => {
            searchInput.value = ''; // Effacer le champ de recherche
            updateMenu(recipes); // Réafficher toutes les recettes
        });
}



// Créer une instance de filterBarFactory pour les filtres par ustensils etc ...
const filterBarFactoryInstance = filterBarFactory(recipes, updateMenu);

const filterBar = filterBarFactoryInstance.createFilterBar();
filterContainer.appendChild(filterBar); 

// Fonction d'initialisation qui crée une carte de menu pour chaque recette
function init(recipes) {    
    closeBtnHandle(recipes)
    updateInputHeader(recipes)
    updateMenu(recipes);
}

init(recipes);

