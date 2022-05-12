<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
session_start();
/**
 * Endpoint de login, recibe los datos de usuario, comprueba si existe en la base de datos y si coincide la contraseña hasheada
 * y en caso afirmativo devuelve un objeto json con los datos necesarios para mantener la sesión iniciada.
 */
function deleteUser($username, $password) {
    $sql = ("SELECT user_hashpass FROM users WHERE username = '$username'");
    $result = bdQuery($sql);
    $output = [];
    if($hashpass = $result->fetch(PDO::FETCH_COLUMN)){
        if (password_verify($password, $hashpass)){
            $sql = ("DELETE FROM users where username = '$username'");
            $result = bdQuery($sql);
            if($delete = $result->execute()){
                $output["success"] = true;
                $output["isLoggedIn"] = false;
                session_destroy();
                //return $output;
            }
        }
        else{
            $output["success"] = false;
        }
    }
    else {
        $output["success"] = false;
    };
    return json_encode($output);
};
if (isset($_SESSION["username"]) && isset($_POST["password"])){
    echo deleteUser($_SESSION["username"], $_POST["password"]);
}
else {
    $output = [];
    $output["isLoggedIn"] = false;
    return json_encode($output);
}
