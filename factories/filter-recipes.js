
import { applyAllActiveFilters } from '../index.js';
import { activeFilters } from '../index.js';
import { updateMenu } from '../index.js';


export function filterBarFactory(currentFilteredRecipes,updateDisplayCallback) {
    if (typeof updateDisplayCallback !== 'function') {
        throw new Error('updateDisplayCallback must be a function');
    }

    function createFilterBar() {
        const filterBar = document.createElement('div');
        filterBar.classList.add('filter-bar');

        const filterIngredients = createDropdown('Ingrédients', getUniqueIngredients(currentFilteredRecipes), 'ingredients', updateDisplayCallback);

        filterBar.appendChild(filterIngredients);

        const filterAppliances = createDropdown('Appareils', getUniqueAppliances(currentFilteredRecipes),'appliance', updateDisplayCallback);
        filterBar.appendChild(filterAppliances);

        const filterUstensils = createDropdown('Ustensiles', getUniqueUstensils(currentFilteredRecipes),'ustensils', updateDisplayCallback);
        filterBar.appendChild(filterUstensils);

        return filterBar;
    }

    
   
    function createDropdown(title, options, type, callback) {
        const dropdownContainer = document.createElement('div');
        dropdownContainer.classList.add('dropdown');
 
        const button = document.createElement('button');
        button.textContent = title;
        button.classList.add('dropdown-button');
        dropdownContainer.appendChild(button);
    
        const dropdownContent = document.createElement('div');
        dropdownContent.classList.add('dropdown-content');
        dropdownContainer.appendChild(dropdownContent);


        // Créez un conteneur pour l'input et l'icône de loupe
        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search-container');
        searchContainer.style.display = 'flex';
        searchContainer.style.alignItems = 'center';
        searchContainer.style.position='relative';
        dropdownContent.appendChild(searchContainer);


        // Créez l'icône de réinitialisation et ajouter au conteneur de recherche
        const resetIcon = document.createElement('span');
        resetIcon.textContent = '×';
        resetIcon.classList.add('reset-icon');
        resetIcon.style.visibility = 'hidden'; // initialement caché
        resetIcon.style.cursor = 'pointer';
        resetIcon.style.position='absolute';
        resetIcon.style.left='111px';
        resetIcon.style.marginRight = '0.5em'; 
        
        // Ajout des événements pour gérer l'affichage et la réinitialisation
        resetIcon.addEventListener('click', () => {
            searchInput.value = '';
            resetIcon.style.visibility = 'hidden';
            searchInput.dispatchEvent(new Event('input')); // Déclenchez l'événement 'input' pour réinitialiser la liste
        });

        searchContainer.appendChild(resetIcon);

        // Bouton de la loupe
        const searchButton = document.createElement('button');
        searchButton.id='search-button';
        searchButton.innerHTML = '<img src="assets/loop4.svg" alt="Rechercher">'; 
        searchContainer.appendChild(searchButton);
    
        const searchInput = document.createElement('input');
        searchInput.classList.add('search-input', 'search-input-with-icon');        
        searchInput.style.backgroundPosition = "right 10px center";
        searchInput.style.backgroundRepeat = "no-repeat";

        searchInput.addEventListener('input', () => {
            const hasValue = searchInput.value.length > 0;
            resetIcon.style.visibility = hasValue ? 'visible' : 'hidden';

            const searchValue = searchInput.value.toLowerCase().trim();
            if (searchValue.length >= 3) {
                currentFilteredRecipes = filterRecipes(currentFilteredRecipes, 'all', searchValue);
            } else {
                currentFilteredRecipes = initialRecipes;
            }
            updateMenu(currentFilteredRecipes);
        });
     
        searchContainer.appendChild(searchInput);
       
        dropdownContent.appendChild(searchContainer);
    
    
        const tagsContainer = document.createElement('div');
        tagsContainer.classList.add('tags-container');
        dropdownContainer.appendChild(tagsContainer);
    
        button.addEventListener('click', () => {
            button.classList.toggle('chevron-up');
            dropdownContent.classList.toggle('show');
        });

        // Attacher les options initiales à dropdownContent
        attachOptionsToDropdown(options, dropdownContent, type, callback, tagsContainer);
    
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let filteredOptions = options;
            if (searchTerm.length >= 3) {
                filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm));
            }
            // Mise à jour des options affichées
            attachOptionsToDropdown(filteredOptions, dropdownContent, type, callback, tagsContainer);
        });
    
        return dropdownContainer;
    }


    
    function attachOptionsToDropdown(options, dropdownContent, type, callback, tagsContainer) {
        // Obtenez le premier enfant, qui devrait être le conteneur de recherche
        const searchContainer = dropdownContent.firstChild;
    
        // Supprimez tout sauf le conteneur de recherche
        while (dropdownContent.lastChild !== searchContainer) {
            dropdownContent.removeChild(dropdownContent.lastChild);
        }
    
        // Ajoutez les options filtrées ou toutes les options
        options.forEach(option => {
            const optionElement = document.createElement('a');
            optionElement.textContent = option;
            optionElement.classList.add('option');
            dropdownContent.appendChild(optionElement); // Ajouter l'élément d'option au contenu du menu déroulant
    
            optionElement.addEventListener('click', (e) => {
                e.preventDefault();
                // Gérer les filtres de manière cumulative
                createTag(option, tagsContainer, type, callback);
                const tagFilterIndex = activeFilters.findIndex(f => f.type === type && f.value === option.toLowerCase().trim());
                if (tagFilterIndex === -1) {
                    activeFilters.push({ type: type, value: option.toLowerCase().trim() });
                } else {
                    // Optionnel : toggle off si déjà sélectionné
                    activeFilters.splice(tagFilterIndex, 1);
                }
                applyAllActiveFilters(); // Appliquer tous les filtres actifs après mise à jour
            });
            
        });
    
    // Réappliquez le focus sur l'input de recherche, si nécessaire
    const searchInput = searchContainer.querySelector('.search-input');
    if (searchInput) {
        searchInput.focus();
    }

    }


    function getUniqueIngredients(currentFilteredRecipes) {
        return [...new Set(currentFilteredRecipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))].sort();
    }

    function getUniqueAppliances(currentFilteredRecipes) {
        return [...new Set(currentFilteredRecipes.map(recipe => recipe.appliance.toLowerCase()))].sort();
    }
    

    function getUniqueUstensils(currentFilteredRecipes) {
        return [...new Set(currentFilteredRecipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())))].sort();
    }
    


    return { createFilterBar };
    
}


export function createTag(option, container, type, callback) {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.textContent = option;
    tag.dataset.type = type; // Stocke le type de filtre utilisé pour le tag
    tag.dataset.value = option.toLowerCase().trim(); // Stocke la valeur de l'option utilisée pour le tag

    tag.addEventListener('click', () => {
        const tagFilterIndex = activeFilters.findIndex(f => f.type === filterType && f.value === filterValue);
        if (tagFilterIndex === -1) {
            activeFilters.push({ type: filterType, value: filterValue });
        } else {
            // Optionnel: géstion de la suppression du filtre si déjà présent (toggle)
            activeFilters.splice(tagFilterIndex, 1);
        }
        applyAllActiveFilters();
    });

    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.classList.add('tag-close-btn');
    closeBtn.onclick = (e) => {
        e.stopPropagation();
        container.removeChild(tag);
        // Retirer également le tag de `activeFilters`
        const index = activeFilters.findIndex(f => f.type === tag.dataset.type && f.value === tag.dataset.value);
        if (index !== -1) {
            activeFilters.splice(index, 1);
            applyAllActiveFilters(); // Réappliquer les filtres après la suppression d'un tag
        }
    };

    tag.appendChild(closeBtn);
    container.appendChild(tag);
}


export function filterRecipes(recipes, filterType, filterValue) {
    if (!Array.isArray(recipes) || recipes.length === 0) {
        console.error("filterRecipes appelé avec des données non valides ou un tableau vide:", recipes);
        return [];
    }

    console.log(`Filtrage des recettes pour le type ${filterType} et l'option ${filterValue}`);
    filterValue = filterValue.toLowerCase().trim();

    switch (filterType) {
        case 'ingredients':
            return recipes.filter(recipe => 
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filterValue))
            );
        case 'ustensils':
            return recipes.filter(recipe => 
                recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filterValue))
            );
        case 'appliance':
            return recipes.filter(recipe => 
                recipe.appliance.toLowerCase().includes(filterValue)
            );
        default:
            console.error("Type de filtre non reconnu:", filterType);
            return recipes; 
    }
}



// export function filterRecipes(recipes, filterType, filterValue) {
//     if (!Array.isArray(recipes) || recipes.length === 0) {
//         console.error("filterRecipes appelé avec des données non valides ou un tableau vide:", recipes);
//         return [];
//     }

//     console.log(`Filtrage des recettes pour le type ${filterType} et l'option ${filterValue}`);
//     filterValue = filterValue.toLowerCase().trim();

//     let resultats = [];

//     switch (filterType) {
//         case 'ingredients':
//             for (let i = 0; i < recipes.length; i++) {
//                 let recette = recipes[i];
//                 let ingredientsMatch = false;

//                 let j = 0;
//                 while (j < recette.ingredients.length && !ingredientsMatch) {
//                     if (recette.ingredients[j].ingredient.toLowerCase().includes(filterValue)) {
//                         ingredientsMatch = true;
//                     }
//                     j++;
//                 }

//                 if (ingredientsMatch) {
//                     resultats.push(recette);
//                 }
//             }
//             break;
//         case 'ustensils':
//             for (let i = 0; i < recipes.length; i++) {
//                 let recette = recipes[i];
//                 let ustensilsMatch = false;

//                 let j = 0;
//                 while (j < recette.ustensils.length && !ustensilsMatch) {
//                     if (recette.ustensils[j].toLowerCase().includes(filterValue)) {
//                         ustensilsMatch = true;
//                     }
//                     j++;
//                 }

//                 if (ustensilsMatch) {
//                     resultats.push(recette);
//                 }
//             }
//             break;
//         case 'appliance':
//             for (let i = 0; i < recipes.length; i++) {
//                 let recette = recipes[i];
//                 if (recette.appliance.toLowerCase().includes(filterValue)) {
//                     resultats.push(recette);
//                 }
//             }
//             break;
//         default:
//             console.error("Type de filtre non reconnu:", filterType);
//             return recipes;
//     }

//     return resultats;
// }

