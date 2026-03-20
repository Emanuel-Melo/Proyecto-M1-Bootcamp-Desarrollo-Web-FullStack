const boton = document.getElementById("generar");
const colores = document.querySelectorAll(".color");
const select = document.getElementById("cantidad");
const modos = document.getElementsByName("mode");

boton.addEventListener("click", function() {
    const cantidad = parseInt(select.value);
    colores.forEach(function(caja, index) {
        if (index < cantidad) {
            const color = generarColorHEX();
            caja.style.backgroundColor = color;
            caja.textContent = color;
            caja.style.display = "block";
        } else {
            caja.style.display = "none";
        }
    });
});

function generarColorHEX() {
    const caracteres = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += caracteres[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

function obtenerModo() {
    for (let modo of modos) {
        if (modo.checked) {
            return modo.value;
        }
    }
}

boton.addEventListener("click", function() {
    console.log(obtenerModo());
});