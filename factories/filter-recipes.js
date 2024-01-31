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

        
    
        options.forEach((option) => {
            const optionElement = document.createElement('a');
            optionElement.textContent = option;
            optionElement.addEventListener('click', (e) => {
                e.preventDefault();
                const filteredRecipes = filterRecipes(recipes, type, option.toLowerCase().trim());
                callback(filteredRecipes);
            });
            dropdownContent.appendChild(optionElement);
        });
        
    
        return dropdownContainer;
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
    
    console.log(filterRecipes(recipes, 'ustensils', 'bol'.toLowerCase()));

   


     function filterRecipes(recipes, type, option) {
        console.log(`Filtrage des recettes pour le type ${type} et l'option ${option}`);
        option = option.toLowerCase().trim();
        let filteredRecipes = [];
      
    
        if (type === 'ingredients') {
            filteredRecipes = recipes.filter(recipe =>
                recipe.ingredients.some(ingredient => ingredient.ingredient === option));
        } else if (type === 'ustensils') {
            filteredRecipes = recipes.filter(recipe => 
                recipe.ustensils.includes(option));
        } else if (type === 'appliance') {
            filteredRecipes = recipes.filter(recipe => 
                recipe.appliance === option);
        }
       
    
        console.log(`Recettes filtrées (${filteredRecipes.length}) :`, filteredRecipes);
    
        
        
        return filteredRecipes;
    }

    return { createFilterBar };
    
}



