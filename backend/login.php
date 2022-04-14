<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: *');
function loginUser($username, $password) {
    $sql = ("SELECT userid FROM users WHERE username = '$username' AND user_hashpass ='$password'");
    $result = bdQuery($sql);
    if($result->fetch(PDO::FETCH_COLUMN)){
        //Añadir sesión aqui
        return '{isLoggedIn: true}';
    }
    else {
        return '{isLoggedIn: false}';
    };
};
if (isset($_GET["username"])){
    echo loginUser($_GET["username"], $_GET["password"]);
};

