import { initialRecipes } from '../index.js'

export function filterBarFactory(recipes, updateDisplayCallback) {
    if (typeof updateDisplayCallback !== 'function') {
        throw new Error('updateDisplayCallback must be a function');
    }

    function createFilterBar() {
        const filterBar = document.createElement('div');
        filterBar.classList.add('filter-bar');

        const filterIngredients = createDropdown('Ingrédients', getUniqueIngredients(recipes), 'ingredients', updateDisplayCallback);

        filterBar.appendChild(filterIngredients);

        const filterAppliances = createDropdown('Appareils', getUniqueAppliances(recipes),'appliance', updateDisplayCallback);
        filterBar.appendChild(filterAppliances);

        const filterUstensils = createDropdown('Ustensiles', getUniqueUstensils(recipes),'ustensils', updateDisplayCallback);
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


            // Créez l'icône de réinitialisation et ajoutez-la au conteneur de recherche
        const resetIcon = document.createElement('span');
        resetIcon.textContent = '×';
        resetIcon.classList.add('reset-icon');
        resetIcon.style.visibility = 'hidden'; // initialement caché
        resetIcon.style.cursor = 'pointer';
        resetIcon.style.position='absolute';
        resetIcon.style.left='111px';
        resetIcon.style.marginRight = '0.5em'; 
        
        // Ajoutez des événements pour gérer l'affichage et la réinitialisation
        resetIcon.addEventListener('click', () => {
            searchInput.value = '';
            resetIcon.style.visibility = 'hidden';
            searchInput.dispatchEvent(new Event('input')); // Déclenchez l'événement 'input' pour réinitialiser la liste
        });

        searchContainer.appendChild(resetIcon);

         // Bouton de la loupe
    const searchButton = document.createElement('button');
    searchButton.id='search-button';
    searchButton.innerHTML = '<img src="assets/loop4.svg" alt="Rechercher">';  // Utilisez votre propre icône ici
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
        optionElement.classList.add('option')
        optionElement.addEventListener('click', (e) => {
            e.preventDefault();
            const filteredRecipes = filterRecipes(recipes, type, option.toLowerCase().trim());
            callback(filteredRecipes);
            createTag(option, tagsContainer, type, callback);
        });
        dropdownContent.appendChild(optionElement);
    });

    // Réappliquez le focus sur l'input de recherche, si nécessaire
    const searchInput = searchContainer.querySelector('.search-input');
    if (searchInput) {
        searchInput.focus();
    }


    }


    function getUniqueIngredients(recipes) {
        return [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))].sort();
    }

    function getUniqueAppliances(recipes) {
        return [...new Set(recipes.map(recipe => recipe.appliance.toLowerCase()))].sort();
    }
    

    function getUniqueUstensils(recipes) {
        return [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())))].sort();
    }
    


    return { createFilterBar };
    
}


function createTag(option, container, type, callback) {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.textContent = option;
    tag.dataset.type = type; // Stocke le type de filtre utilisé pour le tag
    tag.dataset.value = option.toLowerCase().trim(); // Stocke la valeur de l'option utilisée pour le tag

    tag.addEventListener('click', () => {
        const filteredRecipes = filterRecipes(initialRecipes, tag.dataset.type, tag.dataset.value);
        callback(filteredRecipes);
    });

    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.classList.add('tag-close-btn');
    closeBtn.onclick = (e) => {
        e.stopPropagation();
        container.removeChild(tag);
        refilterAfterTagRemoval(container, callback);
    };

    tag.appendChild(closeBtn);
    container.appendChild(tag);
}



function refilterAfterTagRemoval(tagsContainer, callback) {
    const tags = Array.from(tagsContainer.querySelectorAll('.tag'));
    let filteredRecipes = [...initialRecipes]; // Commence avec toutes les recettes initiales

    // Applique les filtres pour chaque tag restant
    tags.forEach(tag => {
        filteredRecipes = filterRecipes(filteredRecipes, tag.dataset.type, tag.dataset.value);
    });

    callback(filteredRecipes); // Met à jour l'affichage avec les recettes filtrées
}



function filterRecipes(allRecipes, filterType, filterValue) {
    if (!Array.isArray(allRecipes) || allRecipes.length === 0) {
        console.error("filterRecipes appelé avec des données non valides ou un tableau vide:", allRecipes);
        return [];
    }

    console.log(`Filtrage des recettes pour le type ${filterType} et l'option ${filterValue}`);
    filterValue = filterValue.toLowerCase().trim();
    let filteredRecipes = [];

    let i, j, recipe, ingredient;
    for (i = 0; i < allRecipes.length; i++) {
        recipe = allRecipes[i];

        if (filterType === 'ingredients') {
            for (j = 0; j < recipe.ingredients.length; j++) {
                ingredient = recipe.ingredients[j];
                if (ingredient.ingredient.toLowerCase() === filterValue) {
                    filteredRecipes.push(recipe);
                    break; // Arrête la recherche d'ingrédients si on en trouve un correspondant
                }
            }
        } else if (filterType === 'ustensils') {
            j = 0;
            while (j < recipe.ustensils.length) {
                if (recipe.ustensils[j].toLowerCase() === filterValue) {
                    filteredRecipes.push(recipe);
                    break; // Arrête la recherche si on trouve un ustensile correspondant
                }
                j++;
            }
        } else if (filterType === 'appliance') {
            if (recipe.appliance.toLowerCase() === filterValue) {
                filteredRecipes.push(recipe);
            }
        } else {
            console.error("Type de filtre non reconnu:", filterType);
            return allRecipes; // En cas de doute, ne filtrez pas
        }
    }
    return filteredRecipes;
}





