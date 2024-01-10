import Swal from "sweetalert2";

export function app() {
    console.log("La aplicación se está ejecutando...");
}

const productos = [
    {
        imagen: "./img/barcelona-2015.png",
        titulo: "Barcelona 2015",
        descripcion: "<br><b>Lionel Messi</b></br> Una de las mejores camisetas vendidas por la empresa.",
        precio: 9.99
    },
    {
        imagen: "./img/manchester-city-2024.png",
        titulo: "Manchester City 2024",
        descripcion: "<br><b>Erling Haaland</b></br> el futuro ganador del Balón de Oro 2024",
        precio: 9.99
    },
    {
        imagen: "./img/real-madrid-2018.png",
        titulo: "Real Madrid 2018",
        descripcion: "<br><b>Cristiano Ronaldo</b></br> uno de los mejores de la historia",
        precio: 9.99,
    },
    {
        imagen:"./img/manchester-united-2010.png",
        titulo: "Manchester United 2010",
        descripcion: "<br><b>Wayne Rooney</b></br> uno de los referentes del United de esa época",
        precio: 9.99,
    },
    {
        imagen:"./img/chelsea-2024.png",
        titulo:"Chelsea 2024",
        descripcion:"<br><b>Enzo Fernandez</b></br> El mejor jugador joven del Mundial 2022",
        precio:9.99,
    },
    {
        imagen:"./img/liverpool-2024.png",
        titulo:"Liverpool 2024",
        descripcion:"<br><b>Alexis Mac-Alister</b></br> uno de los mejores centrales del Liverpool",
        precio:9.99,
    },
    {
        imagen:"./img/inter-miami-2024.png",
        titulo:"Inter de Miami 2024",
        descripcion:"<br><b>Lionel Messi</b></br>El mejor jugador de toda la historia en la MLS",
        precio:9.99,
    },
    {
        imagen:"./img/psg-2024.png",
        titulo:"Paris Saint Germain 2024",
        descripcion:"<br><b>Kyliam Mbappe</b></br> jugador fiel al psg en este último tiempo",
        precio:9.99,
    },
];

let carrito = [];

function generarCard(producto, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '20rem';

    card.innerHTML = `
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
        <div class="card-body">
            <h5 class="card-title fw-bold">${producto.titulo}</h5>
            <p class="card-text">${producto.descripcion}</p>

            <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="btn-group">
                    <button class="btn btn-outline-secondary btnRestar">-</button>
                    <span class="btn btn-outline-secondary contador">1</span>
                    <button class="btn btn-outline-secondary btnSumar">+</button>
                </div>
                <button type="button" class="btn btn-success btnAgregarCarrito" data-index="${index}">
                    <i class="bi bi-cart"></i> Agregar al carrito
                </button>
            </div>

            <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted fw-bold" id="precio-${producto.titulo}">Precio: $${producto.precio.toFixed(2)}</span>
                <button type="button" class="btn btn-primary btnComprar">
                    Comprar
                </button>
            </div>
        </div>
    `;

    return card;
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    listaCarrito.innerHTML = ''; // Limpiar el carrito antes de actualizar

    let total = 0;

    carrito.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.cantidad} x ${item.producto.titulo} - $${(item.cantidad * item.producto.precio).toFixed(2)}`;

        const buttonEliminar = document.createElement('button');
        buttonEliminar.innerText = 'Eliminar';
        buttonEliminar.className = 'btn btn-danger btnEliminar';
        buttonEliminar.addEventListener('click', () => eliminarProductoDelCarrito(index));

        

        listItem.appendChild(buttonEliminar);
        listaCarrito.appendChild(listItem);

        total += item.cantidad * item.producto.precio;
    });

    totalCarrito.innerText = total.toFixed(2); // Actualizamos el total del carrito 
    
}


function eliminarProductoDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarritoYLocalStorage();
}

// Función para actualizar el carrito y almacenar en localStorage
function actualizarCarritoYLocalStorage() {
    actualizarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.addEventListener("DOMContentLoaded", () => {
    const contenedorCards = document.getElementById('contenedor-cards');

    productos.forEach((producto, index) => {
        const card = generarCard(producto, index);
        contenedorCards.appendChild(card);
    });

    // Cargar datos del localStorage al cargar la página
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let btnSumar = document.querySelectorAll(".btnSumar");
    let btnRestar = document.querySelectorAll(".btnRestar");
    let contadores = document.querySelectorAll(".contador");
    let btnAgregarCarrito = document.querySelectorAll(".btnAgregarCarrito");
    let btnComprar = document.querySelectorAll(".btnComprar");

    let stock = 9;

    btnSumar.forEach((btn, index) => {
        btn.onclick = () => {
            let numeroContador = parseInt(contadores[index].innerText);
            if (numeroContador < stock) {
                numeroContador++;
                contadores[index].innerText = numeroContador;
                actualizarPrecio(productos[index], numeroContador, index);
            }
        };
    });

    btnRestar.forEach((btn, index) => {
        btn.onclick = () => {
            let numeroContador = parseInt(contadores[index].innerText);
            if (numeroContador > 1) {
                numeroContador--;
                contadores[index].innerText = numeroContador;
                actualizarPrecio(productos[index], numeroContador, index);
            }
        };
    });

    btnAgregarCarrito.forEach((btn, index) => {
        btn.onclick = () => {
            const cantidad = parseInt(contadores[index].innerText);
            const producto = productos[index];
            const itemExistente = carrito.find(item => item.producto.titulo === producto.titulo);

            if (itemExistente) {
                itemExistente.cantidad += cantidad;
            } else {
                carrito.push({ producto, cantidad });
            }



            actualizarCarritoYLocalStorage(); // Actualizar y almacenar en localStorage
        };
    });

    btnComprar.forEach((btn, index) => {
        btn.onclick = () => {
            const producto = productos[index];
            const cantidad = parseInt(contadores[index].innerText);
    
            Swal.fire({
                title: `¿Seguro que quieres comprar ${cantidad} ${producto.titulo}?`,
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: "green",
                cancelButtonColor: "maroon",
                icon: 'question',
                timer: 7000,
                timerProgressBar: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Gracias por la compra',
                        text: 'Espero que lo disfrute, en menos de 1 semana, estará en tu casa',
                        icon: 'success',
                        confirmButtonText: "Salir",
                        confirmButtonColor: "green"
                    }).then(() => {
                        carrito = []; // Limpiar el carrito después de la compra
                        actualizarCarritoYLocalStorage(); // Actualizar y almacenar en localStorage
                    });
                } else {
                    Swal.fire ({
                        title: "Compra Rechazada",
                        confirmButtonColor: "maroon",
                        confirmButtonText: "No hay plata",
                        imageUrl: "./img/no-hay-plata.png",
                        timer: 5000,
                        timerProgressBar: true,
                    });
                };
            })
        };
    });

    function actualizarPrecio(producto, cantidad, index) {
        const precioTotal = (cantidad * producto.precio).toFixed(2);
        document.getElementById(`precio-${producto.titulo}`).innerText = `Precio: $${precioTotal}`;
    }
});

