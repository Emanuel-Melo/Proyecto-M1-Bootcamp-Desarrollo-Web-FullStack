const boton = document.getElementById("generar");
const colores = document.querySelectorAll(".color");
const select = document.getElementById("cantidad");
const modos = document.getElementsByName("mode");

boton.addEventListener("click", function() {
    const cantidad = parseInt(select.value);
    colores.forEach(function(caja, index) {
    if (index < cantidad) {
        let color;
        const modo = obtenerModo();
        if (modo === "hex") {
            color = generarColorHEX();
        } else {
            color = generarColorHSL();
        }
        caja.style.backgroundColor = color;
        caja.textContent = color;
        caja.style.display = "flex";
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

function generarColorHSL() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 100);
    const l = Math.floor(Math.random() * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

boton.addEventListener("click", function() {
    console.log(obtenerModo());
});