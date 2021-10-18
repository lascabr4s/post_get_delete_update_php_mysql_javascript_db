<?php

echo 'bonjour est la solution';
echo 1+2;
echo '1+2';
$toto = 5;
echo '<br>';
echo $toto;
echo $toto + $toto + 1;
echo '<br>';

// structure de controle-------------------------------------
$ok = false;
if($ok){
    echo $ok;
}else {
    echo $ok;
}
echo '<br>';

while($ok){

}

echo '<br>';

for($i=0;$i<=20;$i++){
    echo $i.'<br>';
}

for($i=0;$i<=100;$i++){
    // if($i%2 !=0){
    //     echo $i.' est impair <br>';
    // }

    if($i%2==0){
        continue;
    }else{
        echo $i.' est impair <br>';
    }
}
// structure de controle-------------------------------------


// tableaux--------------------------------------------------
$tab1 = array('luc', 'simon', 'henri');
echo $tab1[1];
$lg = count($tab1);
echo $lg;

echo '<br> le tableau contient '.$lg.' elements';

for($i=0;$i<$lg;$i++){
    echo $tab1[$i];
}

echo '<br>';

foreach($tab1 as $elt){
    echo $elt;
}
echo '<br>';

echo $tab1[0][1];
echo '<br>';
// tableaux--------------------------------------------------


// tableaux associatifs--------------------------------------
$tab2 = array('nom' => 'BRA', 'prenom' => 'Long', 'civilite' => 'Mr');
echo $tab2['nom'];
echo '<br>';


foreach($tab2 as $elt){
echo $elt;
}
echo '<br>';

foreach($tab2 as $cle => $elt){
    echo $cle . ' : ' . $elt . '<br>';
}



?>
