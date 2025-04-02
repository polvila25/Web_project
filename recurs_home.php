<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pràctiques TDIW</title>

    <script src="fetchInfo.js"></script> 
    
    <link rel="stylesheet" type="text/css" href="/VISTA/style.css" title="main">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://fonts.google.com/share?selection.family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900|Roboto+Condensed:ital,wght@0,100..900;1,100..900">

</head>
<body>
    <header>
        <div id='container_header'>
            <div id='logo_barça'>
                    <a id="logo-header" href="https://tdiw-e8.deic-docencia.uab.cat">
                        <img src="/img/Logo_FC_Barcelona.svg.png" alt="Logo de la empresa" width="50">
                    </a>
            </div>
            <div id='items'>
                <div class="search-box">
                    <input type="text" class="input-search" id="search-input" placeholder="Buscar...">
                    <button class="btn-search" onclick="buscadorProductos()">
                        <img src="/img/boton_busqueda.png" alt="Buscar">
                                                
                    </button>
                

                </div>
            
                <div id='inicio_session'>
                    <img src="/img/fondo_iniciosession.png" alt="Inicio Sesión" class='icono_session'>
                    <ul class="session" id='incio_user'>
        
                        <?php if (isset($_SESSION['user_id'])): ?>
                            <li><a href="/controllador/actualitzar_perfil.php">Editar perfil</a></li>
                            <li><a href="#" onclick="cargarComandes()">Comandes</a></li>
                            <li><a href="tancar_sessio.php">Tancar Sessió</a></li>
                        <?php else: ?>
                            <li><a href="Formulario_registro.html">Log in</a></li>
                            <li><a href="Crear_cuenta.html">Crear Cuenta</a></li>
                        <?php endif; ?>
                    </ul>
                </div>
                <div id='carrito-compra'>
                    <button class="carrito_compra" onclick="mostrar_carrito()">
                        <img src="/img/carrito_compra.png" alt="Carrito_compra">
                                                
                    </button>
                </div>
                
            </div>
            
        </div>
    </header>

    <div id="menu_principal">
               
        <ul class="menu">                      
             
            <?php require __DIR__.'/controllador/lista_categorias.php'; ?>
                  
        </ul>
        
    </div>
  
    <div id='prod'>

        <ul>
            <?php require __DIR__.'/controllador/categories_menu.php'; ?>

        </ul>
        


    </div>
      

    
    <footer>
      <div class="resumen-compra">
        <?php require __DIR__.'/controllador/carret_visible.php'; ?>
      </div>
    </footer>  
</body>
</html>
