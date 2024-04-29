

export function filterFactory(recipes, callback) {
    function filterRecipes(searchText) {
        const motCle = searchText.toLowerCase();
        let resultats = [];

        if (motCle === "") {
            resultats = recipes;
        } else {
            for (let i = 0; i < recipes.length; i++) {
                const recette = recipes[i];
                let found = recette.name.toLowerCase().indexOf(motCle) !== -1 || recette.description.toLowerCase().indexOf(motCle) !== -1;
                
                if (!found) {
                    // Utilisation d'une boucle for pour remplacer 'some'
                    for (let j = 0; j < recette.ingredients.length; j++) {
                        const ingredient = recette.ingredients[j];
                        if (ingredient.ingredient.toLowerCase().indexOf(motCle) !== -1) {
                            found = true;
                            break; // Trouvé dans les ingrédients, on arrête la recherche
                        }
                    }
                }
                
                // Si trouvé dans le nom, la description ou les ingrédients, ajoutez la recette aux résultats
                if (found) {
                    resultats.push(recette);
                }
            }
        }

        callback(resultats);
    }

    return { filterRecipes };
}


