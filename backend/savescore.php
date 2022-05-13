<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
session_start();
/**
 * Endpoint que recibe una puntuación y la guarda en la tabla del usuario con la sesión iniciada
 */
function saveScore($user, $score) {
    $sql = ("SELECT userid FROM users WHERE username = '$user'");
    $result = bdQuery($sql);//Obtenemos el id de usuario
    if($userid = $result->fetch(PDO::FETCH_COLUMN)){
        $id = intval($userid);
        $sql2 = ("SELECT score FROM scores WHERE userid = $id");
        $result2 = bdQuery($sql2);
        $bdScore = $result2->fetch(PDO::FETCH_COLUMN);
        $newScore = intval($bdScore) + intval($score);
        $sql3 = ("UPDATE scores SET score = $newScore where userid = $id");
        $result3 = bdQuery($sql3);
        $savedScore = $result2->fetch(PDO::FETCH_COLUMN);
        $output = [];
        $output["todoCorrecto"] = true;
        echo json_encode($output);
    };
};
if (isset($_SESSION["username"])){
    if ($_GET["score"]){
        echo saveScore($_SESSION["username"], $_GET["score"]);
    }
}
else {
    $output = [];
    $output["isLoggedIn"] = false;
    echo json_encode($output);
}

