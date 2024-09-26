import DOMPurify from 'dompurify';

    export function filterFactory(recipes, callback) {
        function filterRecipes(searchText) {
            const motCle = DOMPurify.sanitize(searchText.toLowerCase()); // Nettoie l'input utilisateur
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


