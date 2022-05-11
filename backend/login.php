<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
session_start();
function loginUser($username, $password) {
    $sql = ("SELECT user_hashpass FROM users WHERE username = '$username'");
    $result = bdQuery($sql);
    if($hashpass = $result->fetch(PDO::FETCH_COLUMN)){
        //Añadir sesión aqui
        if (password_verify($password, $hashpass)){
            $_SESSION["username"] = $username;
            return '{"username" : "'.$username.'",
                    "isLoggedIn": true}';
        }
        else{
            return '{"isLoggedIn": false}';
        }
    }
    else {
        return '{"isLoggedIn": false}';
    };
};
if (isset($_POST["username"])){
    echo loginUser($_POST["username"], $_POST["password"]);
}
else {
    echo '{"isLoggedIn": false}';
}

