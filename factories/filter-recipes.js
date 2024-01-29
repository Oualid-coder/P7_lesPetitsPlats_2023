// filterRecipes.js

export function filterBarFactory(recipes, updateDisplayCallback) {
    if (typeof updateDisplayCallback !== 'function') {
        throw new Error('updateDisplayCallback must be a function');
    }

    function createFilterBar() {
        const filterBar = document.createElement('div');
        filterBar.classList.add('filter-bar');

        const filterIngredients = createDropdown('Ingrédients', getUniqueIngredients(recipes), 'ingredients', updateDisplayCallback);

        filterBar.appendChild(filterIngredients);

        const filterAppliances = createDropdown('Appareils', getUniqueAppliances(recipes),'appareils', updateDisplayCallback);
        filterBar.appendChild(filterAppliances);

        const filterUstensils = createDropdown('Ustensiles', getUniqueUstensils(recipes),'ustensiles', updateDisplayCallback);
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
            optionElement.addEventListener('click', (e) => {
                e.preventDefault();
                const filteredRecipes = filterRecipes(recipes, type, option);
                callback(filteredRecipes);
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

export function filterRecipes(recipes, type, option) {
    let filteredRecipes = [];

    console.log(`Filtrage par ${type} avec l'option ${option}`);

    if (type === 'ingredients') {
        filteredRecipes = recipes.filter(recipe =>
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === option.toLowerCase())
        );
    } else if (type === 'appliance') {
        filteredRecipes = recipes.filter(recipe => recipe.appliance.toLowerCase() === option.toLowerCase());
    } else if (type === 'ustensils') {
        filteredRecipes = recipes.filter(recipe => 
            recipe.ustensils.map(ustensil => ustensil.toLowerCase()).includes(option.toLowerCase())
        );
    }

    console.log(filterRecipes(recipes, 'ustensils', 'couteau'));
console.log(filterRecipes(recipes, 'appliance', 'blender'));


    console.log(`Recettes filtrées : ${JSON.stringify(filteredRecipes)}`);
    return filteredRecipes;
}

