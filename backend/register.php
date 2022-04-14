<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: *');
function registerUser($username, $password) {
    $sql = ("SELECT userid FROM users where username = '$username'");
    $result = bdQuery($sql);
    if($result->fetch(PDO::FETCH_COLUMN)){
        return '{"created": false, "exists": true}';//El usuario ya existe
    }
    else {
        $sql = ("INSERT INTO users VALUES (NULL, '$username', '$password')");
        $result = bdQuery($sql); //Retorna falso si falla;
        if($result){
            return '{"created": true, "exists": true}';//El usuario se ha creado
        }else{
            return '{"created": false, "exists": false}';//Fallo en creacion
        }
    };
};
if (isset($_GET["username"])){
    echo registerUser($_GET["username"], $_GET["password"]);
};

