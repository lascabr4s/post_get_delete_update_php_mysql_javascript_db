<?php
$content = file_get_contents("php://input");
$decoded = json_decode($content, false);
var_dump($decoded);
// $decoded->msg="c'est ok";


require('./connect.php');

    try{
    // se connecter à la BDD avec un connecteur
    $bdd = new PDO('mysql:host='.SERVER.';port='.PORT.';dbname='.BDD.';charset=utf8', USERNAME, PASSWORD);
    } catch(PDOException $e){
        var_dump($e->getMessage());
        exit();
    }
    $sql = 'UPDATE coursphp.identite SET nom=:nom, prenom=:prenom, adresse=:adresse, telephone=:telephone WHERE id=:cle';//<-- ce sont des marqueurs EN :
    $request = $bdd->prepare($sql);//prepare la liaison(bind) entre les marqueurs et les données
    $request->bindValue(':id',$decoded->cle);
    $request->bindValue(':nom',$decoded->nom);
    $request->bindValue(':prenom',$decoded->prenom);//bindValue -> lier les données
    $request->bindValue(':adresse',$decoded->adresse);
    $request->bindValue(':telephone',$decoded->telephone);
    $request->execute();//finalise le package des données des bindValue et envoi le package des données vers la BDD
    $bdd = null;//fermeture de la connexion avec la BDD

?>
