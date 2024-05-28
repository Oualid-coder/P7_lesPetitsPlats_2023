
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



    // export function filterFactory(recipes, callback) {
    //     function filterRecipes(searchText) {
    //         const motCle = searchText.toLowerCase();
    //         let resultats = [];

    //         if (motCle === "") {
    //             resultats = recipes;
    //         } else {
    //             for (let i = 0; i < recipes.length; i++) {
    //                 const recette = recipes[i];
    //                 let nameMatch = recette.name.toLowerCase().includes(motCle);
    //                 let descriptionMatch = recette.description.toLowerCase().includes(motCle);
    //                 let ingredientsMatch = false;

    //                 let j = 0;
    //                 while (j < recette.ingredients.length && !ingredientsMatch) {
    //                     if (recette.ingredients[j].ingredient.toLowerCase().includes(motCle)) {
    //                         ingredientsMatch = true;
    //                     }
    //                     j++;
    //                 }

    //                 if (nameMatch || descriptionMatch || ingredientsMatch) {
    //                     resultats.push(recette);
    //                 }
    //             }
    //         }

    //         callback(resultats);
    //     }

    //     return { filterRecipes };
    // }
