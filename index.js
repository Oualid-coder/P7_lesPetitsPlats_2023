// index.js

import { recipes } from './recipes.js';
import { menuCardFactory } from './factories/menu.js';
import { filterFactory, filterBarFactory } from './factories/filter.js';
import { headerFactory } from './factories/header.js';
import { filterRecipes } from './factories/filter-recipes.js';

const headerFactoryInstance = headerFactory(); 
const headerElement = headerFactoryInstance.createHeader();
const headerContainer = document.querySelector('.header');
headerContainer.appendChild(headerElement);

const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.type = 'text/css';
linkElement.href = 'css/styles.css';
document.head.appendChild(linkElement);

const menuContainer = document.getElementById('menuContainer');

// Fonction pour mettre à jour le menu en fonction des résultats du filtre
function updateMenu(filteredRecipes) {
    menuContainer.innerHTML = '';
    filteredRecipes.forEach((recipe) => {
        const menuCardFactoryInstance = menuCardFactory(recipe);
        const menuCardElement = menuCardFactoryInstance.createMenuCard();
        menuContainer.appendChild(menuCardElement);
    });
}

// Utilisez le filterFactory pour créer le filtre
const filterFactoryInstance = filterFactory(recipes, updateMenu);
const filterContainer = document.getElementById('filterContainer');
const filterElement = filterFactoryInstance.createFilter();
filterContainer.appendChild(filterElement);

// Créez la barre de filtre en passant les recettes et la fonction de rappel 'filterRecipes'
const myFilterBar = filterBarFactory(recipes, (type, option) => {
    const filteredRecipes = filterRecipes(recipes, type, option);
    updateMenu(filteredRecipes);
});

// Ajoutez la barre de filtre au DOM
document.body.appendChild(myFilterBar.createFilterBar());

// Fonction d'initialisation qui crée une carte de menu pour chaque recette
function init(recipes) {
    recipes.forEach((recipe) => {
        const menuCardFactoryInstance = menuCardFactory(recipe);
        const menuCardElement = menuCardFactoryInstance.createMenuCard();
        menuContainer.appendChild(menuCardElement);
    });
}

// Appel de la fonction init après que tout est déclaré et initialisé
init(recipes);
