

export function filterFactory(recipes, callback) {
    function filterRecipes(searchText) {
        const motCle = searchText.toLowerCase();
        const resultats = motCle === "" ?
            recipes :
            recipes.filter(recette => 
                recette.name.toLowerCase().includes(motCle) ||
                recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(motCle)) ||
                recette.description.toLowerCase().includes(motCle)
            );
        callback(resultats);
    }

    return { filterRecipes };
}

