// filterFactory.js

export function filterBarFactory(recipes, updateDisplayCallback) {
    if (typeof updateDisplayCallback !== 'function') {
        throw new Error('updateDisplayCallback must be a function');
    }

    function createFilterBar() {
        const filterBar = document.createElement('div');
        filterBar.classList.add('filter-bar');

        const filterIngredients = createDropdown('Ingrédients', getUniqueIngredients(recipes), updateDisplayCallback);
        filterBar.appendChild(filterIngredients);

        const filterAppliances = createDropdown('Appareils', getUniqueAppliances(recipes), updateDisplayCallback);
        filterBar.appendChild(filterAppliances);

        const filterUstensils = createDropdown('Ustensiles', getUniqueUstensils(recipes), updateDisplayCallback);
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
    
        options.forEach((option) => {
            const optionElement = document.createElement('a');
            optionElement.textContent = option;
            optionElement.href = '#';
            optionElement.addEventListener('click', (e) => {
                e.preventDefault();
                callback(type, option);
            });
            dropdownContent.appendChild(optionElement);
        });
    
        button.onclick = function() {
            dropdownContent.classList.toggle('show');
        };
    
        return dropdownContainer;
    }

    function getUniqueIngredients(recipes) {
        return [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))].sort();
    }

    function getUniqueAppliances(recipes) {
        return [...new Set(recipes.map(recipe => recipe.appliance))].sort();
    }

    function getUniqueUstensils(recipes) {
        return [...new Set(recipes.flatMap(recipe => recipe.ustensils))].sort();
    }

    return { createFilterBar };
}

export function filterFactory(recipes, callback) {
    function createFilter() {
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.placeholder = 'Rechercher une recette...';
        inputElement.addEventListener('input', rechercherEnTempsReel);

        function rechercherEnTempsReel() {
            const motCle = inputElement.value.toLowerCase();
            const resultats = motCle === ""
                ? recipes
                : recipes.filter(recette => filterRecipe(recette, motCle));
            callback(resultats);
        }

        function filterRecipe(recette, motCle) {
            return (
                recette.name.toLowerCase().includes(motCle) ||
                recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(motCle)) ||
                recette.description.toLowerCase().includes(motCle)
            );
        }

        return inputElement;
    }

    return { createFilter };
}



