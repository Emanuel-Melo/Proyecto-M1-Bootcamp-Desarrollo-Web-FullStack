const boton = document.getElementById("generar");
const colores = document.querySelectorAll(".color");
const select = document.getElementById("cantidad");
const modos = document.getElementsByName("mode");

boton.addEventListener("click", function() {
    const color = generarColorHEX();
    colores[0].style.backgroundColor = color;
});

function generarColorHEX() {
    const caracteres = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += caracteres[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

console.log(generarColorHEX());