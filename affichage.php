<?php
require('./connect.php');// Parametres qui lie le PHP qui définit en DUR les elements pour la connection à la BDD (EVITE DE SE REPETER)

try{
    // se connecter à la BDD
    $bdd = new PDO('mysql:host='.SERVER.';port='.PORT.';dbname='.BDD.';charset=utf8', USERNAME, PASSWORD);
    $sql = 'SELECT * FROM coursphp.identite';
    $stmt = $bdd->query($sql); // envoi de la requete SELECT à la BDD
    // var_dump($stmt);
    // var_dump(gettype($stmt));
    $arrAll = $stmt->fetchAll(PDO::FETCH_OBJ);//fetchAll, permet de recuperer tous les enregistrements(TUPLES)
    $obj = json_encode($arrAll,JSON_FORCE_OBJECT);//on ré-encode tous les enregistrements(données) en JSON
    echo $obj;

    // var_dump($obj);
    } 
    catch(PDOException $e){
        var_dump($e->getMessage());
        exit();
    }







?>