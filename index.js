    import { recipes } from './recipes.js';
    import { menuCardFactory } from './factories/menu.js';
    import { filterRecipes } from './factories/filter-recipes.js';
    import { headerFactory } from './factories/header.js';
    import {filterBarFactory } from './factories/filter-recipes.js';

    export let initialRecipes = [...recipes];
    export let currentFilteredRecipes = [...recipes];


    let lastSearchResults = [...initialRecipes];
// Liste pour stocker les critères de filtrage actifs
export let activeFilters = [];


export function applyAllActiveFilters() {
    let filtered = [...lastSearchResults]; // Commencez avec les résultats de la dernière recherche globale

    for (const filter of activeFilters) {
        filtered = filterRecipes(filtered, filter.type, filter.value);
    }

    currentFilteredRecipes = filtered;
    updateMenu(currentFilteredRecipes);
}
    
    
function filterGlobalSearch(recipes, searchTerm) {
    return recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchTerm))
    );
}

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
    export    function updateMenu(filteredRecipes) {
        // Vérifier si filteredRecipes est défini avant de l'utiliser
        if (filteredRecipes) {
            clearMenuContainer(menuContainer);  // Supprime les contenus actuels du conteneur de menu
    
            let recipeCountElement = document.getElementById('recipeCount');
            if (!recipeCountElement) {
                recipeCountElement = document.createElement('span');
                recipeCountElement.id = 'recipeCount';
                filterContainer.appendChild(recipeCountElement);
            }
            recipeCountElement.textContent = `${filteredRecipes.length} recettes`;
    
            filteredRecipes.forEach(recipe => {
                const menuCardElement = menuCardFactory(recipe).createMenuCard();
                menuContainer.appendChild(menuCardElement);
            });
        } else {
            console.error("filteredRecipes est undefined dans updateMenu.");
        }
    }
  

    function updateInputHeader() {
        const searchInput = document.querySelector('.form-control');
    
        searchInput.addEventListener('input', () => {
            const inputValue = searchInput.value.trim().toLowerCase();
            if (inputValue.length === 0) {
                lastSearchResults = [...initialRecipes]; // Réinitialiser aux recettes initiales si la recherche est vide.
                updateMenu(recipes);
            } else {
                lastSearchResults = filterGlobalSearch([...initialRecipes], inputValue);
            }
            applyAllActiveFilters();
        });
    }
    

    // Fonction pour mettre à jour le menu en fonction des résultats du filtrage par tags
    function updateFilterTags() {
        const filterBarFactoryInstance = filterBarFactory(currentFilteredRecipes, updateMenu);
        if (filterBarFactoryInstance && filterBarFactoryInstance.filterRecipes) {
            filterBarFactoryInstance.filterRecipes.forEach(filterRecipe => {
                filterRecipe.addEventListener('click', () => {
                    // Récupérer les résultats filtrés par les tags
                    const filteredByTags = filterBarFactoryInstance.filteredRecipes;
                    // Filtrer les résultats précédemment filtrés par les tags avec la nouvelle entrée du champ de recherche
                    const combinedFilteredRecipes = mergeFilteredRecipes(currentFilteredRecipes, filteredByTags);
                    updateMenu(combinedFilteredRecipes);
                });
            });
        }
    }

    function mergeFilteredRecipes(filteredByInput, filteredByTags) {
        if (!filteredByInput || !filteredByTags) {
            console.error("Un des ensembles de recettes n'est pas un tableau valide.");
            return [];
     }

    const filteredById = new Map();

    // Cumuler les recettes en utilisant un identifiant unique si disponible, ou l'objet recette lui-même
    [...filteredByInput, ...filteredByTags].forEach(recipe => {
        filteredById.set(recipe.id, recipe); // Assurez-vous que chaque recette a un attribut 'id' unique
    });

    return Array.from(filteredById.values());
}


    function closeBtnHandle() {
        const resetIcon = document.querySelector('.reset-icon');
        resetIcon.addEventListener('click', resetFilters);
    }


    // Créer une instance de filterBarFactory pour les filtres par ustensils etc ...
    let filterBarFactoryInstance = filterBarFactory(currentFilteredRecipes, updateMenu);


    const filterBar = filterBarFactoryInstance.createFilterBar();
    filterContainer.appendChild(filterBar); 

    // Fonction d'initialisation qui crée une carte de menu pour chaque recette
    function init(recipes) {    
        updateMenu(recipes);
        updateInputHeader(recipes)
        closeBtnHandle(recipes)
        updateFilterTags(recipes);

       
    }

    init(recipes);