# Documentación del uso de IA

Durante el desarrollo del proyecto se utilizó inteligencia artificial como apoyo para resolver dudas, mejorar la lógica y optimizar el código.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Prompt 1: Centrado h1

**Prompt:**
necesito poner a h1 en el centro, que me recomiendas?

**Respuesta obtenida:**
Es el método más moderno y profesional.
```
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
```
h1 {
    text-align: center;
}
```
O si el h1 tiene ancho fijo:
```
h1 {
    width: 500px;
    margin: auto;
}
```
**Aplicación en el proyecto:**
Se implementó una función que genera colores HEX dinámicamente para cada celda de la paleta.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Prompt 2: Uso de HSL

**Prompt:**
¿Cómo generar colores aleatorios en formato HSL con JavaScript?

**Respuesta obtenida:**
Se indicó generar valores aleatorios para:

* Hue (0–360)
* Saturation (0–100%)
* Lightness (0–100%)

**Aplicación en el proyecto:**
Se creó una función que permite alternar entre formato HEX y HSL mediante un toggle.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Prompt 3: Manipulación del DOM

**Prompt:**
¿Cómo cambiar dinámicamente el color de elementos en JavaScript?

**Respuesta obtenida:**
Se sugirió usar `element.style.backgroundColor`.

**Aplicación en el proyecto:**
Se aplicaron los colores generados a cada tarjeta de la paleta.

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
