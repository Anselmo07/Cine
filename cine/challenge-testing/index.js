class CarritoCompra {
    constructor(){
        this.carrito = [];
    }

    agregarProducto(producto){
        this.carrito.push(producto);
        
    }

    calcularTotal(){
        const total = this.carrito.reduce((suma, producto) => suma + producto.precio, 0);
        
        if (total < 0){
            throw new Error("El total del carrito nunca puede ser negativo"); 
        }
        
        return total;
    }
    
    aplicarDescuento(porcentaje){
        const total = this.calcularTotal();
        const descuento = (porcentaje / 100) * total;
        return total - descuento;
    }
}

const carrito = new CarritoCompra();
carrito.agregarProducto({ nombre: "Producto 1", precio: 500 });
carrito.agregarProducto({ nombre: "Producto 2", precio: 500 });

console.log("Total sin descuento:", carrito.calcularTotal()); // 300
console.log("Total con 10% de descuento:", carrito.aplicarDescuento(20)); // 270

module.exports = CarritoCompra;


/*ACTIVIDAD 04
El enunciado es el siguiente:



Desarrolla una clase en JavaScript llamada CarritoCompra que represente un carrito de compras. La clase debe tener los siguientes métodos:

constructor(): Inicializa el carrito como un array vacío.

agregarProducto(producto): Recibe un objeto representando un producto y lo agrega al carrito.

calcularTotal(): Calcula el total de la compra sumando los precios de todos los productos en el carrito.

aplicarDescuento(porcentaje): Aplica un descuento al total de la compra según el porcentaje especificado.

Escribir pruebas unitarias utilizando Jest para asegurarte de que la clase CarritoCompra funciona correctamente en diferentes escenarios.*/