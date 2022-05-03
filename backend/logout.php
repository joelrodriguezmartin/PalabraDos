<?php
include_once("BDFunctions.php");
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
session_start();
session_destroy();
echo '{"isLoggedIn": false}';

