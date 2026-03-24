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

## Prompt 4: Eventos en JavaScript

**Prompt:**
¿Cómo ejecutar una función al hacer clic en un botón?

**Respuesta obtenida:**
Uso de `addEventListener("click", ...)`.

**Aplicación en el proyecto:**
Se implementó para generar nuevas paletas al presionar el botón.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Prompt 5: Copiar al portapapeles

**Prompt:**
¿Cómo copiar texto al portapapeles en JavaScript?

**Respuesta obtenida:**
Uso de `navigator.clipboard.writeText()`.

**Aplicación en el proyecto:**
Permite copiar el código del color al hacer clic en cada celda.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Prompt 6: Responsive design

**Prompt:**
¿Cómo hacer una página responsive con CSS?

**Respuesta obtenida:**
Uso de media queries (`@media`).

**Aplicación en el proyecto:**
Se adaptó la interfaz a dispositivos móviles y tablets.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
