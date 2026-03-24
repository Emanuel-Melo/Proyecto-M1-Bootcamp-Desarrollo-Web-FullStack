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
## Prompt 6: Responsive design

**Prompt:**
¿Cómo hacer una página responsive con CSS?

**Respuesta obtenida:**
Uso de media queries (`@media`).

**Aplicación en el proyecto:**
Se adaptó la interfaz a dispositivos móviles y tablets.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Prompt 6: Responsive design

**Prompt:**
¿Cómo hacer una página responsive con CSS?

**Respuesta obtenida:**
Uso de media queries (`@media`).

**Aplicación en el proyecto:**
Se adaptó la interfaz a dispositivos móviles y tablets.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
