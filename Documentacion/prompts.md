# Documentación del uso de IA

Durante el desarrollo del proyecto se utilizó inteligencia artificial como apoyo para resolver dudas, mejorar la lógica y optimizar el código.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Prompt 1: Centrado h1 y en general

**Prompt:**
necesito poner a h1 en el centro, que me recomiendas?

**Respuesta obtenida:**
Es el método más moderno y profesional.
```css
import foobar
body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center; /* centro horizontal */
    align-items: center;     /* centro vertical */
}

h1 {
    font-size: 60px;
    color: rgb(175,180,99);
    background-color: rgba(0,0,0,0.3);
    padding: 20px;
    border-radius: 10px;
}
```
✅ Resultado:
El h1 queda perfectamente centrado en toda la pantalla.

🟢 Método simple (solo horizontal)

Si solo quieres centrarlo horizontalmente:
```css
h1 {
    text-align: center;
}
```
O si el h1 tiene ancho fijo:
```css
h1 {
    width: 500px;
    margin: auto;
}
```
**Aplicación en el proyecto:**
Se implementó esta función en varias de las etiquetas siguientes en el archivo css.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Prompt 2: Significado Inline

**Prompt:**
Mira, estoy estudiando algunos temas de el lenguaje css, pero tengo una duda porque me nombran el termindo de estilos inline, que significa esto, y dame 3 ejemplos practicos de este tema.

**Respuesta obtenida:**
Los estilos inline en CSS son aquellos que se aplican directamente dentro de una etiqueta HTML, usando el atributo style.
Es decir, en lugar de escribir el CSS en un archivo aparte o en una etiqueta <style>, lo escribes en el mismo elemento que quieres modificar.
¿Qué significa en pocas palabras?
Que el estilo va “en línea” (inline) dentro del HTML.
🧠 Ejemplo básico
````css
<p style="color: red;">Este texto es rojo</p>
````
Aquí el CSS (color: red;) está aplicado directamente al <p>.

✅ 3 ejemplos prácticos
1. Cambiar color y tamaño de texto
````css
<h1 style="color: blue; font-size: 30px;">
  Título azul grande
</h1>
````
👉 Se usa cuando quieres modificar rápidamente un texto específico.

2. Estilizar un botón
````css
<button style="background-color: green; color: white; padding: 10px;">
  Comprar
</button>
````
👉 Útil para pruebas rápidas o botones únicos.

3. Centrar y dar fondo a un div
````css
<div style="text-align: center; background-color: lightgray;">
  Contenido centrado con fondo gris
</div>
````
👉 Sirve para aplicar estilos puntuales a una sección.

⚠️ Importante
Aunque los estilos inline funcionan, no son la mejor práctica para proyectos grandes porque:
Hacen el código más desordenado 😵
Son difíciles de mantener
No se pueden reutilizar fácilmente
👉 Lo ideal es usar archivos CSS externos o estilos internos.

**Aplicación en el proyecto:**
Fue usado como conocimiento, y en tanto al proyecto, nunca se usó el método de inline, todo fue creado desde el archivo de css.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Prompt 3: Significado DevTools

**Prompt:**
Gracias, mira, como tal estoy desarrollando una pagina web que genera una paleta de colores aleatorio, y en lo estipulado me dice que tengo que usar DevTools para depuracion, que quiere decirte esto, dame 3 ejemplos de esto.

**Respuesta obtenida:**
Cuando te dicen que uses DevTools para depuración, se refieren a las herramientas que trae el navegador (como Google Chrome DevTools) para inspeccionar, analizar y corregir errores en tu página web.

✅ 3 ejemplos prácticos (en tu caso de paleta de colores)

1. 🎨 Ver y modificar estilos en tiempo real
Si tu color no se aplica correctamente:
Abres DevTools (F12)
Vas a la pestaña Elements
Seleccionas el elemento
Ahí puedes cambiar el CSS directamente:
````css
background-color: red;
````
👉 Puedes probar colores sin recargar la página hasta encontrar el correcto.

2. 🧪 Revisar si tu JavaScript está funcionando
Si tu botón de “generar color” no hace nada:
Vas a la pestaña Console
Buscas errores como:
````bash
Uncaught TypeError
````
👉 Eso te dice exactamente qué línea falló.

También puedes poner:
````javascript
console.log(color);
````
Para ver qué valor se está generando.

3. 🔍 Ver cambios dinámicos en el DOM
Cuando generas un color aleatorio, probablemente cambias el HTML o estilos con JavaScript.
En DevTools puedes:
Ver si el color realmente cambia
Ver si se está aplicando al elemento correcto
👉 Por ejemplo, confirmar que tu código sí hace:
````javascript
document.body.style.backgroundColor = color;
````
**Aplicación en el proyecto:**
Se usó a lo largo del desarrollo del proyecto, más que todo con la consola y el uso de javascript para revisar conexiones.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Prompt 4: Sitio web estático

**Prompt:**
cuando me dicen que es una sitio web estatico, significa que no se hace scroll?

**Respuesta obtenida:**
No — eso es un malentendido bastante común 😄

🧠 ¿Qué es realmente un sitio web estático?
Un sitio web estático es aquel donde:
El contenido está predefinido (HTML, CSS, JS)
No cambia desde el servidor según el usuario
No hay procesamiento dinámico en backend

👉 Es decir: todos los usuarios ven básicamente lo mismo.

🔍 Entonces… ¿puede tener scroll?
✅ Sí, totalmente
El scroll depende del contenido y el diseño, no de si es estático o dinámico.

🧾 Ejemplo claro
✔️ Sitio estático con scroll
Una página larga como:
Portafolio
Landing page
Blog simple

Puede tener mucho contenido → entonces hay scroll.

**Aplicación en el proyecto:**
Se usó de conocimiento y fue parte para la planeación visual del proyecto.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Prompt 5: Desplegable en HTML

**Prompt:**
Dame un trozo de código para añadir un desplegable sin uso de css inline, y  no tan avanzado, uso de programación nivel junior

**Respuesta obtenida:**
Vamos a refactorizarlo estilo junior bien hecho:

Separar HTML y CSS
Reducir repetición
Hacerlo más claro
✅ Versión limpia y simple
📄 HTML
````html
<div class="dropdown">
  <button class="dropdown-btn" id="btn">Seleccionar color</button>

  <div class="dropdown-content" id="menu">
    <div data-color="Rojo">Rojo</div>
    <div data-color="Azul">Azul</div>
    <div data-color="Verde">Verde</div>
  </div>
</div>
````
🎨 CSS
````css
.dropdown {
  position: relative;
  width: 200px;
}

.dropdown-btn {
  width: 100%;
  padding: 10px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.dropdown-content {
  display: none;
  position: absolute;
  width: 100%;
  background: #f1f1f1;
  margin-top: 5px;
  border-radius: 5px;
}

.dropdown-content div {
  padding: 10px;
  cursor: pointer;
}

.dropdown-content div:hover {
  background: #ddd;
}
````
**Aplicación en el proyecto:**
Se implemento parte del código en el proyecto, con algunas modificaciones como id o pequeños cambios en las funciones en css.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Prompt 6: Tipografías css

**Prompt:**
dame ideas para un font-family, que tipografias tienes que convinen con la funcion de la pagina web?

**Respuesta obtenida:**
Mejores tipos de tipografía para tu proyecto
✅ 1. Sans-serif (la mejor opción 🔥)
Son modernas y claras, perfectas para interfaces.
💡 Ejemplos:
````css
font-family: Arial, Helvetica, sans-serif;
````
👉 Fácil, segura y funciona en todos los navegadores.

🔥 2. Más modernas (tipo UI / diseño)
Se ven más “pro” y actuales.
💡 Ejemplos:
````css
font-family: 'Poppins', sans-serif;
font-family: 'Roboto', sans-serif;
font-family: 'Inter', sans-serif;
````
👉 Estas son muy usadas en apps reales.

🎯 3. Estilo creativo (para darle personalidad)
Si quieres que tu web se vea más “de diseño”.
💡 Ejemplo:
````css
font-family: 'Montserrat', sans-serif;
````
👉 Funciona muy bien con proyectos visuales como colores.

🧠 ¿Cuál te conviene a ti?
Para tu proyecto:

👉 🥇 Inter o Poppins → moderno y limpio
👉 🥈 Roboto → muy equilibrado
👉 🥉 Arial → si quieres algo simple y seguro

💡 Ejemplo recomendado (listo para usar)
````css
body {
  font-family: 'Poppins', sans-serif;
}
````
⚠️ Importante
Si usas fuentes como Poppins o Inter, necesitas importarlas:
````html
<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
````
**Aplicación en el proyecto:**
Despues de muchos cambios, se decidió usar arial, helvetica y sans-serif, aunque despues de un poco de investigación de las tipografías del sistema, se agregó principalmente una de system-ui, de apple system

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Prompt 7: Explicación código visto en video

**Prompt:**
Explicame esta animacion detalladamente: 
````css
background: linear-gradient(270deg, #0a69e6, #b30ec2, #7808d4, #180ace);
background-size: 800% 800%;
animation: fondoAnimado 10s ease infinite;
}
@keyframes fondoAnimado {
    0% {background-position: 0% 50%;}
    50% {background-position: 100% 50%;}
    100% {background-position: 0% 50%;}
}
````

**Respuesta obtenida:**
Perfecto, esta animación está muy buena 👀 — te la explico como si la estuvieras construyendo desde cero.

🎯 ¿Qué hace esta animación?

👉 Crea un fondo con gradiente que se mueve suavemente, dando un efecto tipo:
“fluido”
“neón”
“vivo”

🧠 1. El gradiente base
````css
background: linear-gradient(270deg, #0a69e6, #b30ec2, #7808d4, #180ace);
````
👉 Esto crea un degradado de colores
🔍 Detalles:
270deg → dirección del gradiente (de derecha a izquierda)
Colores:
azul → morado → violeta → azul oscuro
💡 Sin animación, esto sería solo un fondo estático.

🧠 2. El truco clave (MUY importante)
````css
background-size: 800% 800%;
````
👉 Esto hace que el fondo sea mucho más grande que el elemento.
🔍 ¿Por qué 800%?
El fondo es 8 veces más grande
Entonces hay “más gradiente” que se puede mover
💡 Sin esto, la animación casi no se notaría.

🎬 3. Activar la animación
````css
animation: fondoAnimado 10s ease infinite;
````
👉 Esto le dice al CSS:
fondoAnimado → nombre de la animación
10s → dura 10 segundos
ease → movimiento suave
infinite → se repite siempre

🎥 4. La animación (@keyframes)
````css
@keyframes fondoAnimado {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}
````
👉 Aquí defines cómo se mueve el fondo.

🔍 Paso a paso:

🟢 0%
````css
background-position: 0% 50%;
````
👉 El fondo empieza:
en el lado izquierdo (0%)
centrado verticalmente (50%)

🟡 50%
````css
background-position: 100% 50%;
````
👉 El fondo se mueve:
hasta el lado derecho (100%)
💡 Aquí ocurre el desplazamiento principal.

🔵 100%
````css
background-position: 0% 50%;
````
👉 Vuelve al inicio.
💡 Esto crea un loop suave.

🔥 ¿Qué efecto visual genera?
👉 El gradiente parece:
moverse de izquierda a derecha
cambiar constantemente
fluir como una ola 🌊

🧠 Concepto clave (IMPORTANTE)
Esto funciona porque:
👉 No estás animando colores… estás moviendo el fondo

🎯 Analogía fácil
Imagina:
Tienes una imagen gigante (el gradiente)
Y solo ves una ventana pequeña (tu pantalla)
👉 Lo que haces es mover la imagen detrás de la ventana

**Aplicación en el proyecto:**
Está explicación se usó para entender e implementar esta función en otras etiquetas del html para armonizar el diseño del sitio web.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Prompt 8: Responsive design

**Prompt:**
````html
<label>Seleccione la cantidad de colores</label>
    <select>
        <option>6 colores</option>
        <option>8 colores</option>
        <option>9 colores</option>
    </select>
````
esta es la estructura que quiero usar, es la que tengo en mi html, con eso en base, como hago para que se vea más agradable usando css, ojo, no quiero cambios de la estructura de html, solo diseño desde css

**Respuesta obtenida:**
🎨 CSS mejorado (sin tocar tu HTML)
````css
label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}

select {
  width: 200px;
  padding: 10px 12px;

  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  background-color: #88515f;
  color: white;

  border: none;
  border-radius: 8px;

  cursor: pointer;

  box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
  transition: all 0.2s ease;

  outline: none; /* quita borde azul */
}
````
✨ Interacción (muy importante)
````css
select:hover {
  transform: translateY(-1px);
  box-shadow: 0px 6px 12px rgba(0,0,0,0.3);
}

select:focus {
  box-shadow: 0px 0px 0px 2px rgba(136, 81, 95, 0.4);
}
````
🎯 Opcional (mejorar apariencia de opciones)
````css
option {
  background: white;
  color: #333;
}
````
🧠 ¿Qué mejoramos?
🔹 padding
👉 Más espacio interno → se ve “inflado”

🔹 border-radius
👉 Bordes suaves → moderno

🔹 box-shadow
👉 Sensación de profundidad

🔹 hover + focus
👉 Feedback visual (muy importante para UX)

**Aplicación en el proyecto:**
Este prompt se uso para mejorar la organización del archivo html, y para mejorar el aspecto visula del desplegable.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Prompt 9: Mejora aspecto visual cajas colores

**Prompt:**
Mira, ttengo esto en mi css sobre unos item que son cajas que tengo para mostrar la paleta de colores, pero necesito que estas crezcan en el eje y, que hago?, aqui esta mi codigo css .
````css
.item {
    background-color: #4CAF50;
    color: white;
    padding: 20px;
    margin: 5px;
    text-align: center;
    border-color: black;
    flex: 2;
}
````
**Respuesta obtenida:**
🎯 Lo que quieres
👉 Que las cajas crezcan en el eje Y (altura)

🔥 SOLUCIÓN 1 (la más importante)
Debes asegurarte de que el contenedor tenga altura y use flex.
Ejemplo del contenedor:
````css
.container {
  display: flex;
  height: 300px; /* CLAVE */
}
````
Luego en tus .item:
````css
.item {
  flex: 1;
}
````
👉 Automáticamente ocuparán toda la altura disponible.

🔥 SOLUCIÓN 2 (forzar altura completa)
Si quieres que cada .item crezca en Y:
````css
.item {
  height: 100%;
}
````
💡 Esto funciona SOLO si el padre tiene altura definida.

🔥 SOLUCIÓN 3 (alineación en eje Y)
Si estás usando flex:
````css
.container {
  display: flex;
  align-items: stretch; /* esto es clave */
}
````
👉 stretch hace que los hijos ocupen toda la altura.

**Aplicación en el proyecto:**
Estás soluciones proporcionaron recursos que se usaron en varias etiquetas en css.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Prompt 10: Reestructuración animación body

**Prompt:**
Mira, como organizo el codigo que te envio en el cual quiero agregar 2 animaciones, pero no quiero que se convinen, que es lo que pasa ahora con el codigo?, lo que pasa es que como tengo una propiedad de animation, esta es general, asi que si le digo que sea infinite y 10s, no solo sera el efecto de mar del color del fondo, sino que la transición al entrar a la página tambien sera repetitiva, lo que quiero es que la animacion de degradaciónFondo se repita infinitamente, pero la de slide, solo sea 1 vez. 
Aqui esta el codigo: 
````css
body { 
    margin: 0; 
    height: 100vh; 
    background: linear-gradient(270deg, #88515f, #a38a89, #7492b1, #34414f); 
    background-size: 800% 800%; 
    animation: degradaciónFondo 10s ease infinite; 
    animation: slide 3s; animation-name: slide; 
} 
@keyframes degradaciónFondo { 
    0% {background-position: 0% 50%;} 
    50% {background-position: 100% 50%;}
    100% {background-position: 0% 50%;} 
} 
@keyframes slide { 
    from { 
        translate: 150vw 0; 
        scale: 200% 1; 
    } 
    to { 
        translate: 0 0; 
        scale: 100% 1; 
    } 
}
````
**Respuesta obtenida:**
🧠 ¿Qué está pasando en tu código?
````css
animation: degradaciónFondo 10s ease infinite;
animation: slide 3s;
animation-name: slide;
````
👉 CSS funciona así:
La última propiedad gana
Entonces SOLO se está aplicando slide 😬

🎯 Lo que quieres hacer
✅ degradaciónFondo → infinito
✅ slide → solo una vez

🔥 SOLUCIÓN CORRECTA
👉 Debes poner las dos animaciones en una sola línea, separadas por coma.
✅ Código corregido
````css
body {
    margin: 0;
    height: 100vh;

    background: linear-gradient(270deg, #88515f, #a38a89, #7492b1, #34414f);
    background-size: 800% 800%;

    animation: 
      degradaciónFondo 10s ease infinite,
      slide 3s ease 1;
}
````

🧠 ¿Cómo funciona esto?
Cada animación tiene sus propios valores:
🔹 Primera animación
````css
degradaciónFondo 10s ease infinite
````
dura 10s
se repite siempre

🔹 Segunda animación
````css
slide 3s ease 1
````
dura 3s
se ejecuta una sola vez

**Aplicación en el proyecto:**
Este arreglo se agregó con unas pequeñas modificaciones al apartado de body.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Prompt 11: Correción código "a"

**Prompt:**
Por que este nav no esta en el centro, revisa el codigo 
````css
a{ 
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica     Neue', sans-serif; 
    color: rgb(222, 238, 255);
    background-color: #34414f; 
    font-size: 30px; 
    border-radius: 15px; 
    text-decoration: none; 
    transition: all 0.2s ease; 
    width: fit-content; 
    margin: 0 auto; 
    display: inline-block; 
    animation: pulse 1.5s ease-in-out infinite; 
    padding: 10px 20px; 
}
````
**Respuesta obtenida:**
🧠 ¿Por qué NO se centra?
Tienes esto:
````css
a {
  margin: 0 auto;
  display: inline-block;
}
````
👉 El problema es:
❌ margin: auto NO centra elementos inline-block
👉 Solo funciona bien con elementos block

🎯 SOLUCIONES

✅ Opción 1 (la más fácil)
Cambia a block:
````css
a {
  display: block;
  width: fit-content;
  margin: 0 auto;
}
````
👉 Ahora sí:
tiene ancho propio
se centra horizontalmente

✅ Opción 2 (mejor práctica 🔥)
Centra desde el contenedor (nav)
````css
nav {
  text-align: center;
}
````
👉 Funciona perfecto con:
````css
a {
  display: inline-block;
}
````

✅ Opción 3 (la más moderna)
Usar Flexbox en el nav:
````css
nav {
  display: flex;
  justify-content: center;
}
````
👉 Esto es lo más limpio hoy en día.

**Aplicación en el proyecto:**
Se aplicó esta correción al apartado de a, y se corrigío el error en algunas etiquetas con la réplica del error.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Prompt 12: Responsive design

**Prompt:**
mira, quiero agregar como boton tipo deslizador que me deje decidir el formato del color en cuanto a HSL y HEX, esto como sin el bug de que se elijan los 2 sino solo un modo.

**Respuesta obtenida:**
🎯 Resultado que buscas
Un switch que:
se vea suave
tenga animación
solo permita una opción (HEX / HSL)
sin JS

✅ HTML (limpio)
````html
<div class="toggle">
  <input type="radio" name="mode" id="hex" checked>
  <input type="radio" name="mode" id="hsl">

  <div class="slider"></div>

  <label for="hex">HEX</label>
  <label for="hsl">HSL</label>
</div>
````

🎨 CSS (estético y profesional 🔥)
````css
.toggle {
  position: relative;
  width: 160px;
  height: 45px;
  background: #e0e0e0;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  font-family: system-ui;
}

/* ocultamos radios */
.toggle input {
  display: none;
}

/* etiquetas */
.toggle label {
  flex: 1;
  text-align: center;
  z-index: 2;
  cursor: pointer;
  font-size: 14px;
  color: #555;
  transition: 0.2s;
}

/* slider */
.slider {
  position: absolute;
  width: 50%;
  height: 80%;
  background: #88515f;
  border-radius: 20px;
  left: 5px;
  transition: 0.3s ease;
}

/* estado HEX */
#hex:checked ~ .slider {
  left: 5px;
}

/* estado HSL */
#hsl:checked ~ .slider {
  left: calc(50% + 0px);
}

/* texto activo */
#hex:checked ~ label[for="hex"],
#hsl:checked ~ label[for="hsl"] {
  color: white;
}
````
**Aplicación en el proyecto:**
Este deslizador se usó para la elección de formato del color, y se modificó ligeramente el apartado del tamaño del box central.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
