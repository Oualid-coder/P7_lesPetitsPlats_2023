// menu.js

export function menuCardFactory(recipe) {
    function createMenuCard() {
        // Créer l'élément de carte du menu
        const menuCard = document.createElement('div');
        menuCard.classList.add('menu-card');
        menuCard.style.width = '380px';
        menuCard.style.height = '731px';
        menuCard.style.borderRadius = '21px';
        menuCard.style.position = 'relative';
        menuCard.style.overflow = 'hidden';

        // Ajouter l'image
        const image = document.createElement('img');
        image.src = `assets/${recipe.image}`;
        image.style.width = '100%';
        image.style.height = '30%';
        image.style.objectFit='cover';
        image.style.borderTopLeftRadius = '21px';
        image.style.borderTopRightRadius = '21px';
        menuCard.appendChild(image);

        // Ajouter le titre de la recette
        const title = document.createElement('h2');
        title.textContent = recipe.name;
        title.style.margin = '10px';
        menuCard.appendChild(title);

        // Ajouter la description de la recette
        const description = document.createElement('p');
        description.textContent = recipe.description;
        description.style.margin = '10px';
        menuCard.appendChild(description);

        // Ajouter les ingrédients
        const ingredientsList = document.createElement('ul');
        recipe.ingredients.forEach((ingredient) => {
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = `${ingredient.quantity || ''} ${ingredient.unit || ''} ${ingredient.ingredient}`;
            ingredientsList.appendChild(ingredientItem);
        });
        ingredientsList.style.margin = '10px';
        menuCard.appendChild(ingredientsList);

        // Ajouter le temps de préparation
        const time = document.createElement('p');
        time.textContent = `Temps de préparation : ${recipe.time} minutes`;
        time.style.margin = '10px';
        menuCard.appendChild(time);

        // Ajouter l'appareil utilisé
        const appliance = document.createElement('p');
        appliance.textContent = `Appareil : ${recipe.appliance}`;
        appliance.style.margin = '10px';
        menuCard.appendChild(appliance);

        // Ajouter le nombre de portions
        const servings = document.createElement('p');
        servings.textContent = `Nombre de portions : ${recipe.servings}`;
        servings.style.margin = '10px';
        menuCard.appendChild(servings);

        return menuCard;
    }

    return { createMenuCard };
}
