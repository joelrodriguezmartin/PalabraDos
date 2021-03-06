<?php
/**
 * Función que realiza una petición recibida por parámetros a la base de datos
 */
function bdQuery(string $sql) {
    [$host, $usuario, $password, $bd] = ['localhost', 'palabrados', 'palabrados', 'palabrados'];
    try {
        $conexion = new PDO("mysql:host=$host;dbname=$bd;charset=utf8", $usuario, $password);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $resultado = $conexion->query($sql);
    } catch (PDOException $exception) {
        exit($exception);
    }
    return $resultado;
}
/**
 * Función que carga a la base de datos las palabras del diccionario desde un fichero txt
 */
function loadDictionary(){
    $baseFileName = "../dics/size";
    $extension = ".txt";
    for ($i=4; $i <= 6; $i++) { 
        $filename = $baseFileName.$i.$extension;
        $handle = fopen($filename, "r");
        if ($handle) {
            while(($line = fgets($handle)) !== false){
                $line = str_replace("\n","",$line);
                $sql = "INSERT INTO dictionary VALUES 
                (NULL, '$line', '', $i);";
                bdQuery($sql);
                echo date("h:i:s") . "\n";
            }
            fclose($handle);
        }else {
            echo("Fallo cargando el diccionario");
        }
    }
}
?>
