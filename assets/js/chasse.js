/* Variables globales */
const arrIdsPersonnagesAPiger = new Array("e0001", "e0008", "e0015", "e0019");
const arrIdsObjetsAPiger = new Array("e0002", "e0004", "e0007", "e0021");
const arrIdsLieuxAPiger = new Array("e0005", "e0012", "e0016", "e0022");

//*************************
// Écouteurs d'événements 
//*************************
window.addEventListener("load", initialiser); //Pas de load de page pour le moment en partie 2.
document.getElementById("btnDebuterChasse").addEventListener("click", demarrerChasse);

//*************************
// Fonctions 
//*************************

function demarrerChasse() {
    //Activer l'indice et la nav en bas une fois que le bouton est appuyer
        document.querySelector(".indice_x").classList.remove("cacher");
        document.querySelector(".lien").classList.remove("cacher");
    //Tirage au sort dans les tableaux des possibilités et mise en localStorage
    //Tirage au sort pour le personnage
    const intIndexTiragePersonnage = Math.floor(Math.random() * arrIdsPersonnagesAPiger.length);
    const strIdPersonnage = arrIdsPersonnagesAPiger[intIndexTiragePersonnage];
    //Tirage au sort pour l'objet       
    const intIndexTirageObjet = Math.floor(Math.random() * arrIdsObjetsAPiger.length);
    const strIdObjet = arrIdsObjetsAPiger[intIndexTirageObjet];
    //Tirage au sort pour le lieu
    const intIndexTirageLieu = Math.floor(Math.random() * arrIdsLieuxAPiger.length);
    const strIdLieu = arrIdsLieuxAPiger[intIndexTirageLieu];
    //Mise en localStorage
    localStorage.id_objet = strIdObjet;
    localStorage.id_lieu = strIdLieu;

    // const strIdPersonnage =intIndexTiragePersonnage ; //devra être tiré au sort parmi celles du tab des personnages
    // const strIdObjet =intIndexTirageObjet ; //devra être tiré au sort parmi celles du tab des objets
    // const strIdLieu =intIndexTirageLieu ; //devra être tiré au sort parmi celles du tab des lieux
    
    localStorage.id_personnage = strIdPersonnage;
    //syntaxe alternative pour écrire en localStorage:
    //localStorage.setItem('id_personnage', "e0008"); 
    
    //Doit aussi mettre au départ que cette réponse n'est pas trouvée par l'utilisateur
    //Idem pour les autres catégories(objet et lieu)
    localStorage.personnage_est_trouve = false;
    localStorage.objet_est_trouve = false;
    localStorage.lieu_est_trouve = false;
    
//Important Attention à lecture dans le localstorage, cela retournera du texte plutôt qu'un booléen. Donc dans un if il faudra comparer à "false" plutôt que false.
    
    //Afficher le segment qui parle du personnage
    document.getElementById("segmentPersonnage").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE + '<br>';
    //Afficher le segment qui parle de l'objet
    document.getElementById("segmentObjet").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE+'<br>';
    //Afficher le segment qui parle du lieu
    document.getElementById("segmentLieu").innerHTML = objJSONepigraphes[strIdLieu].CHASSE.INDICE+'<br>';

    //desactiver le bouton de démarrer une nouvelle chasse
    document.getElementById("btnDebuterChasse").disabled = true;
    
    //Activer les images et les remplacer une fois le bouton clicker
    //Faire supprimer le svg
    document.getElementById("svg").setAttribute("hidden","true");
    document.querySelector(".objet_svg").setAttribute("hidden","true");
    document.querySelector('.lieu_svg').setAttribute("hidden","true");

    document.getElementById("img_personnage").src = "../assets/images/Image_ChasseEpigraphe/295_flou/"+strIdPersonnage +".jpg";
    document.getElementById("img_objet").src = "../assets/images/Image_ChasseEpigraphe/295_flou/"+strIdObjet +".jpg";
    document.getElementById("img_lieu").src = "../assets/images/Image_ChasseEpigraphe/295_flou/"+strIdLieu +".jpg";
    //"personnages/" +
    //intIdFicheCourante +
    //"" +
    //objJSONepigraphes[intIdFicheCourante].PRENOM.toLowerCase() +
    //"_" +
    //objJSONepigraphes[intIdFicheCourante].NOM.toLowerCase() +
    //"_110w.jpg";

    
    
}

//afficher les element si une chasse est en cours
function initialiser() {
    document.querySelector(".indice_x").classList.remove("cacher");
    document.querySelector(".lien").classList.remove("cacher");
if (localStorage.id_personnage) {
   
    //enlever svg
    document.getElementById("svg").setAttribute("hidden","true");
    document.querySelector(".objet_svg").setAttribute("hidden","true");
    document.querySelector('.lieu_svg').setAttribute("hidden","true");
     //image floutter 
    document.getElementById("img_personnage").src = "../assets/images/Image_ChasseEpigraphe/295_flou/"+ localStorage.id_personnage +".jpg";
    document.getElementById("img_objet").src = "../assets/images/Image_ChasseEpigraphe/295_flou/"+localStorage.id_objet +".jpg";
    document.getElementById("img_lieu").src = "../assets/images/Image_ChasseEpigraphe/295_flou/"+localStorage.id_lieu +".jpg";
    //Afficher le segment qui parle du personnage
    document.getElementById("segmentPersonnage").innerHTML = objJSONepigraphes[localStorage.id_personnage].CHASSE.INDICE + '<br>';
    //Afficher le segment qui parle de l'objet
    document.getElementById("segmentObjet").innerHTML = objJSONepigraphes[localStorage.id_objet].CHASSE.INDICE+'<br>';
    //Afficher le segment qui parle du lieu
    document.getElementById("segmentLieu").innerHTML = objJSONepigraphes[localStorage.id_lieu].CHASSE.INDICE+'<br>';
    // retirer la classe cacher pour afficher les indices



    //desactiver le bouton de démarrer une nouvelle chasse
    //document.getElementById("btnDebuterChasse").disabled = true;
}
//personnage trouver
if(localStorage.personnage_est_trouve == 'true'){
    console.log("marche")
    document.getElementById("personnage__p").innerHTML = objJSONepigraphes[localStorage.id_personnage].NOM;
    document.getElementById("img_personnage").src = "../assets/images/Image_ChasseEpigraphe/292_nette/"+ localStorage.id_personnage+".jpg";
}
//objet trouver
if(localStorage.objet_est_trouve == 'true'){
    document.getElementById("objet__o").innerHTML = objJSONepigraphes[localStorage.id_objet].NOM;
    document.getElementById("img_objet").src = "../assets/images/Image_ChasseEpigraphe/292_nette/"+ localStorage.id_objet +".jpg";
}
//lieu trouver
if(localStorage.lieu_est_trouve == 'true'){
    document.getElementById("lieu__l").innerHTML = objJSONepigraphes[localStorage.id_lieu].NOM;
    document.getElementById("img_lieu").src = "../assets/images/Image_ChasseEpigraphe/292_nette/"+ localStorage.id_lieu +".jpg";
}
//message retoaction
if(localStorage.personnage_est_trouve == 'true' && localStorage.objet_est_trouve == 'true' && localStorage.lieu_est_trouve == 'true'){
    document.getElementById("concours").removeAttribute("hidden");
    document.getElementById("texte3").innerHTML = 'Bravo! Vous avez complété la chasse, vous pouvez maintenant participer au concours!';
}
};

// faire en sorte que le bouton de démarrer une nouvelle chasse soit actif si on clique sur demarer une nouvelle chasse
document.getElementById("btnDemarrerNouvelleChasse").addEventListener("click", function() {
    // réinitialiser le localStorage
    localStorage.clear();
    // réinitialiser les segments
    document.getElementById("segmentPersonnage").innerHTML = 'indice x';
    document.getElementById("segmentObjet").innerHTML = 'indice x';
    document.getElementById("segmentLieu").innerHTML = 'indice x';
    // activer le bouton de démarrer une nouvelle chasse
    document.getElementById("btnDebuterChasse").disabled = false;

    // retirer les images
    document.getElementById("svg").removeAttribute("hidden");
    document.querySelector(".objet_svg").removeAttribute("hidden");
    document.querySelector('.lieu_svg').removeAttribute("hidden");
    document.getElementById("concours").setAttribute("hidden","true");

     document.getElementById("img_objet").src = "";
     document.getElementById("img_lieu").src = "";
      document.getElementById("img_personnage").src = "";

});

// retroaction si le joueur a toutes les reponse :Bravo! Vous avez complété la chasse, vous pouvez maintenant participer au concours!
if(localStorage.personnage_est_trouve == true && localStorage.objet_est_trouve == true && localStorage.lieu_est_trouve == true) {
    document.getElementById("concours").removeAttribute("hidden");
    document.getElementById("texte3").innerHTML = 'Bravo! Vous avez complété la chasse, vous pouvez maintenant participer au concours!';
    
   
}

// initialiser(); //Appel de la fonction d'initialisation pour afficher les éléments si une chasse est en cours
    

//à la partie 4 cette page de chasse va s'améliorer dans ses rétroactions de ce sera trouvé au nom en cours de chasse mais pour le moment, on peut juste aller voir dans le localStorage ce qui est enregistré! :)