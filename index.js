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


//const filterFactoryInstance = filterFactory(recipes, updateMenu);

const filterContainer = document.getElementById('filterContainer');
//filterContainer.appendChild(filterElement);

// Créer une instance de filterBarFactory pour les filtres par ustensils etc ...
const filterBarFactoryInstance = filterBarFactory(recipes, updateMenu);

const filterBar = filterBarFactoryInstance.createFilterBar();
filterContainer.appendChild(filterBar); 


// Fonction pour mettre à jour le menu en fonction des résultats du filtre
function updateMenu(filteredRecipes) {
    console.log("updateMenu appelé avec les recettes filtrées :", filteredRecipes);
    if (!Array.isArray(filteredRecipes)) {
        console.error('Erreur: filteredRecipes n\'est pas un tableau');
        return;
    }
    // Supprimez les cartes de menu actuelles
    menuContainer.innerHTML = '';

    // Créez une carte de menu pour chaque recette filtrée
    filteredRecipes.forEach((recipe) => {
        const menuCardFactoryInstance = menuCardFactory(recipe);
        const menuCardElement = menuCardFactoryInstance.createMenuCard();
        menuContainer.appendChild(menuCardElement);
    });

    const filterFactoryInstance = filterFactory(recipes, updateMenu);

    searchInput.addEventListener('input', () => {
        filterFactoryInstance.filterRecipes(searchInput.value);
    });

}

// Fonction d'initialisation qui crée une carte de menu pour chaque recette
function init(recipes) {
    updateMenu(recipes);
}

init(recipes);

