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

        // Ajouter la phrase "Les Petits Plats" en haut à droite de l'image
        const additionalText = document.createElement('p');
        additionalText.textContent = "Les Petits Plats";
        additionalText.style.color = "#FFD15B";
        additionalText.style.position = 'absolute';
        additionalText.style.top = '10px'; 
        additionalText.style.right = '10px'; 

        // Ajouter le point.png à côté de la phrase "Les Petits Plats"
        const pointImage = document.createElement('img');
        pointImage.src = 'assets/point.png'; 
        pointImage.alt = 'Point';
        pointImage.style.width = '10px'; 
        pointImage.style.height = '10px';
        pointImage.style.marginLeft = '5px'; // Ajustez la marge à gauche selon vos préférences

        additionalText.appendChild(pointImage);

        headerContent.appendChild(additionalText);

        // Ajouter la phrase centrée au-dessus de l'image
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
        searchContainer.classList.add('mx-auto', 'mt-4', 'text-center', 'position-absolute', 'bottom-0', 'start-50', 'translate-middle-x'); // Ajouter des classes pour le centrage
        searchContainer.style.zIndex = '1'; 

        const searchInput = document.createElement('input');
        searchInput.classList.add('form-control');
        searchInput.type = 'text';
        searchInput.placeholder = 'Rechercher...';

        // Ajouter le conteneur du logo et le logo à droite du champ de recherche
        const searchLogoContainer = document.createElement('div');

        const searchLogo = document.createElement('img');
        searchLogo.src = 'assets/loupe.png'; 
        searchLogo.alt = 'Loupe';
        searchLogo.style.width = '20px'; 
        searchLogo.style.height = '20px';

        searchLogoContainer.appendChild(searchLogo);

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchLogoContainer);

        // Ajouter l'en-tête à la page
        headerContent.appendChild(additionalText);
        headerContent.appendChild(headerText);
        headerContent.appendChild(searchContainer); 
        header.appendChild(headerContent);

                // Utilisez le filterFactory pour créer le filtre
                const filterFactoryInstance = filterFactory(recipes, callback);
                const filterElement = filterFactoryInstance.createFilter();
        
                // Ajoutez le filtre à votre DOM, par exemple, à un élément avec un id "filterContainer"
                const filterContainer = document.getElementById('filterContainer');
                filterContainer.appendChild(filterElement);

                headerContent.appendChild(searchContainer);
header.appendChild(headerContent);

// Attendre le chargement du DOM avant d'ajouter le filtre
document.addEventListener('DOMContentLoaded', function () {
    const filterContainer = document.getElementById('filterContainer');
    filterContainer.appendChild(filterElement);
});

return header;

    }

    return { createHeader };
}
