// Fonctions utilitaires

/**
 * Obtenir la valeur d'un des paramètres (QueryParam) dans l'URL
 * @param {string} strParam - Nom du paramètre à rechercher dans l'URL
 * @returns {string} - Valeur correspondant au paramètre.
 *                     Retourne null lorsqu'aucune valeur n'est trouvée.
 */

// Fonction pour lire le paramètre "id" dans l'URL
function obtenirValeurUrlParam(strParam) {
    return new URLSearchParams(window.location.search).get(strParam);
  }
  // Fonction pour générer le lien vers la galerie
  function genererLienGalerie() {
    const lienGalerie = document.getElementById("lien-galerie");
    const intIdFicheCourante = obtenirValeurUrlParam("id");
    console.log("id de la fiche courante: " + intIdFicheCourante);
  }
  
  // Appel à la fonction pour générer le lien
  genererLienGalerie();
  // Déclaration de l'objet
  const objFicheArtsVisuels = {
    // Méthode d'initialisation
    initialiser: function () {
      const intIdFicheCourante = obtenirValeurUrlParam("id");
      const fiche = objJSONepigraphes[intIdFicheCourante];
      const progressionChasse = document.getElementById("progressionChasse");
      progressionChasse.innerHTML = "(0 indice trouvé sur 3)";
  
      localStorage[intIdFicheCourante] = intIdFicheCourante;
      // localStorage.carte_est_visite = false;
  
      document.querySelector("title").innerHTML =
        fiche.PRENOM + " " + fiche.NOM + " - Chasse aux épigraphes";
      document.getElementById("prenom").innerHTML = fiche.PRENOM + " ";
      document.getElementById("nom").innerHTML = fiche.NOM;
      document.getElementById("url_image").src =
        "../assets/images/images-Galerie-et-fiche-personnages/307x405/" +intIdFicheCourante +".jpg";
      document.getElementById("biographie").innerHTML = fiche.BIOGRAPHIE;
      document.getElementById("transcript").innerHTML = fiche.PLAQUE_TRANSCRIPTION;

      document.getElementById("arrondissement").innerHTML = fiche.ARRONDISSEMENT;
      document.getElementById("carteZoom").src = "../assets/images/lieu/" + intIdFicheCourante + "-zoom-google-maps.png";      
      document.getElementById("quartier").innerHTML = fiche.QUARTIER;
      document.getElementById("adresse").innerHTML = fiche.ADRESSE;
      document.getElementById("audio_preambule").innerHTML = fiche.AUDIO.DESCRIPTION;
      document.getElementById("audio_transcription").innerText = fiche.AUDIO.TRANSCRIPTION;
      document.getElementById("audio_url").src = objJSONepigraphes[intIdFicheCourante].AUDIO.URL;
      document.getElementById("audio_credit").innerHTML = fiche.AUDIO.CREDIT;

      document.getElementById("titre_image").innerHTML = fiche.IMAGE.TITRE;
      document.getElementById("credit_image").innerHTML = fiche.IMAGE.CREDIT;
    
      
      document.getElementById("url_plaque").src =
        "../images/" +
        intIdFicheCourante +
        fiche.NOM +
        "_plaque.jpg".toLowerCase();
  
      if (localStorage.getItem("chasse_en_cours") === "false") {
        // Si la chasse n'est pas en cours, on affiche le bouton pour démarrer une nouvelle chasse
        document.getElementById("message").innerHTML =
          "Aucune chasse en cours. Si vous désirez débuter une chasse, visitez la page <a href='../chasse/index.html'> «Chasse».</a>";
      }
    },
  };
  
  function validerPieceConviction() {
    console.log("la fonction validerPieceConviction est appelée!");
    const refRadioCoche = document.querySelector('[name="formChasse"]:checked');
  
    const refMessage = document.getElementById("message"); //Ref du message pour donner notre rétroaction à l'utilisateur s'il a ou non la bonne réponse!
  
    const lsIdObjet = localStorage.getItem("id_objet"); //On va chercher le id_objet dans le localStorage pour faire la comparaison avec la réponse de l'utilisateur.
    const lsIdLieu = localStorage.getItem("id_lieu"); //On va chercher le id_lieu dans le localStorage pour faire la comparaison avec la réponse de l'utilisateur.
    const lsIdPersonnage = localStorage.getItem("id_personnage"); //On va chercher le id_personnage dans le localStorage pour faire la comparaison avec la réponse de l'utilisateur.
  
    const intIdFicheCourante = obtenirValeurUrlParam("id");
    const bonPersonnage = objJSONepigraphes[intIdFicheCourante].CHASSE.CATEGORIE;
    console.log(" x id de la fiche courante: " + bonPersonnage);
  
    if (!refRadioCoche) {
      refMessage.innerHTML =
        "Veuillez sélectionner une réponse avant de soumettre!";
      console.log("Aucune réponse sélectionnée!");
    } else if (
      intIdFicheCourante === lsIdPersonnage &&
      bonPersonnage === refRadioCoche.value
    ) {
      refMessage.innerHTML = "Bravo! Vous avez trouvé la bonne réponse!";
      localStorage.setItem("personnage_est_trouve", true);
    } else if (
      intIdFicheCourante === lsIdPersonnage &&
      bonPersonnage !== refRadioCoche.value
    ) {
      refMessage.innerHTML = "Désolé, ce n'est pas la bonne réponse!";
      localStorage.setItem("personnage_est_trouve", false);
    } else if (
      intIdFicheCourante === lsIdObjet &&
      bonPersonnage === refRadioCoche.value
    ) {
      refMessage.innerHTML = "Bravo! Vous avez trouvé la bonne réponse!";
      localStorage.setItem("objet_est_trouve", true);
    } else if (
      intIdFicheCourante === lsIdObjet &&
      bonPersonnage !== refRadioCoche.value
    ) {
      refMessage.innerHTML = "Désolé, ce n'est pas la bonne réponse!";
      localStorage.setItem("objet_est_trouve", false);
    } else if (
      intIdFicheCourante === lsIdLieu &&
      bonPersonnage === refRadioCoche.value
    ) {
      refMessage.innerHTML = "Bravo! Vous avez trouvé la bonne réponse!";
      localStorage.setItem("lieu_est_trouve", true);
    } else if (
      intIdFicheCourante === lsIdLieu &&
      bonPersonnage !== refRadioCoche.value
    ) {
      refMessage.innerHTML = "Désolé, ce n'est pas la bonne réponse!";
      localStorage.setItem("lieu_est_trouve", false);
    }
    //si le personnage, l'objet et le lieu ne sont pas trouvés
    else {
      refMessage.innerHTML = "Désolé, ce n'est pas la bonne réponse!";
      localStorage.setItem("personnage_est_trouve", false);
      localStorage.setItem("objet_est_trouve", false);
      localStorage.setItem("lieu_est_trouve", false);
    }
  
    /*Vérifications à faire:
          -Je veux comparer ma fiche actuelle en querystring avec la bonne réponse en localStorage
          -Voir la page 3 de l'énoncé pdf pour savoir les rétroactions à afficher selon les situations!
          - pour lire dans le localStorage : localStorage.getItem(id_personnage).*/
    console.log(localStorage.getItem("id_personnage"));
    console.log(localStorage.getItem("personnage_est_trouve"));
    console.log(lsIdPersonnage);
  }
  
  function calculerProgressionChasse() {
    // Récupérer les valeurs de localStorage
    const personnageEstTrouve =
      localStorage.getItem("personnage_est_trouve") === "true";
    const objetEstTrouve = localStorage.getItem("objet_est_trouve") === "true";
    const lieuEstTrouve = localStorage.getItem("lieu_est_trouve") === "true";
  
    // Compter le nombre d'indices trouvés
    let nombreIndicesTrouves = 0;
    if (personnageEstTrouve) nombreIndicesTrouves++;
    if (objetEstTrouve) nombreIndicesTrouves++;
    if (lieuEstTrouve) nombreIndicesTrouves++;
  
    // Mettre à jour l'affichage de la progression
    const progressionChasse = document.getElementById("progressionChasse");
    progressionChasse.innerHTML =
      "(" + nombreIndicesTrouves + " indice trouvé sur 3)";
    console.log(
      "Progression de la chasse: " +
        nombreIndicesTrouves +
        " indice(s) trouvé(s) sur 3."
    );
  
    // Vérifier si tous les indices ont été trouvés
    const refMessage = document.getElementById("message");
    if (nombreIndicesTrouves === 3) {
      refMessage.innerHTML =
        "Bravo! Vous avez terminé la chasse, vous pouvez maintenant participer au Concours!";
    }
  }
  
  // Appel à la méthode d'initialisation au chargement de la page
  window.addEventListener("DOMContentLoaded", objFicheArtsVisuels.initialiser);
  document
    .getElementById("btnSoumettre")
    .addEventListener("click", validerPieceConviction);
  document
    .getElementById("btnSoumettre")
    .addEventListener("click", calculerProgressionChasse);
  