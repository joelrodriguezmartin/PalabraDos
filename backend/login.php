<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
session_start();
function loginUser($username, $password) {
    $sql = ("SELECT userid FROM users WHERE username = '$username' AND user_hashpass ='$password'");
    $result = bdQuery($sql);
    if($result->fetch(PDO::FETCH_COLUMN)){
        //Añadir sesión aqui
        $_SESSION["username"] = $username;
        return '{"username" : "'.$username.'",
                "isLoggedIn": true}';
    }
    else {
        return '{"isLoggedIn": false}';
    };
};
if (isset($_GET["username"])){
    echo loginUser($_GET["username"], $_GET["password"]);
}
else {
    echo '{"isLoggedIn": false}';
}

