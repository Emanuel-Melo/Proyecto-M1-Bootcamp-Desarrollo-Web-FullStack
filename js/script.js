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

const botonLiquido = document.getElementById("generar");
const canvasLiquido = botonLiquido.querySelector("canvas");
const contextoLiquido = canvasLiquido.getContext("2d");
const puntosLiquidos = [];
const puntosLiquidosDelanteros = [];
const configuracionLiquida = {
    puntos: 8,
    viscosidad: 20,
    distanciaMouse: 70,
    amortiguacion: 0.05
};
let mouseLiquido = { x: -100, y: -100 };
let ultimoMouseLiquido = { x: -100, y: -100 };
let direccionMouseLiquido = { x: 0, y: 0 };
let velocidadMouseLiquido = { x: 0, y: 0 };

function crearPuntoLiquido(x, y, nivel) {
    return {
        x: 50 + x,
        y: 50 + y,
        baseX: 50 + x,
        baseY: 50 + y,
        velocidadX: 0,
        velocidadY: 0,
        nivel
    };
}

function construirPuntosLiquidos() {
    const ancho = botonLiquido.clientWidth;
    const alto = botonLiquido.clientHeight;
    const radio = alto / 2;
    const puntos = configuracionLiquida.puntos;

    canvasLiquido.width = ancho + 100;
    canvasLiquido.height = alto + 100;
    puntosLiquidos.length = 0;
    puntosLiquidosDelanteros.length = 0;

    function agregarPunto(x, y) {
        puntosLiquidos.push(crearPuntoLiquido(x, y, 1));
        puntosLiquidosDelanteros.push(crearPuntoLiquido(x, y, 2));
    }

    for (let indice = 1; indice < puntos; indice += 1) {
        agregarPunto(radio + ((ancho - alto) / puntos) * indice, 0);
    }
    agregarPunto(ancho - radio / 5, 0);
    agregarPunto(ancho + alto / 10, alto / 2);
    agregarPunto(ancho - radio / 5, alto);
    for (let indice = puntos - 1; indice > 0; indice -= 1) {
        agregarPunto(radio + ((ancho - alto) / puntos) * indice, alto);
    }
    agregarPunto(alto / 5, alto);
    agregarPunto(-alto / 10, alto / 2);
    agregarPunto(alto / 5, 0);
}

function moverPuntoLiquido(punto) {
    punto.velocidadX += (punto.baseX - punto.x) / (configuracionLiquida.viscosidad * punto.nivel);
    punto.velocidadY += (punto.baseY - punto.y) / (configuracionLiquida.viscosidad * punto.nivel);

    const distanciaX = mouseLiquido.x - punto.x;
    const distanciaY = mouseLiquido.y - punto.y;
    const distanciaReal = Math.sqrt((distanciaX ** 2) + (distanciaY ** 2));
    const influencia = 1 - distanciaReal / configuracionLiquida.distanciaMouse;

    if (influencia > 0) {
        const fuerza = influencia * 0.08 / punto.nivel;
        punto.velocidadX += distanciaX * fuerza;
        punto.velocidadY += distanciaY * fuerza;
    }

    punto.velocidadX *= 1 - configuracionLiquida.amortiguacion;
    punto.velocidadY *= 1 - configuracionLiquida.amortiguacion;
    punto.x += punto.velocidadX;
    punto.y += punto.velocidadY;
}

function dibujarFormaLiquida(puntos) {
    contextoLiquido.beginPath();
    contextoLiquido.moveTo(puntos[0].x, puntos[0].y);

    for (let indice = 0; indice < puntos.length; indice += 1) {
        const punto = puntos[indice];
        const siguiente = puntos[(indice + 1) % puntos.length];
        const medioX = (punto.x + siguiente.x) / 2;
        const medioY = (punto.y + siguiente.y) / 2;
        contextoLiquido.quadraticCurveTo(punto.x, punto.y, medioX, medioY);
    }

    contextoLiquido.closePath();
    contextoLiquido.fill();
}

function renderizarBotonLiquido() {
    contextoLiquido.clearRect(0, 0, canvasLiquido.width, canvasLiquido.height);

    puntosLiquidos.forEach(moverPuntoLiquido);
    puntosLiquidosDelanteros.forEach(moverPuntoLiquido);

    contextoLiquido.fillStyle = "#00e5c7";
    dibujarFormaLiquida(puntosLiquidos);

    const gradiente = contextoLiquido.createRadialGradient(
        mouseLiquido.x,
        mouseLiquido.y,
        0,
        mouseLiquido.x,
        mouseLiquido.y,
        canvasLiquido.width * 0.9
    );
    gradiente.addColorStop(0, "#ff00d4");
    gradiente.addColorStop(0.28, "#a83dff");
    gradiente.addColorStop(0.52, "#ff8a3d");
    gradiente.addColorStop(0.75, "#74df45");
    gradiente.addColorStop(1, "#00cfc7");
    contextoLiquido.fillStyle = gradiente;
    dibujarFormaLiquida(puntosLiquidosDelanteros);

    velocidadMouseLiquido.x *= 0.92;
    velocidadMouseLiquido.y *= 0.92;
    requestAnimationFrame(renderizarBotonLiquido);
}

botonLiquido.addEventListener("pointermove", function(evento) {
    const rectangulo = canvasLiquido.getBoundingClientRect();
    const posicionX = evento.clientX - rectangulo.left;
    const posicionY = evento.clientY - rectangulo.top;

    direccionMouseLiquido.x = posicionX > mouseLiquido.x ? 1 : posicionX < mouseLiquido.x ? -1 : 0;
    direccionMouseLiquido.y = posicionY > mouseLiquido.y ? 1 : posicionY < mouseLiquido.y ? -1 : 0;
    velocidadMouseLiquido.x = posicionX - mouseLiquido.x;
    velocidadMouseLiquido.y = posicionY - mouseLiquido.y;
    mouseLiquido = { x: posicionX, y: posicionY };
});

botonLiquido.addEventListener("pointerleave", function() {
    mouseLiquido = { x: -100, y: -100 };
    direccionMouseLiquido = { x: 0, y: 0 };
    velocidadMouseLiquido = { x: 0, y: 0 };
});

window.addEventListener("resize", construirPuntosLiquidos);
construirPuntosLiquidos();
renderizarBotonLiquido();
