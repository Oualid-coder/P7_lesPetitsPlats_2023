// // filterFactory.js

// export function filterFactory(recipes, callback) {
//     function createFilter() {
 
//         const inputElement = document.getElementById('form-control');
//         inputElement.type = 'text';
//         inputElement.placeholder = 'Rechercher une recette...';
//         inputElement.addEventListener('input', rechercherEnTempsReel);


//         function rechercherEnTempsReel() {
//             const motCle = inputElement.value.toLowerCase();
//             const resultats = motCle === ""
//                 ? recipes
//                 : recipes.filter(recette => filterRecipe(recette, motCle));
//             callback(resultats);
//         }

//         function filterRecipe(recette, motCle) {
//             return (
//                 recette.name.toLowerCase().includes(motCle) ||
//                 recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(motCle)) ||
//                 recette.description.toLowerCase().includes(motCle)
//             );
//         }

//         return inputElement;
//     }

//     return { createFilter };
// }


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

