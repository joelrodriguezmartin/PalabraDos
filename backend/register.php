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
        $hashpass = password_hash($password, PASSWORD_DEFAULT);
        $sql = ("INSERT INTO users VALUES (NULL, '$username', '$hashpass')");
        $result = bdQuery($sql); //Retorna falso si falla;
        if($result){
            $sql2 = ("SELECT userid FROM users where username = '$username'");
            $result = bdQuery($sql2);//Seleccionamos el id que acabamos de crear
            if($userid = $result->fetch(PDO::FETCH_COLUMN)){
                $sql3 = ("INSERT INTO scores VALUES (NULL, '$userid', 0)");
                $result = bdQuery($sql3);//Y lo insertamos en la tabla de puntuaciones con puntuacion 0
            };
            return '{"created": true, "exists": true}';//El usuario se ha creado
        }else{
            return '{"created": false, "exists": false}';//Fallo en creacion
        }
    };
};
if (isset($_POST["username"])){
    echo registerUser($_POST["username"], $_POST["password"]);
};

