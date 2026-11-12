# El Universo

Web app instalable para aprender del universo: 20 lecciones cortas (menos de 5 minutos) en dos niveles, con animaciones interactivas y un reto de 3 preguntas al final de cada una.

## Nivel 1 · Lo básico
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

## Nivel 2 · Explorando más
11. Marte
12. Júpiter y Saturno
13. Cometas y meteoros
14. Constelaciones
15. Día, noche y mareas
16. Exoplanetas
17. La luz invisible
18. Cohetes y satélites
19. Lo invisible (materia y energía oscuras)
20. ¿Qué tan grande es el universo?

## Publicar
Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`. En el teléfono: abrir el enlace → "Agregar a pantalla de inicio".

## Archivos
- `index.html`, `styles.css`: estructura y estilo
- `lessons.js`: textos, controles y preguntas (editar aquí para agregar lecciones)
- `anims.js`, `anims2.js`: animaciones en canvas (nivel 1 y nivel 2)
- `app.js`: navegación, progreso (se guarda en el teléfono) y retos
- `sw.js`, `manifest.json`, `icons/`: funcionamiento offline e instalación
