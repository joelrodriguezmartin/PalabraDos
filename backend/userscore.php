<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
session_start();
function getUserScore($user) {
    $sql = ("select score from 
    scores inner join 
    users on 
    scores.userid = users.userid 
    where users.username = '$user'
    ");
    $result = bdQuery($sql);
    $column = $result->fetch(PDO::FETCH_COLUMN);
    return $column;
    
};
if (isset($_SESSION["username"])){
        echo getUserScore($_SESSION["username"]);
}



