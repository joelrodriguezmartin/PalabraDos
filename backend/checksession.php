<?php
/**
 * Endpoint que comprueba si existen datos de sesión para mantener la sesión de usuario iniciada.
 */
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
session_start();

$output = [];
if (isset($_SESSION["username"])){
    $output["username"] = $_SESSION["username"];
    $output["isLoggedIn"] = true;
    echo json_encode($output);
    /*echo '{"username" : "'.$_SESSION["username"].'",
        "isLoggedIn": true}';*/
}
else {
    $output["isLoggedIn"] = false;
    echo json_encode($output);
}
