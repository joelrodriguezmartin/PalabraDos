<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: *');
/**
 * Endpoint que devuelve las palabras de la base de datos que tienen  un tamaño concreto recibido por parámetros.
 */
function getWordsByLength($length) {
    $sql = ("SELECT word_name FROM dictionary where word_length = $length");
    $result = bdQuery($sql);
    $wordArray = [];
    while ($word = $result->fetch(PDO::FETCH_COLUMN)) {
        array_push($wordArray, $word);
    }
    return json_encode($wordArray);
};
if (isset($_GET["length"])){
    echo getWordsByLength($_GET["length"]);
};

