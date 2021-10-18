(function() {

    // 1-- On selectionne le bouton d'envoi du formulaire
    let btnValider = document.querySelector('#btnValider');
    // 2-- On pose l'ecouteur sur le bouton
    btnValider.addEventListener('click', function() {
        let myForm = {}; //on creer objet litteral
        // 3-- On recup les donnees des elements selectionnees du formulaire
        myForm.nom = document.querySelector('#nom').value;
        myForm.prenom = document.querySelector('#prenom').value;
        myForm.adresse = document.querySelector('#adr').value;
        myForm.telephone = document.querySelector('#tel').value;
        sendData(myForm);
    })


    function sendData(myForm) { //fonction qui envoi au serveur les donnees du formulaire
        let fetchData = {
            method: "POST", //on envoie les données de la BDD via le FETCH
            body: JSON.stringify(myForm), //transforme l'objet litteral en objet JSON (chaine de charactere)
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch("./insertion.php", fetchData) //permet d'envoyer l'objet JSON au PHP (voir insertion.php)
            .then(res => res.json()) // 1--attend que tout le php soit executé et recupere le fichier JSON
            .then(response => success(response)) // 2--attend que 1 soit fini, et declenche la fonction SUCCESS (c'est le chainage 'THEN,...THEN,...,THEN...)
            .catch(error => failure(error)) // 3--Si BUG declenche la fonction FAILURE
    }

    function success(response) {
        console.log(response);
        document.querySelector("#response").textContent = response.msg; // envoie msg ($decoded->msg="c'est ok";) dans le HTML que tout est OK
    }

    function failure(error) {
        console.log(error);
    }

})();