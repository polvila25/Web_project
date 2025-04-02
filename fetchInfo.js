//fetchInfo.js
//$(document).ready(function() {
//    $('.info_catg').on('click', function() {
//        const id_categoria = $(this).data(data-id_categoria);  // Obtenemos el ID de la categoría
//
//        fetch(`/controllador/getProdInfo.php?id_categoria=${encodeURIComponent(id_categoria)}`)
//            .then(response => response.json())  // Convertimos la respuesta a JSON
//            .then(data => {
//                console.log(data) // Procesamos y mostramos los datos recibidos (puedes mostrar los productos en el HTML)
//            })
//           .catch(error => {
//                console.error('Error:', error);  // Manejo de errores
//            });
//    });
//});


async function llistarCategoria(id_categoria) {
    try {
        const resposta = await fetch(`/controllador/product_categoria.php?id_categoria=${id_categoria}`);
        if (!resposta.ok) throw new Error('Error al obtener los productos');

        const resposta_txt = await resposta.text();
        document.getElementById('prod').innerHTML = resposta_txt;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('prod').innerHTML = "Hubo un error al cargar la categoria.";
    }
}

async function infoProducto(id_prod) {
    try {
        const resposta = await fetch(`/controllador/obtener_producto.php?id_prod=${id_prod}`);
        if (!resposta.ok) throw new Error('Error al obtener el producto');

        const resposta_txt = await resposta.text();
        document.getElementById('prod').innerHTML = resposta_txt;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('prod').innerHTML = "Hubo un error al cargar el producto.";
    }
}

async function buscadorProductos() {
    const buscador = document.getElementById('search-input').value.trim();
    if (buscador) {
        try {
            const data = await fetch(`/controllador/buscar_productos.php?nom_producte=${encodeURIComponent(buscador)}`);
            const html = await data.text();
            document.getElementById('prod').innerHTML = html;
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('prod').innerHTML = "Hubo un error al buscar el producto.";
        }
    } else {
        alert('Por favor, escribe algo para buscar.');
    }
}

function incrementQuantity() {
    const input = document.getElementById('quantitat_producte');
    const num_productes = parseInt(input.value) || 1; 
    if (num_productes < 99) input.value = num_productes + 1;
}

function decrementQuantity() {
    const input = document.getElementById('quantitat_producte');
    const num_productes = parseInt(input.value) || 1; 
    if (num_productes > 1) input.value = num_productes - 1; 
}


async function mostrar_carrito()
{
    try {
        const carrito = await fetch('controllador/carrito.php');
        if (!carrito.ok) throw new Error('Error al obtener el carrito');
        
        const data = await carrito.text();
        const modal = document.getElementById('prod');
        modal.innerHTML = data;
        modal.style.display = 'block'; 
    } catch (error) {
        console.error('Error:', error);
        // Puedes mostrar un mensaje de error en el modal si lo deseas
        const modal = document.getElementById('prod');
        modal.innerHTML = "Hubo un error al cargar el carrito.";
        modal.style.display = 'block';
    }
      

}

async function afegir_producte_carrito(productId) {

    const quantity = parseInt(document.getElementById('quantitat_producte').value, 10);

    if (isNaN(quantity) || quantity <= 0) {
        alert('Quantitat no vàlida!');
        return;
    }
    try {
        const respuesta = await fetch('/controllador/afegir_carrito.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${encodeURIComponent(productId)}&quantity=${encodeURIComponent(quantity)}`,
        });

        if (!respuesta.ok) throw new Error('Error al añadir el producto al carrito');

        const data = await respuesta.text();

        if (data.includes('success')) {
            alert('Producto añadido al carrito');
            // Actualizamos el número total de productos en el carrito
        } else {
            alert('Error al añadir el producto al carrito');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function incrementQuantityCarrito(productId) {
    const input = document.getElementById(`quantitat_producte_${productId}`);
    const num_productes = parseInt(input.value) || 1; 
    if (num_productes < 99) {
        input.value = num_productes + 1;
        updateProductTotal(productId, num_productes + 1);
    }
}

function decrementQuantityCarrito(productId) {
    const input = document.getElementById(`quantitat_producte_${productId}`);
    const num_productes = parseInt(input.value) || 1; 
    if (num_productes > 1) {
        input.value = num_productes - 1;
        updateProductTotal(productId, num_productes - 1);
    }
}

function updateProductTotal(productId, newQuantity) {
    const preu_element = document.querySelector(`#producto_precio_${productId}`);
    const preu_total = document.querySelector(`#producto_total_${productId}`);
    const preu = parseFloat(preu_element.dataset.precio);

    if (!isNaN(preu)) {
        const nuevoTotal = preu * newQuantity;
        preu_total.textContent = `Total: ${nuevoTotal.toFixed(2)} EUR`;
        updateCartTotal();
    }
}

async function deleteProduct(productId) {
    try {
        const response = await fetch('/controllador/eliminar_producto_carrito.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId })
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        // La petición fue exitosa, actualizar la interfaz
        alert('¡El producto se ha eliminado del carrito!');
        // Actualizar la visualización del carrito (si es necesario)
        // ...
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateCartTotal() {
    const totalElements = document.querySelectorAll('.producto-precio-total');
    let totalCarrito = 0;

    totalElements.forEach(element => {
        const total = parseFloat(element.textContent.replace('Total: ', '').replace('EUR', '').trim());
        if (!isNaN(total)) {
            totalCarrito += total;
        }
    });

    const carritoTotalElement = document.querySelector('.total-carrito');
    if (carritoTotalElement) {
        carritoTotalElement.textContent = `Total: ${totalCarrito.toFixed(2)} EUR`;
    }
}

async function vaciarCarrito() {
    try {
        const response = await fetch('/controllador/vaciar_carrito.php', {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Error al vaciar el carrito');
        }

        // La petición fue exitosa, actualizar la interfaz
        alert('¡El carrito se ha vaciado correctamente!. RECARGE LA PAGINA');
        // Actualizar la visualización del carrito (si es necesario)
        // ...
    } catch (error) {
        console.error('Error:', error);
    }
}

async function realizarPedido() {
    try {
        const response = await fetch('/controllador/fer_comanda.php');

        if (!response.ok) throw new Error('Error al realizar el pedido');

        // Obtener el contenido HTML devuelto por el servidor
        const html = await response.text();

        // Insertar el contenido en el modal o contenedor
        const modal = document.getElementById('prod');
        if (modal) {
            // Asignar el HTML
            modal.innerHTML = html;
            // ...
        } else {
            console.error('El elemento modal no existe');
        }
      
        modal.style.display = 'block'; 
    } catch (error) {
        console.error('Error:', error);

        // Mostrar un mensaje de error en el modal
        const modal = document.getElementById('prod');
        modal.innerHTML = `
            <div>
                <h1>Error</h1>
                <p>Hubo un problema al realizar el pedido. Por favor, inténtelo de nuevo.</p>
            </div>`;
        modal.style.display = 'block';
    }
}

function calcularTotales(carrito) {
    let preu_total = 0;
    let cantidad_total = 0;

    carrito.forEach(producto => {
        preu_total += producto.precio * producto.cantidad;
        cantidad_total += producto.cantidad;
    });

    return {
        preu_total: preu_total.toFixed(2),
        cantidad_total: cantidad_total
    };
}


async function cargarComandes() {
    try {
        const response = await fetch('/controllador/veure_comandes.php');
        if (!response.ok) throw new Error('Error al cargar las comandas.');

        const html = await response.text();

        const modal = document.getElementById('prod');
        modal.innerHTML = html;
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        const modal = document.getElementById('prod');
        modal.innerHTML = "<p>Hubo un error al cargar las comandas. Por favor, inténtelo de nuevo más tarde.</p>";
        modal.style.display = 'block';
    }
}





async function inici_sessio()
{
    try {
        const resposta = await fetch(`/controllador/obtener_producto.php?id_prod=${id_prod}`);
        if (!resposta.ok) throw new Error('Error al obtener el producto');

        const resposta_txt = await resposta.text();
        document.getElementById('prod').innerHTML = resposta_txt;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('prod').innerHTML = "Hubo un error al cargar el producto.";
    }

}