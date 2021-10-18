(function() {
    ////////////////////////////////////////////////
    getData(); //appelle le fichier --> affichage.php <--
    ////////////////////////////////////////////////
    function getData(myForm) {
        let fetchData = {
            method: "GET", //on recupere les données de la BDD via le FETCH
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch("./affichage.php", fetchData) //appelle --> affichage.php <--
            .then(res => res.json()) // recupere le JSON creer par --> affichage.php <--
            .then(response => success(response)) // appelle la 1-->fonction SUCCESS qui appelle 2--> la fonction AFFICHAGE
            .catch(error => failure(error))
    }
    ////////////////////////////////////////////////
    function success(response) {
        // console.log(response);
        for (const key in response) {
            if (Object.hasOwnProperty.call(response, key)) { // <-- Condition qui verifie la coherence et l'integrite (cle a bien sa propriete) du fichier JSON
                const element = response[key]; //prend la variable et integre la valeur de la cle
                affichage(element); // <-- on appelle la fonction AFFICHAGE
            }
        }
        let img = document.querySelectorAll('.visu');
        for (elt of img) {
            elt.addEventListener('click', affplus); // on pose un ecouteur sur chacune des img(l'oeil dans ce cas!!!) et on  appelle la fonction AFFPLUS
        }
        let trash = document.querySelectorAll('.delete');
        for (elt of trash) {
            elt.addEventListener('click', suppression); // on pose un ecouteur sur chacune des img(la croix dans ce cas!!!) et on  appelle la fonction SUPPRESSION
        }
        let edit = document.querySelectorAll('.edit');
        for (elt of edit) {
            elt.addEventListener('click', update); // on pose un ecouteur sur chacune des img(le crayon dans ce cas!!!) et on  appelle la fonction UPDATE
        }
    }
    ////////////////////////////////////////////////
    function affichage(elt) { // on integre dans le html le --> elt.id <-- (la cle primaire du tuple ou enregistrement ds BDD) -- afin de pouvoir poser un ecouteur!!!
        let html = '<tr><td>' + elt.nom + '</td><td>' + elt.prenom + '</td><td><img class="visu" id="id' + elt.id + '" style="margin-left:10px;height:30px;width:auto;cursor:pointer" src="./eye.png"/></td><td><img class="delete" id="dl' + elt.id + '" style="margin-left:10px;height:20px;width:auto;cursor:pointer" src="./close.png"/></td><td><img class="edit" id="ed' + elt.id + '" style="margin-left:10px;height:20px;width:auto;cursor:pointer" src="./edit.png"/></td></tr>';
        document.querySelector('#tbody').innerHTML += html;
    }
    /////////////////////////////////////////UPDATE/////////////////////////////////////////
    function update(event) {
        if (document.querySelector('#popupEdit') != null) { // on verifie si la popup existe deja, pour eviter l'accumulation de popup
            document.querySelector('#popupEdit').remove();
        }
        let popup = document.createElement('div'); //on cree un element html
        popup.setAttribute('id', 'popupEdit'); // on lui attribue un ID et une class
        popup.setAttribute('class', 'popupEdit');
        document.querySelector('#wrapper').appendChild(popup); // on insere la div dans le wrapper    
        let html = '<label for="nom">Nom : </label>';
        html += '<input type="text" name="nom" id="nom"></input>';
        html += '<label for="prenom">Prénom : </label>';
        html += '<input type="text" name="prenom" id="prenom"></input>';
        html += '<label for="adresse">Adresse : </label>';
        html += '<input type="text" name="adresse" id="adr"></input>';
        html += '<label for="telephone">Tel : </label>';
        html += '<input pattern="[0-9]" maxlength="10" type="tel" name="telephone" id="tel">';
        html += '<button id="btnValider" type="button" style="margin-top: 20px;background-color: blue;color: white;">VALIDER</button>';
        html += '<span id="response"></span>';
        document.querySelector('#popupEdit').innerHTML = html;
        updateForm(event.target.id);
    }
    ////////////////////////////////////////////////
    function updateForm(id_update) {
        let id = {};
        id.key = id_update.slice(2);
        let fetchData = {
            method: "POST",
            body: JSON.stringify(id), // on envoie QUE le cle primaire
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch("./getInfoUser.php", fetchData) // on appelle le --> updateUser.php <--
            .then(res => res.json()) // on recupere le fichier provenant de --> dataUser.php <--
            .then(response => updatePopup(response)) // on appelle la fonction UPDATEPOPUP avec en parametre(l'objet litteral)
            .catch(error => failure(error));

        document.querySelector('#btnValider').addEventListener('click', function() {
            updateValid(id); // on appelle la fonction pour envoyer les infos modifiees
        });
        ////////////////////////////////////////////////
        function updatePopup(response) { // on recupere l'obj en parametre reçu du php
            document.querySelector('#nom').value = response.nom;
            document.querySelector('#prenom').value = response.prenom;
            document.querySelector('#adr').value = response.adresse;
            document.querySelector('#tel').value = response.telephone; //on selectionne l'element html et on y insere l'element de l'obj correspondant
        }
        ////////////////////////////////////////////////
        function updateValid(id) {
            let data = {}; //on cree un obj litteral pour recup les infos modifiees dans les input du html
            data.cle = id;
            data.nom = document.querySelector('#nom').value;
            data.prenom = document.querySelector('#prenom').value;
            data.adresse = document.querySelector('#adr').value;
            data.telephone = document.querySelector('#tel').value;
            let fetchData = {
                method: "POST",
                body: JSON.stringify(data), // on envoie les donnees de DATA
                headers: {
                    "Content-Type": "application/json"
                }
            }
            fetch("./update.php", fetchData)
        }
    }

    ///////////////////////////////////////SUPPRESSION//////////////////////////////////////
    function suppression(event) {
        let id = {};
        id.key = event.target.id.slice(2); // le slice permet de recuperer de la cle primaire dans le JSON
        let fetchData = {
            method: "POST",
            body: JSON.stringify(id), // on envoie QUE le cle primaire
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch("./deleteUser.php", fetchData) // on appelle le --> deleteUser.php <--
        if (document.querySelector('#tbody').hasChildNodes()) {
            document.querySelector('#tbody').innerHTML = ''; // selectionne l'element de tbody dans le html et l'efface
        }
        let popup = document.querySelector('#popup'); // permet de verifier si la div POPUP existe ou pas
        if (popup != null) {
            let wrapper = document.querySelector('#wrapper'); // fonction LOCALE, besoin seulement pour cette condition
            wrapper.removeChild(popup); // si la div POPUP existe, elle est supprimée
        }


        getData(); // permet de ré afficher l'ensemble des elements restants avec la fonction
    }
    ////////////////////////////////////////////////
    function affplus(event) { // la fonction permet de recuperer la cle primaire pour envoie vers --> dataUser.php <--
        let id = {};
        id.key = event.target.id.slice(2); // le slice permet de recuperer de la cle primaire dans le JSON
        let fetchData = {
            method: "POST",
            body: JSON.stringify(id), // on envoie QUE le cle primaire
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch("./dataUser.php", fetchData) // on appelle le --> dataUser.php <--
            .then(res => res.json()) // on recupere le fichier provenant de --> dataUser.php <--
            .then(response => affPopup(response)) // on appelle la fonction AFFPOPUP avec en parametre(l'objet litteral)
            .catch(error => failure(error));
    }
    ////////////////////////////////////////////////
    // on créer le popup dans le html avec les infos recuperer dans la BDD
    function affPopup(response) {
        if (document.querySelector('#popup') != null) { // on verifie si la popup existe deja, pour eviter l'accumulation de popup
            document.querySelector('#popup').remove();
        }
        let popup = document.createElement('div'); //on cree un element html
        popup.setAttribute('id', 'popup'); // on lui attribue un ID et une class
        popup.setAttribute('class', 'popup');
        popup.innerHTML = response.adresse + '<br>' + response.telephone;
        document.querySelector('#wrapper').appendChild(popup); // on insere la div dans le wrapper
    }
    ////////////////////////////////////////////////
    function failure(error) {
        // console.log(error);
    }
})();