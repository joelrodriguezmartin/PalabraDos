<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
session_start();

if (isset($_SESSION["username"])){
    echo '{"username" : "'.$_SESSION["username"].'",
        "isLoggedIn": true}';
}
else {
    echo '{"isLoggedIn": false}';
}
