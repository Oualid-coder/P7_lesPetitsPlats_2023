// factories/header.js

import { filterFactory } from './filter.js'; 

export function headerFactory(callback, recipes) {
    function createHeader() {
       
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
        additionalText.style.color = "rgb(243 241 235)";
        additionalText.style.position = 'absolute';
        additionalText.style.top = '10px'; 
        additionalText.style.left = '50px'; 

       
        const pointImage = document.createElement('img');
        pointImage.src = 'assets/point.png'; 
        pointImage.alt = 'Point';
        pointImage.style.width = '10px'; 
        pointImage.style.height = '10px';
        pointImage.style.marginLeft = '5px'; 

        additionalText.appendChild(pointImage);

        headerContent.appendChild(additionalText);

        
        const headerText = document.createElement('p');
        headerText.innerHTML = "CHERCHEZ PARMI PLUS DE 1500 RECETTES<br>DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES";
        headerText.style.color = "#FFD15B";
        headerText.style.textAlign = 'center';
        headerText.style.position = 'absolute';
        headerText.style.left = '50%';
        headerText.style.top = '50%';
        headerText.style.width='100%'
        headerText.style.fontSize='44px'
        headerText.style.transform = 'translate(-50%, -50%)'; 
        headerText.style.marginTop = '-50px'; 

        // Ajouter la barre de recherche Bootstrap centrée en dessous de la phrase et au centre de l'image
        const searchContainer = document.createElement('div');
        searchContainer.classList.add('mx-auto', 'mt-4', 'text-center', 'position-absolute', 'bottom-0', 'start-50', 'translate-middle-x'); 
        searchContainer.style.zIndex = '1'; 
        searchContainer.style.top='23%'
        searchContainer.classList.add('d-flex', 'align-items-center');
        searchContainer.style.display = 'flex';
searchContainer.style.alignItems = 'center';
searchContainer.style.justifyContent = 'center';


              // Création et configuration de l'input de recherche
              const searchInput = document.createElement('input');
              searchInput.classList.add('form-control');
              searchInput.id = 'form-control'; 
              searchInput.type = 'text';
              searchInput.style.marginRight = '10px';
              searchInput.style.flexGrow = '1';
              searchInput.placeholder = 'Rechercher une recette,un ingrédient,...';
              //searchInput.style.order = '1';

                      // Créer l'icône de réinitialisation
                const resetIcon = document.createElement('div');
                resetIcon.textContent = '×'; // Remplacez par le chemin de votre icône de réinitialisation
                resetIcon.alt = 'Réinitialiser';
                resetIcon.style.width = '20px'; 
                resetIcon.style.height = '81px';
                resetIcon.style.fontSize = '54px';
                resetIcon.style.cursor = 'pointer';
                resetIcon.style.color = 'grey';
                resetIcon.style.marginRight = '10px';
                resetIcon.style.visibility = 'hidden';
                resetIcon.style.position='relative'
                resetIcon.style.right='120px'
                //resetIcon.style.order = '2';  // Assurez-vous que la croix est après l'input
                resetIcon.classList.add('reset-icon');
                resetIcon.addEventListener('click', function() {
                    searchInput.value = '';
                    resetIcon.style.visibility = 'hidden'; // Rendre l'icône invisible
                    searchInput.placeholder = 'Rechercher une recette, un ingrédient,...';
                    
                });

                searchInput.addEventListener('input', function() {
                    resetIcon.style.visibility = this.value ? 'visible' : 'hidden';
                    if (this.value === '') {
                        this.placeholder = 'Rechercher une recette, un ingrédient,...'; // Remet le placeholder si le champ est vide
                    }
                });


                searchInput.addEventListener('focus', function() {
                    this.placeholder = ''; // Supprime le placeholder lors de la saisie
                });
        
                searchInput.addEventListener('blur', function() {
                    if (this.value === '') {
                        this.placeholder = 'Rechercher une recette, un ingrédient,...'; // Remet le placeholder si le champ est vide
                    }
                });
            
            const searchLogoContainer = document.createElement('div');

            const searchLogo = document.createElement('img');
            searchLogo.classList.add('search-logo-container')
            searchLogo.src = 'assets/loupe.png'; 
            searchLogo.alt = 'Loupe';
            searchLogo.style.width = '50px'; 
            searchLogo.style.height = '50px';
            searchLogo.style.cursor = 'pointer';
            searchLogoContainer.style.flexShrink = '0';
            //searchLogoContainer.style.order = '3';
            

            searchContainer.appendChild(searchInput);
            searchContainer.appendChild(resetIcon);
            searchLogoContainer.appendChild(searchLogo);
            searchContainer.appendChild(searchLogoContainer);

            // Ajouter l'en-tête à la page
            headerContent.appendChild(additionalText);
            headerContent.appendChild(headerText);
            headerContent.appendChild(searchContainer); 
            header.appendChild(headerContent);

            searchInput.addEventListener('input', function() {
                resetIcon.style.visibility = searchInput.value.length > 0 ? 'visible' : 'hidden';
            });




return header ;

    }

    return { createHeader };
}
