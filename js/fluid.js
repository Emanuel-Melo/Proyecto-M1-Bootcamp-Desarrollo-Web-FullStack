const canvasFluido = document.getElementById("water-canvas");
const gl = canvasFluido.getContext("webgl", { alpha: true, premultipliedAlpha: false });

const fluidConfig = {
    enabled: true,
    resolutionScale: 0.55,
    velocityDissipation: 0.985,
    mouseForce: 2.4,
    splatRadius: 0.0025,
    pressureIterations: 12,
    trailSeconds: 2
};

const vertexShaderSource = `
    attribute vec2 position;
    varying vec2 uv;
    void main() {
        uv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const advectionShaderSource = `
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D source;
    uniform sampler2D velocity;
    uniform float dt;
    uniform float dissipation;
    void main() {
        vec2 currentVelocity = clamp(texture2D(velocity, uv).xy, vec2(-1.0), vec2(1.0));
        vec2 backtrace = clamp(uv - currentVelocity * dt, vec2(0.001), vec2(0.999));
        gl_FragColor = texture2D(source, backtrace) * dissipation;
    }
`;

const splatVelocityShaderSource = `
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D velocity;
    uniform vec2 point;
    uniform vec2 force;
    uniform float radius;
    void main() {
        vec2 offset = uv - point;
        offset.x *= 1.6;
        float influence = exp(-dot(offset, offset) / radius);
        vec2 currentVelocity = texture2D(velocity, uv).xy;
        gl_FragColor = vec4(clamp(currentVelocity + force * influence, vec2(-1.0), vec2(1.0)), 0.0, 1.0);
    }
`;

const splatDyeShaderSource = `
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D dye;
    uniform vec2 point;
    uniform vec3 color;
    uniform float radius;
    void main() {
        vec2 offset = uv - point;
        offset.x *= 1.6;
        float influence = exp(-dot(offset, offset) / radius);
        vec3 current = texture2D(dye, uv).rgb;
        gl_FragColor = vec4(mix(current, color, influence * 0.92), 1.0);
    }
`;

const divergenceShaderSource = `
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D velocity;
    uniform vec2 texel;
    void main() {
        float left = texture2D(velocity, uv - vec2(texel.x, 0.0)).x;
        float right = texture2D(velocity, uv + vec2(texel.x, 0.0)).x;
        float bottom = texture2D(velocity, uv - vec2(0.0, texel.y)).y;
        float top = texture2D(velocity, uv + vec2(0.0, texel.y)).y;
        gl_FragColor = vec4(0.5 * (right - left + top - bottom), 0.0, 0.0, 1.0);
    }
`;

const pressureShaderSource = `
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D pressure;
    uniform sampler2D divergence;
    uniform vec2 texel;
    void main() {
        float left = texture2D(pressure, uv - vec2(texel.x, 0.0)).x;
        float right = texture2D(pressure, uv + vec2(texel.x, 0.0)).x;
        float bottom = texture2D(pressure, uv - vec2(0.0, texel.y)).x;
        float top = texture2D(pressure, uv + vec2(0.0, texel.y)).x;
        float div = texture2D(divergence, uv).x;
        gl_FragColor = vec4((left + right + bottom + top - div) * 0.25, 0.0, 0.0, 1.0);
    }
`;

const projectionShaderSource = `
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D velocity;
    uniform sampler2D pressure;
    uniform vec2 texel;
    void main() {
        float left = texture2D(pressure, uv - vec2(texel.x, 0.0)).x;
        float right = texture2D(pressure, uv + vec2(texel.x, 0.0)).x;
        float bottom = texture2D(pressure, uv - vec2(0.0, texel.y)).x;
        float top = texture2D(pressure, uv + vec2(0.0, texel.y)).x;
        vec2 gradient = vec2(right - left, top - bottom) * 0.5;
        gl_FragColor = vec4(clamp(texture2D(velocity, uv).xy - gradient, vec2(-1.0), vec2(1.0)), 0.0, 1.0);
    }
`;

const displayShaderSource = `
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D dye;
    void main() {
        vec3 color = texture2D(dye, uv).rgb;
        float presence = smoothstep(0.004, 0.035, max(max(color.r, color.g), color.b));
        gl_FragColor = vec4(color * 1.45, presence);
    }
`;

let simulationSize;
let velocity;
let velocitySwap;
let dye;
let dyeSwap;
let pressure;
let pressureSwap;
let divergence;
let quadBuffer;
let programs;
let mousePosition = { x: 0.5, y: 0.5 };
let previousMouse = { x: 0.5, y: 0.5 };
let mouseVelocity = { x: 0, y: 0 };
let lastMove = 0;

function createProgram(fragmentSource) {
    const vertex = gl.createShader(gl.VERTEX_SHADER);
    const fragment = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertex, vertexShaderSource);
    gl.shaderSource(fragment, fragmentSource);
    gl.compileShader(vertex);
    gl.compileShader(fragment);
    if (!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
        console.error("Error en vertex shader:", gl.getShaderInfoLog(vertex));
    }
    if (!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
        console.error("Error en fragment shader:", gl.getShaderInfoLog(fragment));
    }
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Error enlazando shader:", gl.getProgramInfoLog(program));
    }
    return program;
}

function createTexture(width, height) {
    const texture = gl.createTexture();
    const filter = gl.getExtension("OES_texture_float_linear") ? gl.LINEAR : gl.NEAREST;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.FLOAT, null);
    return texture;
}

function createTarget(width, height) {
    const texture = createTexture(width, height);
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        console.error("Framebuffer de fluido incompleto");
    }
    return { texture, framebuffer };
}

function swap(first, second) {
    const texture = first.texture;
    const framebuffer = first.framebuffer;
    first.texture = second.texture;
    first.framebuffer = second.framebuffer;
    second.texture = texture;
    second.framebuffer = framebuffer;
}

function useProgram(program, target) {
    gl.useProgram(program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.framebuffer : null);
    gl.viewport(0, 0, target ? simulationSize.width : canvasFluido.width, target ? simulationSize.height : canvasFluido.height);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    const attribute = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
}

function setTexture(program, name, value, unit) {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, value.texture || value);
    gl.uniform1i(gl.getUniformLocation(program, name), unit);
}

function setVector(program, name, x, y) {
    gl.uniform2f(gl.getUniformLocation(program, name), x, y);
}

function setNumber(program, name, value) {
    gl.uniform1f(gl.getUniformLocation(program, name), value);
}

function draw(program) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function clearTarget(target) {
    useProgram(programs.display, target);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function resizeFluid() {
    const width = Math.max(128, Math.floor(window.innerWidth * fluidConfig.resolutionScale));
    const height = Math.max(128, Math.floor(window.innerHeight * fluidConfig.resolutionScale));
    simulationSize = { width, height };
    canvasFluido.width = window.innerWidth * (window.devicePixelRatio || 1);
    canvasFluido.height = window.innerHeight * (window.devicePixelRatio || 1);
    velocity = createTarget(width, height);
    velocitySwap = createTarget(width, height);
    dye = createTarget(width, height);
    dyeSwap = createTarget(width, height);
    pressure = createTarget(width, height);
    pressureSwap = createTarget(width, height);
    divergence = createTarget(width, height);
    clearTarget(velocity);
    clearTarget(velocitySwap);
    clearTarget(dye);
    clearTarget(dyeSwap);
    clearTarget(pressure);
    clearTarget(pressureSwap);
}

function hsvToRgb(hue) {
    const sector = Math.floor(hue * 6);
    const fraction = hue * 6 - sector;
    const colors = [
        [1, fraction, 0], [1 - fraction, 1, 0], [0, 1, fraction],
        [0, 1 - fraction, 1], [fraction, 0, 1], [1, 0, 1 - fraction]
    ];
    const color = colors[sector % 6];
    return color;
}

function injectMouse(marcaTiempo) {
    const speed = Math.hypot(mouseVelocity.x, mouseVelocity.y);
    if (speed < 0.00035) {
        return;
    }
    const force = Math.min(speed * fluidConfig.mouseForce, 0.08);
    useProgram(programs.splatVelocity, velocitySwap);
    setTexture(programs.splatVelocity, "velocity", velocity, 0);
    setVector(programs.splatVelocity, "point", mousePosition.x, mousePosition.y);
    setVector(programs.splatVelocity, "force", mouseVelocity.x * force / speed, mouseVelocity.y * force / speed);
    setNumber(programs.splatVelocity, "radius", fluidConfig.splatRadius + force * 0.025);
    draw(programs.splatVelocity);
    swap(velocity, velocitySwap);

    useProgram(programs.splatDye, dyeSwap);
    setTexture(programs.splatDye, "dye", dye, 0);
    setVector(programs.splatDye, "point", mousePosition.x, mousePosition.y);
    const color = hsvToRgb((marcaTiempo * 0.000035 + mousePosition.x * 0.32 + mousePosition.y * 0.18) % 1);
    gl.uniform3f(gl.getUniformLocation(programs.splatDye, "color"), color[0], color[1], color[2]);
    setNumber(programs.splatDye, "radius", fluidConfig.splatRadius + force * 0.04);
    draw(programs.splatDye);
    swap(dye, dyeSwap);
}

function simulateFluid(marcaTiempo) {
    const dt = 0.016;
    const texelX = 1 / simulationSize.width;
    const texelY = 1 / simulationSize.height;

    useProgram(programs.advection, velocitySwap);
    setTexture(programs.advection, "source", velocity, 0);
    setTexture(programs.advection, "velocity", velocity, 1);
    setNumber(programs.advection, "dt", dt);
    setNumber(programs.advection, "dissipation", fluidConfig.velocityDissipation);
    draw(programs.advection);
    swap(velocity, velocitySwap);

    injectMouse(marcaTiempo);

    useProgram(programs.divergence, divergence);
    setTexture(programs.divergence, "velocity", velocity, 0);
    setVector(programs.divergence, "texel", texelX, texelY);
    draw(programs.divergence);

    clearTarget(pressure);
    clearTarget(pressureSwap);
    for (let iteration = 0; iteration < fluidConfig.pressureIterations; iteration += 1) {
        useProgram(programs.pressure, pressureSwap);
        setTexture(programs.pressure, "pressure", pressure, 0);
        setTexture(programs.pressure, "divergence", divergence, 1);
        setVector(programs.pressure, "texel", texelX, texelY);
        draw(programs.pressure);
        swap(pressure, pressureSwap);
    }

    useProgram(programs.projection, velocitySwap);
    setTexture(programs.projection, "velocity", velocity, 0);
    setTexture(programs.projection, "pressure", pressure, 1);
    setVector(programs.projection, "texel", texelX, texelY);
    draw(programs.projection);
    swap(velocity, velocitySwap);

    useProgram(programs.advection, dyeSwap);
    setTexture(programs.advection, "source", dye, 0);
    setTexture(programs.advection, "velocity", velocity, 1);
    setNumber(programs.advection, "dt", dt);
    const dyeDissipation = Math.pow(0.5, dt / fluidConfig.trailSeconds);
    setNumber(programs.advection, "dissipation", dyeDissipation);
    draw(programs.advection);
    swap(dye, dyeSwap);
}

function renderFluid(marcaTiempo) {
    simulateFluid(marcaTiempo);
    useProgram(programs.display, null);
    setTexture(programs.display, "dye", dye, 0);
    gl.viewport(0, 0, canvasFluido.width, canvasFluido.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    draw(programs.display);
    mouseVelocity.x *= 0.92;
    mouseVelocity.y *= 0.92;
    requestAnimationFrame(renderFluid);
}

function startFluid() {
    if (!fluidConfig.enabled || !gl || !gl.getExtension("OES_texture_float")) {
        return;
    }
    programs = {
        advection: createProgram(advectionShaderSource),
        splatVelocity: createProgram(splatVelocityShaderSource),
        splatDye: createProgram(splatDyeShaderSource),
        divergence: createProgram(divergenceShaderSource),
        pressure: createProgram(pressureShaderSource),
        projection: createProgram(projectionShaderSource),
        display: createProgram(displayShaderSource)
    };
    quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    resizeFluid();
    renderFluid(performance.now());
}

window.addEventListener("resize", resizeFluid);
window.addEventListener("pointermove", function(evento) {
    previousMouse = { ...mousePosition };
    mousePosition = {
        x: evento.clientX / window.innerWidth,
        y: 1 - evento.clientY / window.innerHeight
    };
    mouseVelocity.x = mousePosition.x - previousMouse.x;
    mouseVelocity.y = mousePosition.y - previousMouse.y;
    lastMove = performance.now();
});

startFluid();
