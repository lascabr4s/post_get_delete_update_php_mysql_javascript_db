<?php

$content = file_get_contents("php://input");// on recupere le fichier JSON
$id = json_decode($content, false);// on le decode pour permettre la manip avec PHP

require('./connect.php');

try{
    // se connecter à la BDD
    $bdd = new PDO('mysql:host='.SERVER.';port='.PORT.';dbname='.BDD.';charset=utf8', USERNAME, PASSWORD);
    $sql = 'SELECT adresse,telephone FROM coursphp.identite WHERE id='.$id->key;//selectionne un enregistrement UNIQUE (parceque ID = CLE PRIMAIRE)!!!!
    $stmt = $bdd->query($sql);
    // var_dump('$stmp');
    // on utilise "fetch" parceque on va chercher UN SEUL enregistrement
    $arrAll = $stmt->fetch(PDO::FETCH_OBJ);
    $obj = json_encode($arrAll,JSON_FORCE_OBJECT);//on ré-encode l'enregistrement reçu de la BDD en JSON
    echo $obj;
    // var_dump($obj);
    } 
    catch(PDOException $e){
        var_dump($e->getMessage());
        exit();
    }



?>