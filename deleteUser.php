<?php

$content = file_get_contents("php://input");// on recupere le fichier JSON
$id = json_decode($content, false);// on le decode pour permettre la manip avec PHP

require('./connect.php');

try{
    // se connecter à la BDD
    $bdd = new PDO('mysql:host='.SERVER.';port='.PORT.';dbname='.BDD.';charset=utf8', USERNAME, PASSWORD);
    $sql = 'DELETE FROM coursphp.identite WHERE id='.$id->key;//selectionne un enregistrement UNIQUE (parceque ID = CLE PRIMAIRE)!!!!
    $request = $bdd->prepare($sql);//prepare la liaison(bind) entre les marqueurs et les données
    $request->execute();//finalise le package des données des bindValue et envoi le package des données vers la BDD
    $bdd = null;//fermeture de la connexion avec la BDD
    } 
    catch(PDOException $e){
        var_dump($e->getMessage());
        exit();
    }



?>