<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
session_start();
/**
 * Endpoint de login, recibe los datos de usuario, comprueba si existe en la base de datos y si coincide la contraseña hasheada
 * y en caso afirmativo devuelve un objeto json con los datos necesarios para mantener la sesión iniciada.
 */
function loginUser($username, $password) {
    $sql = ("SELECT user_hashpass FROM users WHERE username = '$username'");
    $result = bdQuery($sql);
    $output = [];
    if($hashpass = $result->fetch(PDO::FETCH_COLUMN)){
        //Añadir sesión aqui
        if (password_verify($password, $hashpass)){
            $_SESSION["username"] = $username;
            $output["username"] = $username;
            $output["isLoggedIn"] = true;
            /*return '{"username" : "'.$username.'",
                    "isLoggedIn": true}';*/
        }
        else{
            $output["isLoggedIn"] = false;
        }
    }
    else {
        $output["isLoggedIn"] = false;
    };
    return json_encode($output);
};
if (isset($_POST["username"])){
    echo loginUser($_POST["username"], $_POST["password"]);
}
else {
    $output = [];
    $output["isLoggedIn"] = false;
    return json_encode($output);
}

