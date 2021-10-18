<?php 

// |||||||||||||||||||||||||||||RECUPERATION DES DONNEES DU JavaScript||||||||||||||||||||||||||||

// --------------------------
// methode en php pour recuperer l'objet JSON du javascript
$content = file_get_contents("php://input");
        // trim(file_get_contents("php://input")) --> POUR EVITER LES ESPACES
// --------------------------

// --------------------------
// methode qui decode le fichier JSON en OBJET manipulable par le PHP (A PREVILEGIE!!!!)
$decoded = json_decode($content, false);
// methode qui decode le fichier JSON en TABLEAU ASSOCIATIF manipulable par le PHP (A EVITER!!!!)
$decoded2 = json_decode($content, true);
// --------------------------

// --------------------------
// creer une nvlle propriete dans l'objet reçu avec "LA FLECHE"
$decoded->msg="c'est ok";
// creer une nvlle propriete dans TAB ASSOCIATIF reçu avec "LA CROCHE"
$decoded2['msg'] = 'bonjour';
// --------------------------

// ||||||||||||||||||||||||||||||||||||||||LA BASE DE DONNEE|||||||||||||||||||||||||||||||||||||

// --------------------------
// Parametres qui lie le PHP qui définit en DUR les elements pour la connection à la BDD (EVITE DE SE REPETER)
require('./connect.php');

// le TRY, CATCH permet d'eviter des bugs de connexions (si bug -> CATCH et on analyse et on fait un EXIT)
try{
// se connecter à la BDD avec un connecteur
$bdd = new PDO('mysql:host='.SERVER.';port='.PORT.';dbname='.BDD.';charset=utf8', USERNAME, PASSWORD);
} catch(PDOException $e){
    var_dump($e->getMessage());
    exit();
}

// ---------------------------

// Requete pour inserer des données
// façon moderne
$sql = 'INSERT INTO coursphp.identite(nom,prenom,adresse,telephone) VALUES (:nom,:prenom,:adresse,:telephone)';//<-- ce sont des marqueurs EN :
// $sql = 'INSERT INTO coursphp.identite(nom,prenom,adresse,telephone) VALUES (?,?,?,?)';//<-- ce sont des marqueurs EN ?
$request = $bdd->prepare($sql);//prepare la liaison(bind) entre les marqueurs et les données
$request->bindValue(':nom',$decoded->nom);
$request->bindValue(':prenom',$decoded->prenom);//bindValue -> lier les données
$request->bindValue(':adresse',$decoded->adresse);
$request->bindValue(':telephone',$decoded->telephone);
$request->execute();//finalise le package des données des bindValue et envoi le package des données vers la BDD
// ----
// vieille facon avec concatenation
// $sql = 'INSERT INTO coursphp.identite(nom,prenom) VALUES ("'.$decoded->nom.'", "'.$decoded->prenom.'")';
// $bdd->exec($sql);
// ----
$bdd = null;//fermeture de la connexion avec la BDD

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// permet de re-encoder avec la nouvelle propriete de la ligne 20 ($decoded->msg="c'est ok";)
$reply = json_encode($decoded);
echo $reply;

?>