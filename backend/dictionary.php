<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: *');
/**
 * Función que devuelve las palabras de un tamaño recibido por parámetros
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

