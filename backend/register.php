<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: *');
function registerUser($username, $password) {
    $output = [];
    $sql = ("SELECT userid FROM users where username = '$username'");
    $result = bdQuery($sql);
    if($result->fetch(PDO::FETCH_COLUMN)){
        //El usuario ya existe
        $output["created"] = false;
        $output["exists"] = true;
    }
    else {
        if (preg_match('/^[a-zA-Z0-9]+/', $username) && preg_match('/^[a-zA-Z0-9]+/', $password)){
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
                //El usuario se ha creado satisfactoriamente
                $output["created"] = true;
                $output["exists"] = true;
            }else{
                //Fallo en creación
                $output["created"] = false;
                $output["exists"] = false;
            }
        }
    };
    return json_encode($output);
};
if (isset($_POST["username"])){
    echo registerUser($_POST["username"], $_POST["password"]);
};

