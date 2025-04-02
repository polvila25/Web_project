<?php
session_start();
// Iniciar sesión y verificar usuario autenticado
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}


require_once '/MODEL/registro.php';
require_once '/MODEL/ConnectaBD.php';
$conn = ConnectaBD();
$userData = obtener_usuario($conn, $_SESSION['user_id']);
?>

<form action="/controlador/actualitzar_perfil.php" method="post" enctype="multipart/form-data">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" value="<?php echo htmlspecialchars($userData['nom_usuari']); ?>">

    <label for="email">Correo electrónico:</label>
    <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($userData['email_addres']); ?>">

    <label for="poblacio">Población:</label>
    <input type="text" id="poblacio" name="poblacio" value="<?php echo htmlspecialchars($userData['poblacio']); ?>">

    <label for="adreca">Dirección:</label>
    <input type="text" id="adreca" name="adreca" value="<?php echo htmlspecialchars($userData['adreca']); ?>">

    <label for="codi_postal">Código Postal:</label>
    <input type="text" id="codi_postal" name="codi_postal" value="<?php echo htmlspecialchars($userData['codi_postal']); ?>">

    <label for="profile_image">Foto de perfil:</label>
    <input type="file" id="profile_image" name="profile_image">

    <label for="password">Nueva Contraseña (opcional):</label>
    <input type="password" id="password" name="password" placeholder="Escribe una nueva contraseña">

    <button type="submit">Guardar cambios</button>
</form>