// function createTagContainer() {
//     let container = document.querySelector('.tag-container');
//     if (!container) {
//         container = document.createElement('div');
//         container.classList.add('tag-container');
//         // Supposons que .filter-bar est l'élément après lequel vous voulez insérer le container
//         const filterBar = document.querySelector('.filter-bar');
//         if (filterBar) {
//             filterBar.after(container);
//         } else {
//             // Gérer l'erreur ou l'insérer à un autre endroit du DOM
//             console.error('filter-bar element not found');
//         }
//     }
//     return container;
// }

// // Exporte la fonction pour qu'elle soit utilisée à l'extérieur du module
// export { createTagContainer };


// export function createTag(option, tagContainer, removeTagCallback) {
//     console.log(`Création du tag pour l'option : ${option}`);
//     const tag = document.createElement('div');
//     tag.classList.add('tag');
//     tag.textContent = option;

//     const closeBtn = document.createElement('span');
//     closeBtn.textContent = '×';
//     closeBtn.classList.add('tag-close-btn');
//     closeBtn.onclick = () => {
//         tag.remove();
//         removeTagCallback(option);
//     };

//     tag.appendChild(closeBtn);

//     // Ajoutez le tag au conteneur de tags spécifié.
//     tagContainer.appendChild(tag);
// }