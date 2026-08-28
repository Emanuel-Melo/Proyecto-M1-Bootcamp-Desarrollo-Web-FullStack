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
alert("Paleta generada 🎨");
});

colores.forEach(function(caja) {
    caja.addEventListener("click", function() {
        const texto = caja.textContent;
        navigator.clipboard.writeText(texto);
        caja.textContent = "Copiado ✅";
        setTimeout(function() {
            caja.textContent = texto;
        }, 1000);
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

function generarColorHSL() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 100);
    const l = Math.floor(Math.random() * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
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

const canvas = document.getElementById("water-canvas");
const contexto = canvas.getContext("2d");
const coloresAgua = [
    "#b000ff",
    "#ff00d4",
    "#ff247f",
    "#ff6a00",
    "#fff000",
    "#39ff14",
    "#00ffb7",
    "#00fff0"
];
const ondas = [];
const rastros = [];
let escala = window.devicePixelRatio || 1;
let cursor = { x: -100, y: -100 };
let ultimaPosicion = { x: -100, y: -100 };

function ajustarCanvas() {
    escala = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * escala;
    canvas.height = window.innerHeight * escala;
    contexto.setTransform(escala, 0, 0, escala, 0, 0);
}

function crearCorriente(x, y, distancia) {
    const color = coloresAgua[Math.floor(Math.random() * coloresAgua.length)];

    ondas.push({
        x,
        y,
        radio: 4,
        vida: 1,
        velocidad: 0.45 + Math.min(distancia / 140, 0.9),
        color
    });

    rastros.push({
        x,
        y,
        radio: 2 + Math.random() * 3,
        vida: 0.55,
        color
    });
}

function dibujarAgua() {
    contexto.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let indice = ondas.length - 1; indice >= 0; indice -= 1) {
        const onda = ondas[indice];
        onda.radio += onda.velocidad;
        onda.vida -= 0.006;

        contexto.beginPath();
        contexto.arc(onda.x, onda.y, onda.radio, 0, Math.PI * 2);
        contexto.globalAlpha = onda.vida * 0.65;
        contexto.fillStyle = onda.color;
        contexto.shadowColor = onda.color;
        contexto.shadowBlur = 18;
        contexto.fill();
        contexto.shadowBlur = 0;

        if (onda.vida <= 0) {
            ondas.splice(indice, 1);
        }
    }

    for (let indice = rastros.length - 1; indice >= 0; indice -= 1) {
        const rastro = rastros[indice];
        rastro.radio += 0.25;
        rastro.vida -= 0.009;

        contexto.beginPath();
        contexto.arc(rastro.x, rastro.y, rastro.radio, 0, Math.PI * 2);
        contexto.fillStyle = rastro.color;
        contexto.globalAlpha = rastro.vida * 0.5;
        contexto.fill();

        if (rastro.vida <= 0) {
            rastros.splice(indice, 1);
        }
    }

    contexto.globalAlpha = 1;
    requestAnimationFrame(dibujarAgua);
}

window.addEventListener("resize", ajustarCanvas);
window.addEventListener("pointermove", function(evento) {
    const distancia = Math.hypot(
        evento.clientX - ultimaPosicion.x,
        evento.clientY - ultimaPosicion.y
    );

    cursor = { x: evento.clientX, y: evento.clientY };
    if (distancia > 12) {
        crearCorriente(cursor.x, cursor.y, distancia);
        const circulo = document.createElement("span");
        const colorVibrante = coloresAgua[Math.floor(Math.random() * coloresAgua.length)];

        circulo.className = "water-circle";
        circulo.style.left = `${cursor.x}px`;
        circulo.style.top = `${cursor.y}px`;
        circulo.style.backgroundColor = colorVibrante;
        circulo.addEventListener("animationend", function() {
            circulo.remove();
        });
        document.body.appendChild(circulo);
        ultimaPosicion = cursor;
    }
});

ajustarCanvas();
dibujarAgua();
