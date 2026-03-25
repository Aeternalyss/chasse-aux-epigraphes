/**
 * @fileoverview Filtrer selon un critère
 */

/* Variables globales */
const cartes = document.querySelectorAll('.personnage-card');
const arrBtnFiltres = document.querySelectorAll('.filtres__bouton');

/* Écouteurs d'événement */
arrBtnFiltres.forEach(function (btnFiltre) {
    btnFiltre.addEventListener('click', filtrer);
});

/* Fonctions */

/* Écouteurs d'événement */


/* Fonctions */
function filtrer() {
    const critereClique = this.dataset.critere;

    cartes.forEach(function (carte) {
        const criteresCarte = carte.dataset.critere.split(','); // Ex: ['1','5']
        if (criteresCarte.includes(critereClique)) {
            carte.classList.add('selection');
        } else {
            carte.classList.remove('selection');
        }
    });
}


// function filtrer() {
//     let filtre = this.dataset.critere.split;
//     // console.log(filtre);
//     cartes.forEach(function (carte) {
//         carte.classList.remove('selection');
//         console.log(carte.dataset.critere);
        
//         if (carte.dataset.critere == filtre) {
//             carte.classList.add('selection');
//         }
//     });
// }
