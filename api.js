const modelSelect = document.querySelector("#family-word"); /* Sélectionne
l'élément <select> par son ID */
const optionValue = modelSelect.value; /* Obtient la valeur de l'option
sélectionnée. Accède directement à la valeur de l'option sélectionnée,
pas besoin d'utiliser '.option'. La valeur par défaut de ce formulaire est inexistante*/

modelSelect.addEventListener("change", (event) => {
  optionValue = modelSelect.value; //Met à jour la valeur sélectionnée
}); /*un écouteur d'événement est posé sur modeSelect
il possède le type "change" pour écouter le changement*/
// /!\ manque de compréhension de la possible parenthèse vide
//ce addEventListener pourrait également être construit avec des parenthèses vides, tel que:
/*modelSelect.addEventListener("change", (event) => {
  optionValue = modelSelect.value; //Met à jour la valeur sélectionnée
}*/

function rechercher(event) {
  /*rechercher est l'objet recevant l'événement.
    Quand un événement est détecté, le code entre {} s'exécute*/

  event.preventDefault(); /*empêche l'action normale de l'événement. 
    Il serait ici de recharger la page liée au submit du formulaire*/

  let form = event.currentTarget; /*identifie la cible courante pour l'événement
    lorsque celui-ci travers le DOM. Il permet de récupérer le formulaire
    complet qui déclenche l'événement*/

  //-------- DEBUT FETCH --------

  fetch(
    /*méthode globale, récupère une ressource et prend deux arguments.
        Commence le processus de recherche d'une ressource du réseau,
        en renvoyant une "promise" (promesse) qui est remplie une fois
        la "response" (réponse) disponible */
    form.action /*premier argument de fetch, récupère le contenu de l'action,
        soit, ici, l'url donné de l'api */,
    {
      /*2ème argument de fetch*/
      headers: {
        /*/!\ (pas compris ce qu'est le "headers" ni sa fonction) */
        Accept: "application/ld+json" /*permet de filtrer le type de
                code qui a le droit d'être renvoyé*/,
        /*Accept: paramètre d'en-tête de requête HTTP qui indique
                quels sont les types de contenu que le client sera capable
                d'interpréter*/
        /*application/: fait référence au type de média qu'est une
                application*/
        /*ld+json: les types de langages acceptés.
                JavaScript Object Notation for Linked Data
                format d'implémentation des Données Structurées 
                /!\ (pas compris réellement ce que ça signifie)*/
      },
    }
  )
    //-------- FIN FETCH --------
    //-------- DEBUT THEN --------

    //---- RECUPERE DONNEES API ----
    .then((response) => {
      /*then, étape de la spécification,
    ce qui doit être fait avec la réponse de la requête HTTP retournée par fetch().
    Sert à gérer les données reçues et je continue à travailler avec elles dans
    l'application JavaScript */
      return response.json(); /*permet de récupérer la réponse de l'api en format ld+json*/
    })

    //---- UTILISE DONNEES API ----
    .then((data) => {
      document.querySelector("#listeMots").innerHTML = "";
      /*utilise la classe ou un autre élément d'identification pour sélectionner
  l'endroit dans le DOM (/!\"DOM", est-ce le bon terme ?)
    innerHTML récupère ou définit la syntaxe HTML décrivant les descendants
    de l'élément sélectionné à l'aide de querySelector dans le document*/
      data["hydra:member"]
        /*l'utilisation de 'data["hydra:member"]' permet d'accéder à l'ensemble
      des objets contenus dans la propriété hydra de l'objet 'data'.
      Chaque élément de 'data["hydra:member"]' représente un objet individuel
      avec ses propres clefs et valeurs spécifiques*/
        .filter(
          (element) => element.family === optionValue
        ) /*'filter' filtre les
        éléments selon une condition (ici, 'element.family === optionValue').
        'optionValue' représente la valeur de l'option dans le menu déroulant.*/
        .forEach((element) => {
          //'forEach' itère sur les éléments filtrés et exécute le code pour chaque élément.
          document.querySelector("#listeMots")
            .innerHTML`contenu HTML en modèle littéral`;
        });
    });
}

document
  .querySelector("#form") /*doit renvoyer à l'id qui identifie le formulaire*/
  .addEventListener("submit", rechercher, true);
/*"submit": le type. chaîne sensible à la casse représentant le type
d'événement à écouter
rechercher: listener.objet qui recevra l'événement.
rechercher est le nom de la fonction nommée et développée plus haut.
true: option passive. booléen, qui si true, indique que la fonction spécifiée par
listener (ici "rechercher", le nom de la fonction qui recevra l'événement)
n'appellera jamais preventDefault() (qui empêche le formulaire de soumettre de
manière traditionnelle, ce qui évite ici le rechargement de la page).
Si un listener passif appelle preventDefault(), l'agent utilisateur (navigateur)
ne fera rien d'autre que de générer un avertissement dans la console.
Cela permet à JavaScript de prendre le contrôle sur ce qui se passe lorsque
le formulaire est soumis, par exemple en effectuant une requête AJAX à une API
pour récupérer des données sans recharger la page*/
