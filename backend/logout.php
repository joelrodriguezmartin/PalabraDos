<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
/**
 * Endpoint que elimina la sesion de php, efectivamente cerrando la sesión del usuario
 */
session_start();
session_destroy();
$output = [];
$output["isLoggedIn"] = false;
echo json_encode($output);

