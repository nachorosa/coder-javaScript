const fragmentProduct = document.createDocumentFragment();
const templateContainerProducts = document.getElementById("template-containerProducts").content;
const productsContainer = document.getElementById('fetch_productos'); 


 
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
    try {
            const res = await fetch(`productos.json`);
            const data = await res.json();
            products = data; 
            loadContainerProducts(products);
    } catch (error) {
            console.log(error)
    }
}

const loadContainerProducts = (data) => {
    productsContainer.innerHTML = '';
    data.forEach(product => {
            templateContainerProducts.querySelectorAll('img')[0].setAttribute('src', `${product.img}`);
            templateContainerProducts.querySelector('h2').textContent = `${product.title}`;
            templateContainerProducts.querySelector('p').textContent = `$${product.price}`;
            templateContainerProducts.querySelector('.agregar_al_carrito').dataset.producto = product.title;
            templateContainerProducts.querySelector('.agregar_al_carrito').dataset.precio = product.price;
            templateContainerProducts.querySelector('.agregar_al_carrito').dataset.img = product.img; 

            const clone = templateContainerProducts.cloneNode(true);
            fragmentProduct.appendChild(clone);
    });
    productsContainer.appendChild(fragmentProduct);
}



productsContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains('agregar_al_carrito')) {

        Toastify({
            text: "Agregaste un producto al carrito",
            duration: 1200,
            position: 'right'
        }).showToast()

    let producto = e.target.dataset.producto

     let = precio = parseInt(e.target.dataset.precio)

     let img = e.target.dataset.img


     class Objeto_producto{
         constructor(producto, precio, img, cantidad){
             this.producto = producto
             this.precio = precio
             this.img = img
             this.cantidad = cantidad = 1
         }
     }


     let nuevoProducto = new Objeto_producto(producto, precio, img)

     if(localStorage.getItem('producto') === null){
         let carrito = []
         carrito.push(nuevoProducto)
         localStorage.setItem('producto', JSON.stringify(carrito))
     }else{
         let carrito = JSON.parse(localStorage.getItem('producto'))
         for(let x = 0; x < carrito.length; x++){
        
             if(nuevoProducto.producto === carrito[x].producto){
                 carrito.splice(x, 1)
             }
         }
         carrito.push(nuevoProducto)
         localStorage.setItem('producto', JSON.stringify(carrito))
     }
     mostrar()
    }
}
);

function mostrar(){

    let total = 0

    let carrito = JSON.parse(localStorage.getItem('producto'))

    let mostrar_carrito = document.getElementById('mostrar_Carrito')

    mostrar_carrito.innerHTML = ""

    for (let i = 0; i < carrito.length; i++) {

        let {producto, precio, img, cantidad} = carrito[i]

        total = total + (carrito[i].precio * cantidad)

        mostrar_carrito.innerHTML += `
        <div>
            <img src="${img}" width="50px" alt="">
            <p>producto: ${producto}</p>
            <p>Precio: ${precio}</p>
                <div class="cantidad">
                    <button data-producto=${producto} onclick="decremento('${producto}')" class="btn btn-decremento btn-primary">-</button>
                    <p id="cantidad-stock">${cantidad}</p>
                    <button data-producto=${producto} onclick="incremento('${producto}')" class="btn btn-incremento btn-primary">+</button>
                </div>
            <button class="eliminar_del_carrito" onclick="eliminarDelCarrito('${producto}')">Eliminar</button>
        </div>`
    }

    let montoTotal = document.getElementById('total')
    montoTotal.textContent = total
}

mostrar()

function eliminarDelCarrito(producto){
    let carrito = JSON.parse(localStorage.getItem('producto'))
    let total = 0

    if(carrito.length == 0){
        total = 0;
    }

    for(let i = 0; i < carrito.length; i++){
        if(producto === carrito[i].producto){
            carrito.splice(i, 1)
        }
    }

    let mostrar_carrito = document.getElementById('mostrar_Carrito')

    mostrar_carrito.innerHTML = ""

    for (let x = 0; x < carrito.length; x++) {

        // let producto = carrito[x].producto
        // let precio = carrito[x].precio
        // let img = carrito[x].img

        let {producto, precio, img, cantidad} = carrito[x]

        total = total + (carrito[x].precio * cantidad)
 
        mostrar_carrito.innerHTML +=`
        <div>
        <img src="${img}" width="50px" alt="">
        <p>prodcuto: ${producto}</p>
        <p>Precio: ${precio}</p>
        <div class="cantidad">
        <button data-producto=${producto} onclick="decremento('${producto}')" class="btn btn-decremento btn-primary">-</button>
        <p id="cantidad-stock">${cantidad}</p>
        <button data-producto=${producto} onclick="incremento('${producto}')" class="btn btn-incremento btn-primary">+</button>

    </div>
        <button class="eliminar_del_carrito" onclick="eliminarDelCarrito('${producto}')">Eliminar</button>
    </div>`
    }

    let montoTotal = document.getElementById('total')
    montoTotal.textContent = total

    localStorage.setItem('producto', JSON.stringify(carrito))

}


let vaciar_carrito = document.getElementById('borrar_carrito')
vaciar_carrito.addEventListener('click', () => {
    let carrito = JSON.parse(localStorage.getItem('producto'))
    carrito = []
    let mostrar_carrito = document.getElementById('mostrar_Carrito')
    mostrar_carrito.innerHTML = ""
    let montoTotal = document.getElementById('total')
    montoTotal.textContent = 0
    localStorage.setItem('producto', JSON.stringify(carrito))
})

let pagar_carrito = document.getElementById('pagar_carrito')
pagar_carrito.addEventListener('click', () => {
    let carrito = JSON.parse(localStorage.getItem('producto'))
    if(carrito.length == 0){
        alert('no se puede realizar un pago con el carrito vacio')
        return
    }
    carrito = []
    let mostrar_carrito = document.getElementById('mostrar_Carrito')
    mostrar_carrito.innerHTML = ""
    let montoTotal = document.getElementById('total')
    montoTotal.textContent = 0
    alert('pago realizado con exito')
    localStorage.setItem('producto', JSON.stringify(carrito))
})

function incremento(producto){
    let carrito = JSON.parse(localStorage.getItem('producto'))
    console.log(producto)
    for(let i = 0; i < carrito.length; i++){
        if(producto == carrito[i].producto){
            carrito[i].cantidad = carrito[i].cantidad + 1
            let total = 0

        
            let mostrar_carrito = document.getElementById('mostrar_Carrito')
        
            mostrar_carrito.innerHTML = ""
        
            for (let i = 0; i < carrito.length; i++) {
        
                let {producto, precio, img, cantidad} = carrito[i]
        
                total = total + (carrito[i].precio * cantidad)
        
                mostrar_carrito.innerHTML += `
                <div>
                    <img src="${img}" width="50px" alt="">
                    <p>producto: ${producto}</p>
                    <p>Precio: ${precio}</p>
                        <div class="cantidad">
                            <button data-producto=${producto} onclick="decremento('${producto}')" class="btn btn-decremento btn-primary">-</button>
                            <p id="cantidad-stock">${cantidad}</p>
                            <button data-producto=${producto} onclick="incremento('${producto}')" class="btn btn-incremento btn-primary">+</button>
                        </div>
                    <button class="eliminar_del_carrito" onclick="eliminarDelCarrito('${producto}')">Eliminar</button>
                </div>`
            }
            let montoTotal = document.getElementById('total')
            montoTotal.textContent = total
        }
        
    }
    localStorage.setItem('producto', JSON.stringify(carrito))
}

function decremento(producto){
    let carrito = JSON.parse(localStorage.getItem('producto'))
    console.log(producto)
    for(let i = 0; i < carrito.length; i++){
        if(producto == carrito[i].producto){
            if(carrito[i].cantidad <= 1){
                console.log('bug')
                return
            }
            carrito[i].cantidad = carrito[i].cantidad - 1

            let total = 0

            let mostrar_carrito = document.getElementById('mostrar_Carrito')
        
            mostrar_carrito.innerHTML = ""
        
            for (let i = 0; i < carrito.length; i++) {
        
                let {producto, precio, img, cantidad} = carrito[i]
        
                total = total + (carrito[i].precio * cantidad)
        
                mostrar_carrito.innerHTML += `
                <div>
                    <img src="${img}" width="50px" alt="">
                    <p>producto: ${producto}</p>
                    <p>Precio: ${precio}</p>
                        <div class="cantidad">
                            <button data-producto=${producto} onclick="decremento('${producto}')" class="btn btn-decremento btn-primary">-</button>
                            <p id="cantidad-stock">${cantidad}</p>
                            <button data-producto=${producto} onclick="incremento('${producto}')" class="btn btn-incremento btn-primary">+</button>
                        </div>
                    <button class="eliminar_del_carrito" onclick="eliminarDelCarrito('${producto}')">Eliminar</button>
                </div>`
            }
            let montoTotal = document.getElementById('total')
            montoTotal.textContent = total
        }
    }
    localStorage.setItem('producto', JSON.stringify(carrito))
}