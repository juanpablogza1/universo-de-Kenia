# El Universo de Kenia

Web app instalable para aprender del universo: 10 lecciones cortas (menos de 5 minutos), con animaciones y un reto de 3 preguntas al final de cada una.

## Lecciones
1. El Big Bang
2. El Sistema Solar
3. El Sol
4. Las estaciones
5. La Luna
6. La gravedad
7. Vida de las estrellas
8. Agujeros negros
9. Las galaxias
10. La luz y las distancias

## Publicar
Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
La app queda en `https://juanpablogza1.github.io/universo-de-Kenia/`. En el teléfono: abrir el enlace → "Agregar a pantalla de inicio".

## Archivos
- `index.html`, `styles.css`: estructura y estilo
- `lessons.js`: textos, datos y preguntas (editar aquí para agregar lecciones)
- `anims.js`: animaciones en canvas
- `app.js`: navegación, progreso (se guarda en el teléfono) y quiz
- `sw.js`, `manifest.json`, `icons/`: funcionamiento offline e instalación
