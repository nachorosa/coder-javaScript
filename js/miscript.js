console.log('sweet alert');





mostrar()
let carrito=[] 

let btn_agregar = document.querySelectorAll(".agregar_al_carrito")

console.log(btn_agregar)

for(let i = 0; i < btn_agregar.length; i++){
 
    btn_agregar[i].addEventListener('click', agregar_carrito)
    function agregar_carrito(e) {
       
            Toastify({
                text: "Agregaste un producto al carrito",
                duration: 1200,
                position: 'right'
            }).showToast()

        let producto = e.target.dataset.producto

        let = precio = parseInt(e.target.dataset.precio)

        let img = e.target.dataset.img

       //TODO:  
        class Objeto_producto{
            constructor(producto, precio, img){
                this.producto = producto
                this.precio = precio
                this.img = img
            }
        }

        //FIXME:

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

// mostrar()
function mostrar(){

    let total = 0

    let carrito = JSON.parse(localStorage.getItem('producto'))

    let mostrar_carrito = document.getElementById('mostrar_Carrito')

    mostrar_carrito.innerHTML = ""

    for (let i = 0; i < carrito.length; i++) {

        // let producto = carrito[i].producto
        // let precio = carrito[i].precio
        // let img = carrito[i].img

        let {producto, precio, img} = carrito[i]

        total = total + carrito[i].precio
        console.log(total)

        mostrar_carrito.innerHTML += `
                <div>
                    <img src="${img}" width="50px" alt="">
                    <p>prodcuto: ${producto}</p>
                    <p>Precio: ${precio}</p>
                    <div class="cantidad">
                    <button data-precio=${precio} id="decremento" class="btn btn-primary">-</button>
                    <p id="cantidad-stock">1</p>
                    <button data-precio=${precio} id="incremento" class="btn btn-primary">+</button>
                </div>

                    <button class="eliminar_del_carrito" onclick="eliminarDelCarrito('${producto}')">Eliminar</button>
                </div>`

        let montoTotal = document.getElementById('total')
        montoTotal.textContent = total
    }
}

let incremento = document.getElementById('incremento')
let decremento = document.getElementById('decremento')
let stock = parseInt(document.getElementById('cantidad-stock').textContent)
let total = parseInt(document.getElementById('total').textContent)

incremento.addEventListener('click', (e) => {
    stock = stock + 1
    let precio = parseInt(e.target.dataset.precio)

    let nuevo = document.getElementById('cantidad-stock')
    nuevo.textContent = stock
    
    let nuevoTotal = document.getElementById('total')
    nuevoTotal.textContent = precio * stock;
    
})

decremento.addEventListener('click', (e) => {
    stock = stock - 1
    let precio = parseInt(e.target.dataset.precio)

    let nuevo = document.getElementById('cantidad-stock')
    nuevo.textContent = stock
    
    let nuevoTotal = document.getElementById('total')
    nuevoTotal.textContent = precio * stock;
})


function eliminarDelCarrito(producto){
    let carrito = JSON.parse(localStorage.getItem('producto'))
    let total = 0


    Swal.fire({
        title: 'Advertencia!',
        text: "se va a eliminar un producto de tu carrito!",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'tu producto ha sido borrado.',
            'success'
          )
        }
      })


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

        let {producto, precio, img} = carrito[x]

        total = total + carrito[x].precio
 
        mostrar_carrito.innerHTML +=`
        <div>
        <img src="${img}" width="50px" alt="">
        <p>prodcuto: ${producto}</p>
        <p>Precio: ${precio}</p>
        <div class="cantidad">
        <button data-precio=${precio} id="decremento" class="btn btn-primary">-</button>
        <p id="cantidad-stock">1</p>
        <button data-precio=${precio} id="incremento" class="btn btn-primary">+</button>
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
    carrito = []
    let mostrar_carrito = document.getElementById('mostrar_Carrito')
    mostrar_carrito.innerHTML = ""
    let montoTotal = document.getElementById('total')
    montoTotal.textContent = 0
    alert('pago realizado con exito')
    localStorage.setItem('producto', JSON.stringify(carrito))
})

