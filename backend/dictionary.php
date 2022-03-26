<?php
include_once("BDFunctions.php");
function getWordsByLength($length) {
    $sql = ("SELECT word_name FROM dictionary where word_length = $length");
    $result = bdQuery($sql);
    $wordArray = [];
    while ($word = $result->fetch(PDO::FETCH_COLUMN)) {
        array_push($wordArray, $word);
    }
    return $wordArray;
}
