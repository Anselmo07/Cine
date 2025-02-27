const CarritoCompra = require("../index");

describe("La clase compra", () => {
    it("Debe existir", () => { 
        expect(CarritoCompra).toBeInstanceOf(Function);
    });
    
    it("Constructor debe iniciar con un array vacio", () => {
        const carrito = new CarritoCompra();
        expect(carrito.carrito).toEqual([]);
    });

    it("Debe agregarse un producto", () => {
        const carrito = new CarritoCompra();
        carrito.agregarProducto([{ name: 'Producto 1', precio: 100 }]);
        expect(carrito.carrito.length).toEqual(1);
        carrito.agregarProducto([{ name: 'Producto 2', precio: 100 }]);
        carrito.agregarProducto([{ name: 'Producto 3', precio: 100 }]);
        expect(carrito.carrito.length).toEqual(3);
    });
    
    it('Debe calcular correctamente el total del carrito', () => {
        const carrito = new CarritoCompra();
        carrito.agregarProducto({ name: 'Producto 1', precio: 100 });
        carrito.agregarProducto({ name: 'Producto 2', precio: 200 });
        expect(carrito.calcularTotal()).toBe(300);
    });

    it("Debe aplicar un descuento al total de la compra de un", () =>{
        const carrito = new CarritoCompra();
        carrito.agregarProducto({name: "Producto A", precio: 700});
        carrito.agregarProducto({name: "Producto B", precio: 300});
        expect(carrito.aplicarDescuento(20)).toBe(800);
    });

    it("Si el total del carrito es negativo debe arrojar un error", () => {
        const carrito = new CarritoCompra();
        carrito.agregarProducto({name: "Producto A", precio: -200});
        carrito.agregarProducto({name: "Producto A", precio: 100});
        expect(() => carrito.calcularTotal()).toThrow("El total del carrito nunca puede ser negativo");
    })
});