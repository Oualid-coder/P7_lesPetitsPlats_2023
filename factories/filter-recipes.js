// filterRecipes.js


export function filterRecipes(recipes, type, option) {
    let filteredRecipes;
  
    if (type === 'ingredients') {
        filteredRecipes = recipes.filter(recipe =>
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === option.toLowerCase())
        );
    } else if (type === 'appliance') {
        filteredRecipes = recipes.filter(recipe => recipe.appliance.toLowerCase() === option.toLowerCase());
    } else if (type === 'ustensils') {
        filteredRecipes = recipes.filter(recipe => recipe.ustensils.includes(option.toLowerCase()));
    }
    
    return filteredRecipes;
}
