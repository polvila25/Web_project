<?php
session_start();
$accio = $_GET['accio'] ?? NULL;

$filesAbsolutePath = '/home/TDIW/tdiw-e8/public_html/uploadedFiles/';
$filesPublicPath = '/uploadedFiles/';



switch ($accio) {
    case 'llistar-categories':
        include __DIR__.'/controllador/llista_categorias.php';
        break;
    case 'llistar-productes':
        include __DIR__.'/controllador/llista_prod.php';
        break;
    case 'crear-cuenta':
        include __DIR__.'/controllador/crear_cuenta.php';
        break;
    default:
        include __DIR__.'/recurs_home.php';
        break;
}
?>

