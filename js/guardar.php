<!DOCTYPE html>
<?php
session_start();
?>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Guardar</title>
</head>
<body>
    <?php
        function guardar($archivo, $cont){
            fwrite($archivo, $cont);
            fclose($archivo);
        }
        if (isset($_POST['shops'])) {
            $_SESSION['shops']=$_POST['shops'];
        }
        if (isset($_POST['categories'])) {
            $_SESSION['categories']=$_POST['categories'];
        }
        if (isset($_POST['user'])) {
            $_SESSION['user']=$_POST['user'];
        }
        if (isset($_SESSION['shops'])) {
            $archivo=fopen("../archivos/".$_SESSION['user']."_shops.json", "w");
            guardar($archivo, $_SESSION['shops']);
        }
        if (isset($_SESSION['categories'])) {
            $archivo=fopen("../archivos/".$_SESSION['user']."_categories.json", "w");
            guardar($archivo, $_SESSION['categories']);
        }
        
    ?>
</body>
</html>