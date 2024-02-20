// factories/header.js

import { filterFactory } from './filter.js'; 

export function headerFactory(callback, recipes) {
    function createHeader() {
        // Créer l'élément d'en-tête
        const header = document.createElement('div');
        header.classList.add('header'); 

        const headerContent = document.createElement('div');
        headerContent.style.width = '1444px';
        headerContent.style.height = '600px';
        headerContent.style.backgroundImage = 'url("assets/header.png")'; 
        headerContent.style.backgroundSize = 'cover'; 
        headerContent.style.backgroundPosition = 'center'; 
        headerContent.style.position = 'relative';

       
        const additionalText = document.createElement('p');
        additionalText.textContent = "Les Petits Plats";
        additionalText.style.color = "#FFD15B";
        additionalText.style.position = 'absolute';
        additionalText.style.top = '10px'; 
        additionalText.style.right = '10px'; 

       
        const pointImage = document.createElement('img');
        pointImage.src = 'assets/point.png'; 
        pointImage.alt = 'Point';
        pointImage.style.width = '10px'; 
        pointImage.style.height = '10px';
        pointImage.style.marginLeft = '5px'; 

        additionalText.appendChild(pointImage);

        headerContent.appendChild(additionalText);

        
        const headerText = document.createElement('p');
        headerText.textContent = "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES";
        headerText.style.color = "#FFD15B";
        headerText.style.textAlign = 'center';
        headerText.style.position = 'absolute';
        headerText.style.left = '50%';
        headerText.style.top = '50%';
        headerText.style.transform = 'translate(-50%, -50%)'; 
        headerText.style.marginTop = '-50px'; 

        // Ajouter la barre de recherche Bootstrap centrée en dessous de la phrase et au centre de l'image
        const searchContainer = document.createElement('div');
        searchContainer.classList.add('mx-auto', 'mt-4', 'text-center', 'position-absolute', 'bottom-0', 'start-50', 'translate-middle-x'); 
        searchContainer.style.zIndex = '1'; 
        searchContainer.classList.add('d-flex', 'align-items-center');

              // Création et configuration de l'input de recherche
              const searchInput = document.createElement('input');
              searchInput.classList.add('form-control');
              searchInput.id = 'form-control'; // Assurez-vous que cet ID est unique ou utilisez une classe si multiple
              searchInput.type = 'text';
              searchInput.placeholder = 'Rechercher une recette...';
            
        // Ajouter le conteneur du logo et le logo à droite du champ de recherche
        
        const searchLogoContainer = document.createElement('div');

        const searchLogo = document.createElement('img');
        searchLogo.classList.add('search-logo-container')
        searchLogo.src = 'assets/loupe.png'; 
        searchLogo.alt = 'Loupe';
        searchLogo.style.width = '50px'; 
        searchLogo.style.height = '50px';

        searchLogoContainer.appendChild(searchLogo);

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchLogoContainer);

        // Ajouter l'en-tête à la page
        headerContent.appendChild(additionalText);
        headerContent.appendChild(headerText);
        headerContent.appendChild(searchContainer); 
        header.appendChild(headerContent);


return header ;

    }

    return { createHeader };
}
