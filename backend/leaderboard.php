<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: *');
function getLeaderBoardData() {
    $sql = ("select username, score 
            from users inner join scores on 
            users.userid = scores.userid 
            order by score desc 
            limit 10;");
    $dataArray = [];
    $result = bdQuery($sql);
    while ($column = $result->fetch(PDO::FETCH_ASSOC)) {
            array_push($dataArray, $column);
    }
    return json_encode($dataArray);
    
};
echo getLeaderboardData();


