export function menuCardFactory(recipe) {
    function createMenuCard() {
        // Créer l'élément de carte du menu
        const menuCard = document.createElement('div');
        menuCard.classList.add('menu-card');
        menuCard.style.width = '422px';
        menuCard.style.height = '891px'; 
        menuCard.style.borderRadius = '21px';
        menuCard.style.position = 'relative';
        menuCard.style.overflow = 'hidden';
        menuCard.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        menuCard.style.backgroundColor = '#fff';

        // Ajouter l'image
        const image = document.createElement('img');
        image.src = `assets/${recipe.image}`;
        image.style.width = '100%';
        image.style.height = '30%'; // Adapté à la taille de l'image
        image.style.objectFit = 'cover';
        image.style.borderTopLeftRadius = '21px';
        image.style.borderTopRightRadius = '21px';
        menuCard.appendChild(image);

                // Créer et configurer le conteneur du temps de préparation
        const timeContainer = document.createElement('div');
        timeContainer.textContent = `${recipe.time} min`; 
        timeContainer.style.position = 'absolute'; // Positionnement absolu par rapport au parent relatif
        timeContainer.style.top = '10px'; // Décalage par rapport au haut de l'image
        timeContainer.style.right = '21px'; // Décalage par rapport au côté gauche de l'image
        timeContainer.style.backgroundColor = '#FFD15B'; // Fond semi-transparent pour la lisibilité
        timeContainer.style.color = 'black'; // Texte en blanc pour contraster avec le fond sombre
        timeContainer.style.padding = '5px 10px'; // Un peu de padding autour du texte
        timeContainer.style.borderRadius = '15px'; // Bords arrondis pour esthétique
        timeContainer.style.fontWeight = 'bold'; // Texte en gras pour se démarquer
        timeContainer.style.zIndex = '10'; // se superpose à l'image

        // Ajouter le titre de la recette
        const title = document.createElement('h2');
        title.textContent = recipe.name;
        title.style.margin = '10px';
        menuCard.appendChild(title);

        const recette = document.createElement('h6');
        recette.classList.add('title-recette')
        recette.innerText = 'RECETTE'; 
        menuCard.appendChild(recette);

        // Ajouter la description de la recette
        const description = document.createElement('p');
        description.textContent = recipe.description;
        description.style.margin = '10px';
        menuCard.appendChild(description);
      

        const ingredienTitle = document.createElement('h6');
        ingredienTitle.classList.add('title-ingredient')
        ingredienTitle.innerText = 'INGREDIENTS'; 
        menuCard.appendChild(ingredienTitle);


        // Ajouter les ingrédients
        const ingredientsList = document.createElement('div');
        ingredientsList.style.display = 'flex';
        ingredientsList.style.flexWrap = 'wrap';
        ingredientsList.style.justifyContent = 'space-between';
        ingredientsList.style.padding = '0 10px';
        
        recipe.ingredients.forEach((ingredient) => {
            if(ingredient.unit){
                const ingredientContainer = document.createElement('div');
                ingredientContainer.style.flexBasis = 'calc(50% - 10px)';
                ingredientContainer.style.display = 'flex';
                ingredientContainer.style.justifyContent = 'space-between';
                ingredientContainer.style.flexDirection = 'column';
                ingredientContainer.style.marginBottom = '5px';
                
                const ingredientName = document.createElement('span');
                ingredientName.textContent = ingredient.ingredient;
                ingredientName.style.fontWeight = 'bold';
    
                const ingredientQuantityUnit = document.createElement('span');
                ingredientQuantityUnit.textContent = `${ingredient.quantity} ${ingredient.unit}`;
    
                ingredientContainer.appendChild(ingredientName);
                ingredientContainer.appendChild(ingredientQuantityUnit);
    
                ingredientsList.appendChild(ingredientContainer);
            }else{
                const ingredientContainer = document.createElement('div');
                ingredientContainer.style.flexBasis = 'calc(50% - 10px)';
                ingredientContainer.style.display = 'flex';
                ingredientContainer.style.justifyContent = 'space-between';
                ingredientContainer.style.flexDirection = 'column';
                ingredientContainer.style.marginBottom = '5px';
                
                const ingredientName = document.createElement('span');
                ingredientName.textContent = ingredient.ingredient;
                ingredientName.style.fontWeight = 'bold';
    
                const ingredientQuantity = document.createElement('span');
                ingredientQuantity.textContent = `${ingredient.quantity}`;
    
    
                ingredientContainer.appendChild(ingredientName);
                ingredientContainer.appendChild(ingredientQuantity);
                
    
                ingredientsList.appendChild(ingredientContainer);
            }
    
        });

        menuCard.appendChild(ingredientsList);
        menuCard.appendChild(timeContainer);



        return menuCard;
    }

    return { createMenuCard };
}
