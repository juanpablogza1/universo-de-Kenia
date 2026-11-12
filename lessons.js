/* Contenido de las 10 lecciones. Cada lección: 3–4 diapositivas + 3 preguntas. */
const LESSONS = [
  /* ---------- Nivel 1 ---------- */
  {
    id: 'big-bang', title: 'El Big Bang', sub: 'Cómo empezó todo', min: 4,
    orb: 'radial-gradient(circle at 35% 30%,#fff,#ffd166 30%,#ff5ea8 65%,#5b2bbf)',
    slides: [
      { h: 'Todo empezó muy pequeño', anim: 'bang',
        t: 'Hace unos <b>13,800 millones de años</b>, todo el universo estaba apretado en un punto muy pequeño, caliente y denso. De pronto empezó a crecer muy rápido. A eso le llamamos <b>Big Bang</b>.',
        fact: 'No fue una explosión <i>dentro</i> del espacio: fue el espacio mismo el que empezó a estirarse.' },
      { h: 'El universo se infla como un globo', anim: 'balloon',
        controls: [{ type: 'range', key: 'inf', label: 'Infla', min: 0, max: 100, step: 1, value: 0, auto: true }],
        t: 'Mueve la barra para inflar el globo. Al inflarlo, <b>todos los puntos se alejan entre sí</b>. Así pasa con las galaxias: no es que corran, es que el espacio entre ellas crece.',
        fact: 'El universo sigue creciendo hoy, ¡y cada vez más rápido!' },
      { h: 'De luz a estrellas', anim: 'timeline',
        t: 'Al crecer, el universo se enfrió. Primero se formaron átomos, luego la primera luz libre. Unos <b>200 millones de años</b> después nacieron las primeras estrellas. Nuestro Sol llegó mucho después.',
        fact: 'Si toda la historia del universo fuera un año, el Sol nacería a principios de septiembre.' },
      { h: '¿Cómo lo sabemos?', anim: 'redshift',
        controls: [{ type: 'toggle', key: 'dir', options: [['lejos', 'Se aleja'], ['cerca', 'Se acerca']] }],
        t: 'Las galaxias lejanas se alejan de nosotros, y por eso su luz nos llega <b>estirada y más roja</b>. Si algo se acerca, su luz se ve más azul: pruébalo. Además, todavía vemos un brillo muy débil que viene de todas partes: el "eco" del Big Bang.',
        fact: 'A ese eco se le llama fondo cósmico de microondas. Parte de la "nieve" de las teles viejas venía de ahí.' }
    ],
    quiz: [
      { q: '¿Hace cuánto empezó el universo?', o: ['Hace 13,800 millones de años', 'Hace 4,600 millones de años', 'Hace 1 millón de años'], a: 0, e: '4,600 millones es la edad del Sol. El universo es mucho más viejo: 13,800 millones de años.' },
      { q: 'En el ejemplo del globo, ¿por qué se alejan los puntos?', o: ['Porque se mueven solos', 'Porque el globo (el espacio) se estira', 'Porque los empuja el viento'], a: 1, e: 'Las galaxias se alejan porque el espacio entre ellas crece.' },
      { q: 'La luz de una galaxia que se aleja se ve...', o: ['Más azul', 'Más verde', 'Más roja'], a: 2, e: 'Al alejarse, sus ondas de luz se estiran y se ven más rojas.' }
    ]
  },
  {
    id: 'sistema-solar', title: 'El Sistema Solar', sub: 'Nuestro vecindario', min: 3,
    orb: 'radial-gradient(circle at 35% 30%,#fff,#ffcf5a 25%,#ff8a1f 55%,#7a2f00)',
    slides: [
      { h: 'Todo gira alrededor del Sol', anim: 'solar', opts: { mode: 'orbit' },
        t: 'El Sistema Solar es el <b>Sol</b> y todo lo que gira a su alrededor: <b>8 planetas</b>, sus lunas, asteroides y cometas. Los planetas cercanos dan la vuelta rápido; los lejanos, muy despacio.',
        fact: 'La Tierra tarda 1 año en dar la vuelta. Neptuno tarda ¡165 años!' },
      { h: 'Tamaños muy distintos', anim: 'sizes',
        t: 'La Tierra es pequeña al lado de <b>Júpiter</b>, el planeta más grande. Y todos los planetas juntos son diminutos comparados con el Sol, que se asoma a la izquierda.',
        fact: 'El Sol tiene el 99.8% de toda la masa del Sistema Solar.' },
      { h: 'Rocosos y gigantes', anim: 'solar', opts: { mode: 'type' },
        t: '<b>Mercurio, Venus, Tierra y Marte</b> son rocosos. <b>Júpiter y Saturno</b> son gigantes de gas. <b>Urano y Neptuno</b> son gigantes de hielo. Entre Marte y Júpiter hay un cinturón de asteroides.',
        fact: 'En los gigantes no podrías pararte: no tienen suelo firme.' }
    ],
    quiz: [
      { q: '¿Cuántos planetas tiene el Sistema Solar?', o: ['7', '8', '9'], a: 1, e: 'Son 8. Plutón se considera planeta enano desde 2006.' },
      { q: '¿Cuál es el planeta más grande?', o: ['Saturno', 'Júpiter', 'Neptuno'], a: 1, e: 'Júpiter es el más grande: le caben más de 1,300 Tierras.' },
      { q: '¿Qué hay entre Marte y Júpiter?', o: ['Un cinturón de asteroides', 'Otra estrella', 'Nada'], a: 0, e: 'Ahí está el cinturón principal de asteroides.' }
    ]
  },
  {
    id: 'sol', title: 'El Sol', sub: 'Nuestra estrella', min: 4,
    orb: 'radial-gradient(circle at 35% 30%,#fffbe0,#ffd34d 35%,#ff6d12 75%,#9a2a00)',
    slides: [
      { h: 'El Sol es una estrella', anim: 'sun',
        t: 'El Sol es una estrella, como las que ves de noche, pero muy cerca. Es una bola gigante de gas brillante: <b>a lo ancho caben 109 Tierras</b> y adentro cabría más de un millón.',
        fact: 'El Sol tiene unos 4,600 millones de años y está a la mitad de su vida.' },
      { h: '¿Cómo brilla?', anim: 'fusion',
        t: 'En su centro, el calor y la presión son tan grandes que los átomos de <b>hidrógeno se juntan</b> y forman <b>helio</b>. Al juntarse sueltan muchísima energía: luz y calor. A esto se le llama <b>fusión nuclear</b>.',
        fact: 'Cada segundo, el Sol convierte unos 600 millones de toneladas de hidrógeno en helio.' },
      { h: 'Un viaje lento hacia afuera', anim: 'sunlayers',
        t: 'La luz que nace en el núcleo rebota y rebota dentro del Sol. Tarda <b>decenas de miles de años</b> en llegar a la superficie. Luego viaja a la Tierra en solo <b>8 minutos</b>.',
        fact: 'La luz que te toca hoy empezó su viaje dentro del Sol antes de que existieran las pirámides.' }
    ],
    quiz: [
      { q: '¿Qué es el Sol?', o: ['Un planeta', 'Una estrella', 'Un cometa'], a: 1, e: 'El Sol es una estrella, la más cercana a nosotros.' },
      { q: '¿Qué pasa en el centro del Sol?', o: ['El hidrógeno se convierte en helio', 'Se quema carbón', 'Hay hielo'], a: 0, e: 'Es fusión nuclear: hidrógeno + hidrógeno → helio + energía.' },
      { q: '¿Cuánto tarda la luz del Sol en llegar a la Tierra?', o: ['1 segundo', '8 minutos', '1 día'], a: 1, e: 'Unos 8 minutos y 20 segundos.' }
    ]
  },
  {
    id: 'estaciones', title: 'Las estaciones', sub: '¿Por qué hace frío o calor?', min: 4,
    orb: 'radial-gradient(circle at 35% 30%,#d8f3ff,#3ee6a0 30%,#2f7fe0 65%,#123a8a)',
    slides: [
      { h: 'La Tierra está inclinada', anim: 'seasons',
        controls: [{ type: 'range', key: 'mes', label: 'Mes', min: 1, max: 12, step: 1, value: 6, auto: true }],
        t: 'El eje de la Tierra está <b>inclinado 23.5°</b> y siempre apunta hacia el mismo lado. Por eso, en una parte del año el norte se inclina hacia el Sol (verano) y en otra se aleja (invierno).',
        fact: 'Cuando en México es verano, en Argentina es invierno.' },
      { h: 'Rayos directos vs. inclinados', anim: 'tiltlight',
        controls: [{ type: 'range', key: 'ang', label: 'Inclinación', min: 0, max: 65, step: 1, value: 0, auto: true }],
        t: 'Si la luz llega <b>derechita</b>, se concentra en un área pequeña y calienta más. Si llega <b>inclinada</b>, se reparte en un área grande y calienta menos. Como una linterna apuntando al suelo.',
        fact: 'En verano también hay más horas de luz: más tiempo para calentar.' },
      { h: 'No es por la distancia', anim: 'orbitdist',
        t: 'Mucha gente cree que en verano estamos más cerca del Sol. ¡No! La órbita es casi un círculo. De hecho, la Tierra está <b>más cerca del Sol en enero</b>, cuando en México es invierno.',
        fact: 'La diferencia es de solo 5 millones de km: 147 vs. 152 millones.' }
    ],
    quiz: [
      { q: '¿Qué causa las estaciones?', o: ['La distancia al Sol', 'La inclinación del eje de la Tierra', 'Las nubes'], a: 1, e: 'Es la inclinación de 23.5°, no la distancia.' },
      { q: 'La luz que llega inclinada...', o: ['Calienta más', 'Calienta menos', 'No cambia nada'], a: 1, e: 'Se reparte en un área más grande, así que cada pedazo recibe menos calor.' },
      { q: '¿En qué mes está la Tierra más cerca del Sol?', o: ['Enero', 'Junio', 'Agosto'], a: 0, e: 'A principios de enero, ¡en pleno invierno del norte!' }
    ]
  },
  {
    id: 'luna', title: 'La Luna', sub: 'Fases y eclipses', min: 4,
    orb: 'radial-gradient(circle at 35% 30%,#fff,#e8e6da 35%,#8f8c80 75%,#3a3830)',
    slides: [
      { h: 'Siempre la misma cara', anim: 'tidallock',
        t: 'La Luna está a unos <b>384,400 km</b> y tarda casi un mes en dar la vuelta a la Tierra. Gira sobre sí misma justo al mismo ritmo, por eso <b>siempre vemos la misma cara</b>.',
        fact: 'El "lado oscuro" de la Luna sí recibe luz del Sol; simplemente nunca lo vemos desde aquí.' },
      { h: '¿Por qué cambia de forma?', anim: 'moonphases',
        controls: [{ type: 'range', key: 'dia', label: 'Día', min: 0, max: 29.5, step: 0.5, value: 0, auto: true }],
        t: 'La Luna no brilla sola: <b>refleja la luz del Sol</b>. Siempre tiene una mitad iluminada, pero según dónde esté en su órbita, vemos más o menos de esa mitad. Esas son las <b>fases</b>.',
        fact: 'Un ciclo completo de fases dura unos 29.5 días.' },
      { h: 'Los eclipses', anim: 'eclipse',
        controls: [{ type: 'range', key: 'pos', label: 'Mueve la Luna', min: 0, max: 100, step: 1, value: 0, auto: true }],
        t: 'A veces la Luna pasa justo <b>entre el Sol y la Tierra</b> y tapa al Sol: es un eclipse solar. El Sol es 400 veces más grande que la Luna, pero también está 400 veces más lejos, ¡por eso encajan casi perfecto!',
        fact: 'Nunca veas el Sol directo, ni en un eclipse: se usan lentes especiales.' }
    ],
    quiz: [
      { q: '¿La Luna tiene luz propia?', o: ['Sí, brilla sola', 'No, refleja la luz del Sol', 'Solo en luna llena'], a: 1, e: 'La Luna refleja la luz del Sol.' },
      { q: '¿Por qué vemos siempre la misma cara de la Luna?', o: ['Porque no gira', 'Porque gira al mismo ritmo que da la vuelta a la Tierra', 'Porque la otra cara es transparente'], a: 1, e: 'Gira sobre sí misma en el mismo tiempo que tarda en darnos la vuelta.' },
      { q: 'En un eclipse solar...', o: ['La Tierra tapa a la Luna', 'La Luna tapa al Sol', 'El Sol se apaga'], a: 1, e: 'La Luna pasa entre el Sol y la Tierra y lo tapa.' }
    ]
  },
  {
    id: 'gravedad', title: 'La gravedad', sub: 'La fuerza que nos une', min: 4,
    orb: 'radial-gradient(circle at 35% 30%,#e9e0ff,#8b6cff 35%,#3fd0ff 75%,#13306e)',
    slides: [
      { h: 'Todo se atrae', anim: 'gravitywell',
        controls: [{ type: 'range', key: 'masa', label: 'Masa', min: 1, max: 10, step: 1, value: 5 }],
        t: 'La <b>gravedad</b> es la atracción entre todo lo que tiene masa. Einstein la explicó así: los objetos pesados <b>curvan el espacio</b>, como una pelota sobre un trampolín, y lo demás rueda hacia ellos.',
        fact: 'Tú también atraes a la Tierra, ¡pero muchísimo menos que ella a ti!' },
      { h: 'Orbitar es caer sin parar', anim: 'cannon',
        controls: [{ type: 'range', key: 'v', label: 'Velocidad', min: 3, max: 10, step: 0.5, value: 5 }],
        t: 'Mueve la velocidad. Lento, la bala cae. Si va <b>suficientemente rápido</b>, sigue cayendo... pero la Tierra se curva y nunca la alcanza: ¡eso es una <b>órbita</b>! Prueba con 7.',
        fact: 'La Estación Espacial va a unos 28,000 km/h y da la vuelta a la Tierra cada 90 minutos.' },
      { h: 'Tu peso en otros mundos', anim: 'jump', tap: true,
        t: 'Tu masa es la misma en todas partes, pero tu <b>peso</b> cambia según la gravedad. En la Luna saltarías muchísimo más alto; en Júpiter apenas podrías despegar del suelo.',
        fact: 'Si pesas 30 kg en la Tierra, en la Luna pesarías como 5 kg.' }
    ],
    quiz: [
      { q: '¿Qué es la gravedad?', o: ['La atracción entre cosas con masa', 'Un tipo de luz', 'El viento del espacio'], a: 0, e: 'Todo lo que tiene masa atrae a lo demás.' },
      { q: 'Algo en órbita está...', o: ['Flotando sin gravedad', 'Cayendo todo el tiempo, pero muy rápido de lado', 'Pegado a un hilo'], a: 1, e: 'Cae sin parar, pero avanza tan rápido que nunca toca el suelo.' },
      { q: '¿Dónde pesarías menos?', o: ['Júpiter', 'Tierra', 'Luna'], a: 2, e: 'La gravedad de la Luna es apenas 16% de la de la Tierra.' }
    ]
  },
  {
    id: 'estrellas', title: 'Vida de las estrellas', sub: 'Nacen, viven y mueren', min: 4,
    orb: 'radial-gradient(circle at 35% 30%,#fff,#8fb4ff 30%,#ff7ad9 65%,#3a1070)',
    slides: [
      { h: 'Colores de las estrellas', anim: 'starcolors',
        t: 'El color de una estrella dice qué tan caliente está. Las <b>rojas</b> son las más frías; las <b>azules</b>, las más calientes. Nuestro Sol es amarillo-blanco, en medio.',
        fact: 'Igual que la flama de una estufa: la parte azul es la más caliente.' },
      { h: 'La vida de una estrella como el Sol', anim: 'starlife', opts: { type: 'sol' },
        controls: [{ type: 'toggle', key: 'type', options: [['sol', 'Como el Sol'], ['masiva', 'Muy grande']] }],
        t: 'Las estrellas nacen en <b>nebulosas</b>, nubes de gas y polvo. Una estrella como el Sol brilla miles de millones de años, se vuelve <b>gigante roja</b>, suelta sus capas y queda una <b>enana blanca</b>.',
        fact: 'Al Sol le faltan unos 5,000 millones de años para volverse gigante roja.' },
      { h: 'Las grandes mueren explotando', anim: 'starlife', opts: { type: 'masiva' },
        controls: [{ type: 'toggle', key: 'type', options: [['sol', 'Como el Sol'], ['masiva', 'Muy grande']] }],
        t: 'Las estrellas mucho más grandes que el Sol viven menos y terminan en una explosión enorme: una <b>supernova</b>. Lo que queda puede ser una estrella de neutrones o un <b>agujero negro</b>.',
        fact: 'El hierro de tu sangre y el calcio de tus huesos se hicieron dentro de estrellas. ¡Eres polvo de estrellas!' }
    ],
    quiz: [
      { q: '¿Qué color tienen las estrellas más calientes?', o: ['Rojo', 'Azul', 'Amarillo'], a: 1, e: 'Las azules son las más calientes; las rojas, las más frías.' },
      { q: '¿Dónde nacen las estrellas?', o: ['En nebulosas', 'En los planetas', 'En los agujeros negros'], a: 0, e: 'Nacen en nubes de gas y polvo llamadas nebulosas.' },
      { q: '¿Cómo termina una estrella muy grande?', o: ['Como enana blanca tranquila', 'En una supernova', 'Se convierte en planeta'], a: 1, e: 'Explota como supernova y puede dejar un agujero negro.' }
    ]
  },
  {
    id: 'agujeros-negros', title: 'Agujeros negros', sub: 'Donde ni la luz escapa', min: 3,
    orb: 'radial-gradient(circle at 50% 50%,#000 38%,#ffb347 46%,#ff5e3a 58%,#2a0a3a 75%)',
    slides: [
      { h: '¿Qué es un agujero negro?', anim: 'blackhole',
        t: 'Es un lugar donde muchísima masa está apretada en un espacio pequeño. Su gravedad es tan fuerte que, si cruzas su borde, el <b>horizonte de eventos</b>, nada puede salir. Ni siquiera la luz.',
        fact: 'En el centro de nuestra galaxia hay uno con la masa de 4 millones de soles: Sagitario A*.' },
      { h: 'Dobla la luz', anim: 'raybend', tap: true,
        t: 'La luz que pasa cerca se <b>curva</b>, como una canica que pasa junto a un hoyo en el trampolín. Si pasa demasiado cerca, cae adentro y ya no sale.',
        fact: 'En 2019 se tomó la primera foto de la "sombra" de un agujero negro.' },
      { h: 'Espaguetización', anim: 'spaghetti',
        t: 'Si cayeras de pies, tus pies sentirían mucho más jalón que tu cabeza. Esa diferencia te <b>estiraría como un espagueti</b>. Por suerte, el agujero negro más cercano está lejísimos.',
        fact: 'El más cercano conocido está a unos 1,500 años luz. No hay peligro.' }
    ],
    quiz: [
      { q: '¿Qué no puede escapar de un agujero negro?', o: ['Solo las naves', 'Nada, ni siquiera la luz', 'Solo los planetas'], a: 1, e: 'Pasando el horizonte de eventos, nada sale, ni la luz.' },
      { q: '¿Cómo se llama el borde de un agujero negro?', o: ['Horizonte de eventos', 'Cinturón de Kuiper', 'Corona'], a: 0, e: 'Es el horizonte de eventos: el punto sin regreso.' },
      { q: '¿Qué le pasa a la luz que pasa cerca?', o: ['Se vuelve azul', 'Se curva', 'Se detiene'], a: 1, e: 'La gravedad curva el camino de la luz.' }
    ]
  },
  {
    id: 'galaxias', title: 'Las galaxias', sub: 'Ciudades de estrellas', min: 3,
    orb: 'radial-gradient(circle at 50% 50%,#fff3c8,#c7b8ff 25%,#5b4bd0 55%,#0c0830 80%)',
    slides: [
      { h: 'Nuestra casa: la Vía Láctea', anim: 'galaxy',
        t: 'Una galaxia es una enorme familia de estrellas, gas y polvo unida por la gravedad. La nuestra es la <b>Vía Láctea</b>: tiene entre <b>100,000 y 400,000 millones de estrellas</b> y forma de espiral.',
        fact: 'El Sol tarda unos 230 millones de años en darle una vuelta a la galaxia.' },
      { h: 'Formas de galaxias', anim: 'galaxytypes',
        t: 'Hay galaxias <b>espirales</b> con brazos, como la nuestra; <b>elípticas</b>, como balones de estrellas viejas; e <b>irregulares</b>, sin forma definida. Hay cientos de miles de millones de galaxias.',
        fact: 'Desde un lugar muy oscuro, puedes ver la Vía Láctea como una franja blanca en el cielo.' },
      { h: 'Cuando las galaxias chocan', anim: 'collision',
        t: 'La galaxia <b>Andrómeda</b> se acerca a nosotros. En miles de millones de años podrían juntarse en una sola galaxia. Las estrellas casi no chocan: hay muchísimo espacio entre ellas.',
        fact: 'Los científicos todavía estudian si el choque pasará; no es seguro.' }
    ],
    quiz: [
      { q: '¿Cómo se llama nuestra galaxia?', o: ['Andrómeda', 'Vía Láctea', 'Orión'], a: 1, e: 'Vivimos en la Vía Láctea, una galaxia espiral.' },
      { q: '¿Qué forma tiene la Vía Láctea?', o: ['Espiral', 'Elíptica', 'Cuadrada'], a: 0, e: 'Es espiral, con brazos que giran alrededor del centro.' },
      { q: 'Si dos galaxias se juntan, ¿qué pasa con las estrellas?', o: ['Todas chocan', 'Casi no chocan, hay mucho espacio', 'Se apagan'], a: 1, e: 'El espacio entre estrellas es tan grande que casi nunca chocan.' }
    ]
  },
  {
    id: 'luz', title: 'La luz y las distancias', sub: 'Mirar lejos es mirar al pasado', min: 4,
    orb: 'radial-gradient(circle at 35% 30%,#fff,#fff1a8 30%,#3fd0ff 65%,#0b2a6e)',
    slides: [
      { h: 'Lo más rápido que existe', anim: 'lightspeed',
        t: 'La luz viaja a unos <b>300,000 km por segundo</b>. ¡En un solo segundo podría darle <b>7.5 vueltas</b> a la Tierra! Nada puede ir más rápido que la luz.',
        fact: 'En una milésima de segundo la luz recorre 300 km; un avión tarda unos 20 minutos.' },
      { h: 'Del Sol a tus ojos', anim: 'lighttravel',
        controls: [{ type: 'toggle', key: 'dest', options: [['luna', 'Luna'], ['sol', 'Sol'], ['marte', 'Marte'], ['neptuno', 'Neptuno']] }], opts: { dest: 'sol' },
        t: 'Aun así, el universo es tan grande que la luz tarda. Del Sol a la Tierra hay 150 millones de km: la luz tarda <b>8 minutos y 20 segundos</b>. Elige otros destinos para comparar.',
        fact: 'La distancia que la luz recorre en un año se llama <b>año luz</b>: unos 9.5 billones de km.' },
      { h: 'Ver el pasado', anim: 'lookback',
        t: 'Como la luz tarda en llegar, siempre vemos las cosas <b>como eran antes</b>. Ves la Luna como era hace 1 segundo y a la galaxia Andrómeda como era hace <b>2.5 millones de años</b>.',
        fact: 'Los telescopios más potentes ven galaxias como eran hace más de 13,000 millones de años.' }
    ],
    quiz: [
      { q: '¿Qué tan rápido va la luz?', o: ['300 km/h', '300,000 km por segundo', 'Igual que el sonido'], a: 1, e: 'Unos 300,000 km cada segundo.' },
      { q: '¿Qué es un año luz?', o: ['Un año con mucho sol', 'La distancia que recorre la luz en un año', 'El tiempo que dura una estrella'], a: 1, e: 'Es una distancia, no un tiempo: unos 9.5 billones de km.' },
      { q: 'Cuando ves una estrella lejana, la ves...', o: ['Como es ahorita', 'Como era en el pasado', 'Como será en el futuro'], a: 1, e: 'Su luz tardó en llegar, así que la ves como era antes.' }
    ]
  },
  /* ---------- Nivel 2 ---------- */
  {
    id: 'marte', title: 'Marte', sub: 'El planeta rojo', min: 4,
    orb: 'radial-gradient(circle at 35% 30%,#ffd0b0,#e0603c 40%,#8a2a10 80%)',
    slides: [
      { h: 'Un desierto rojo', anim: 'mars',
        controls: [{ type: 'toggle', key: 'vista', options: [['normal', 'Normal'], ['tormenta', 'Tormenta']] }], opts: { vista: 'normal' },
        t: 'Marte es rojo porque su suelo tiene <b>óxido de hierro</b>: está oxidado. Es frío, seco y tiene hielo en los polos. A veces hay <b>tormentas de polvo</b> que cubren todo el planeta. Pruébalo.',
        fact: 'Marte tiene dos lunas pequeñitas con forma de papa: Fobos y Deimos.' },
      { h: 'El volcán más alto', anim: 'olympus',
        t: 'En Marte está el <b>Monte Olimpo</b>, el volcán más alto del Sistema Solar: mide casi <b>22 km</b> de alto, ¡más del doble que el Everest! Su base es más grande que todo el estado de Nuevo León.',
        fact: 'Es tan ancho (unos 600 km) que si estuvieras arriba no verías la orilla.' },
      { h: 'Robots exploradores', anim: 'rover',
        controls: [{ type: 'range', key: 'dist', label: 'Distancia', min: 55, max: 400, step: 5, value: 225 }],
        t: 'En Marte hay robots con ruedas llamados <b>rovers</b>, como Perseverance. Los mensajes por radio tardan <b>de 3 a 22 minutos</b> en llegar, según qué tan lejos esté Marte. Mueve la distancia.',
        fact: 'Perseverance llevó un pequeño helicóptero, Ingenuity: la primera máquina que voló en otro planeta.' }
    ],
    quiz: [
      { q: '¿Por qué Marte es rojo?', o: ['Porque está muy caliente', 'Porque su suelo está oxidado', 'Porque refleja al Sol rojo'], a: 1, e: 'Tiene mucho óxido de hierro, como un clavo oxidado.' },
      { q: '¿Qué es el Monte Olimpo?', o: ['El volcán más alto del Sistema Solar', 'Una luna de Marte', 'Un rover'], a: 0, e: 'Mide casi 22 km de alto.' },
      { q: '¿Por qué los rovers manejan casi solos?', o: ['Porque nadie los quiere manejar', 'Porque los mensajes tardan minutos en llegar', 'Porque no tienen radio'], a: 1, e: 'Con minutos de retraso no se pueden manejar en vivo.' }
    ]
  },
  {
    id: 'gigantes', title: 'Júpiter y Saturno', sub: 'Los gigantes de gas', min: 4,
    orb: 'linear-gradient(180deg,#a88a6e,#e8d4b0 25%,#b9805a 45%,#f1e3c6 60%,#d9a774 80%,#9c7f66)',
    slides: [
      { h: 'Júpiter, el rey', anim: 'jupiter',
        controls: [{ type: 'toggle', key: 'ver', options: [['no', 'Júpiter'], ['si', 'Comparar con la Tierra']] }], opts: { ver: 'no' },
        t: 'Júpiter es una bola enorme de gas con franjas de nubes. Gira tan rápido que su día dura <b>10 horas</b>. Su <b>Gran Mancha Roja</b> es una tormenta más grande que la Tierra que lleva siglos girando.',
        fact: 'Júpiter tiene más de 90 lunas. Una de ellas, Europa, tiene un océano bajo el hielo.' },
      { h: 'Los anillos de Saturno', anim: 'saturn',
        controls: [{ type: 'range', key: 'incl', label: 'Inclinación', min: 0, max: 27, step: 1, value: 20, auto: true }],
        t: 'Los anillos de Saturno están hechos de <b>pedazos de hielo y roca</b>, desde granitos hasta casas. Miden casi 270,000 km de lado a lado, pero son <b>delgadísimos</b>. Pon la inclinación en 0.',
        fact: 'Saturno tiene más de 270 lunas conocidas, más que ningún otro planeta.' },
      { h: 'Saturno flotaría', anim: 'bathtub',
        controls: [{ type: 'toggle', key: 'pl', options: [['saturno', 'Saturno'], ['jupiter', 'Júpiter'], ['tierra', 'Tierra']] }], opts: { pl: 'saturno' },
        t: 'Saturno es tan ligero para su tamaño (<b>menos denso que el agua</b>) que en una tina gigante ¡flotaría! Prueba con Júpiter y con la Tierra.',
        fact: 'Claro, necesitarías una tina más grande que Saturno... y no existe.' }
    ],
    quiz: [
      { q: '¿Qué es la Gran Mancha Roja?', o: ['Un volcán', 'Una tormenta gigante', 'Un lago de lava'], a: 1, e: 'Es una tormenta más grande que la Tierra.' },
      { q: '¿De qué están hechos los anillos de Saturno?', o: ['De hielo y roca', 'De gas', 'De metal sólido'], a: 0, e: 'Millones de pedazos de hielo y roca.' },
      { q: '¿Qué planeta flotaría en el agua?', o: ['La Tierra', 'Júpiter', 'Saturno'], a: 2, e: 'Saturno es menos denso que el agua.' }
    ]
  },
  {
    id: 'cometas', title: 'Cometas y meteoros', sub: 'Viajeros del Sistema Solar', min: 4,
    orb: 'radial-gradient(circle at 70% 30%,#fff,#bfe6ff 20%,#3f6bff 55%,#0b1440)',
    slides: [
      { h: 'Bolas de nieve sucia', anim: 'comet',
        t: 'Los <b>cometas</b> son bolas de hielo, polvo y roca. Cuando se acercan al Sol, el hielo se evapora y forma una <b>cola</b> que siempre apunta <b>lejos del Sol</b>, aunque el cometa vaya de regreso.',
        fact: 'El cometa Halley pasa cada 76 años. Volverá en 2061.' },
      { h: 'Estrellas fugaces', anim: 'meteor', tap: true,
        t: 'Una "estrella fugaz" no es una estrella: es una <b>piedrita del espacio</b>, muchas veces del tamaño de un grano de arena, que entra muy rápido al aire y se quema. Toca el cielo para lanzar una.',
        fact: 'En agosto hay lluvia de estrellas (las Perseidas): la Tierra cruza el polvo que dejó un cometa.' },
      { h: 'Cuando caen rocas grandes', anim: 'crater',
        controls: [{ type: 'range', key: 'roca', label: 'Tamaño', min: 1, max: 10, step: 1, value: 4 }],
        t: 'Si una roca grande (un <b>asteroide</b>) llega al suelo, hace un <b>cráter</b> unas 20 veces más grande que ella. Cambia el tamaño de la roca y mira el cráter.',
        fact: 'Hace 66 millones de años, una roca de unos 10 km cayó en Yucatán, México: el cráter de Chicxulub. ¡Ayudó a acabar con los dinosaurios!' }
    ],
    quiz: [
      { q: '¿Hacia dónde apunta la cola de un cometa?', o: ['Hacia el Sol', 'Lejos del Sol', 'Hacia la Tierra'], a: 1, e: 'El viento y la luz del Sol la empujan hacia afuera.' },
      { q: '¿Qué es una estrella fugaz?', o: ['Una estrella que se cae', 'Una piedrita que se quema en el aire', 'Un avión'], a: 1, e: 'Es un meteoro: una piedrita que se quema al entrar al aire.' },
      { q: '¿Dónde está el cráter de Chicxulub?', o: ['En la Luna', 'En Marte', 'En Yucatán, México'], a: 2, e: 'Está en la península de Yucatán.' }
    ]
  },
  {
    id: 'constelaciones', title: 'Constelaciones', sub: 'Dibujos en el cielo', min: 3,
    orb: 'radial-gradient(circle at 50% 50%,#2a3b8f,#0c1240 70%)',
    slides: [
      { h: 'Unir los puntos', anim: 'orion',
        controls: [{ type: 'toggle', key: 'ver2', options: [['puntos', 'Solo estrellas'], ['unir', 'Unir puntos']] }], opts: { ver2: 'unir' },
        t: 'Desde hace miles de años, la gente une las estrellas con líneas imaginarias para hacer dibujos: las <b>constelaciones</b>. Hay <b>88 oficiales</b>. Esta es <b>Orión</b>, el cazador.',
        fact: 'Las tres estrellas del cinturón de Orión en México se llaman las Tres Marías.' },
      { h: 'No están juntas', anim: 'depth',
        controls: [{ type: 'range', key: 'giro', label: 'Gira la vista', min: 0, max: 90, step: 1, value: 0, auto: true }],
        t: 'Las estrellas de una constelación parecen juntas, pero están a <b>distancias muy distintas</b>. Gira la vista: si las vieras de lado, el dibujo de Orión desaparecería.',
        fact: '"a.l." significa años luz. Betelgeuse está a unos 550 y Alnilam a unos 2,000.' },
      { h: 'El cielo da vueltas', anim: 'startrails',
        controls: [{ type: 'range', key: 'horas', label: 'Horas', min: 0, max: 12, step: 1, value: 0, auto: true }],
        t: 'Como la Tierra gira, las estrellas parecen moverse en círculos alrededor de la <b>Estrella Polar</b>, que casi no se mueve. Una foto de varias horas muestra estos círculos.',
        fact: 'La Estrella Polar marca el norte: los viajeros la usaban para no perderse.' }
    ],
    quiz: [
      { q: '¿Qué es una constelación?', o: ['Un grupo de planetas', 'Un dibujo imaginario hecho con estrellas', 'Una galaxia'], a: 1, e: 'Son figuras que la gente imaginó uniendo estrellas.' },
      { q: 'Las estrellas de Orión...', o: ['Están todas a la misma distancia', 'Están a distancias muy distintas', 'Se tocan entre sí'], a: 1, e: 'Solo parecen juntas desde la Tierra.' },
      { q: '¿Qué estrella casi no se mueve en el cielo?', o: ['El Sol', 'La Estrella Polar', 'Betelgeuse'], a: 1, e: 'Está casi encima del eje de la Tierra.' }
    ]
  },
  {
    id: 'dia-noche', title: 'Día, noche y mareas', sub: 'La Tierra gira', min: 4,
    orb: 'linear-gradient(90deg,#ffd166 0%,#3a8ff0 50%,#0b1a4a 51%,#060a20 100%)',
    slides: [
      { h: '¿Por qué hay día y noche?', anim: 'daynight',
        controls: [{ type: 'range', key: 'hora', label: 'Hora', min: 0, max: 24, step: 0.5, value: 12, auto: true }],
        t: 'La Tierra <b>gira sobre sí misma</b> una vez cada 24 horas. La mitad que mira al Sol tiene día; la otra mitad, noche. Mueve la hora y sigue a México.',
        fact: 'En el ecuador, el suelo gira a unos 1,670 km/h. ¡Y no lo sentimos!' },
      { h: 'El camino del Sol', anim: 'sunpath',
        controls: [{ type: 'toggle', key: 'est', options: [['verano', 'Verano'], ['invierno', 'Invierno']] }], opts: { est: 'verano' },
        t: 'El Sol sale por el <b>este</b> y se mete por el <b>oeste</b>. En verano sube muy alto y el día es largo; en invierno va bajito y el día es corto. Mira también la sombra.',
        fact: 'En Monterrey, el día más largo del año dura unas 13.5 horas y el más corto, unas 10.5.' },
      { h: 'Las mareas', anim: 'tides',
        controls: [{ type: 'range', key: 'hora2', label: 'Hora', min: 0, max: 24, step: 0.5, value: 0, auto: true }],
        t: 'La gravedad de la <b>Luna jala los océanos</b> y forma dos "bultos" de agua. Mientras la Tierra gira, una playa pasa por ellos: <b>marea alta</b>. Por eso hay dos mareas altas al día.',
        fact: 'El Sol también ayuda: cuando Sol y Luna se alinean, las mareas son más grandes.' }
    ],
    quiz: [
      { q: '¿Por qué hay día y noche?', o: ['Porque el Sol se apaga', 'Porque la Tierra gira', 'Porque la Luna tapa al Sol'], a: 1, e: 'La Tierra gira y vamos pasando del lado iluminado al oscuro.' },
      { q: '¿Por dónde sale el Sol?', o: ['Por el este', 'Por el oeste', 'Por el norte'], a: 0, e: 'Sale por el este y se mete por el oeste.' },
      { q: '¿Qué causa principalmente las mareas?', o: ['El viento', 'La gravedad de la Luna', 'Los peces'], a: 1, e: 'La Luna jala el agua de los océanos.' }
    ]
  },
  {
    id: 'exoplanetas', title: 'Exoplanetas', sub: 'Mundos de otras estrellas', min: 4,
    orb: 'radial-gradient(circle at 35% 30%,#d8fff0,#3ee6a0 35%,#0e6b6b 80%)',
    slides: [
      { h: 'Sombras diminutas', anim: 'transit',
        controls: [{ type: 'range', key: 'tam', label: 'Tamaño del planeta', min: 1, max: 10, step: 1, value: 4 }],
        t: 'Los <b>exoplanetas</b> giran alrededor de otras estrellas. Casi no se ven, pero cuando pasan frente a su estrella, <b>la tapan un poquito</b> y su brillo baja. Cambia el tamaño del planeta.',
        fact: 'Ya se conocen más de 6,000 exoplanetas.' },
      { h: 'Ni muy cerca ni muy lejos', anim: 'habitable',
        controls: [{ type: 'toggle', key: 'estrella', options: [['roja', 'Roja'], ['amarilla', 'Amarilla'], ['azul', 'Azul']] }, { type: 'range', key: 'dist', label: 'Distancia', min: 8, max: 98, step: 1, value: 25 }], opts: { estrella: 'amarilla' },
        t: 'La <b>zona habitable</b> es la distancia donde no hace ni mucho calor ni mucho frío y puede haber <b>agua líquida</b>. Cambia la estrella y mueve el planeta hasta que quede justo bien.',
        fact: 'Las estrellas rojas son más frías, así que su zona habitable está más cerca.' },
      { h: 'La estrella que baila', anim: 'wobble',
        t: 'Un planeta también jala a su estrella y la hace <b>bailar</b> un poquito. Cuando la estrella se acerca, su luz se ve más azul; cuando se aleja, más roja. Así encontramos planetas que no vemos.',
        fact: 'El primer planeta de una estrella como el Sol se encontró así en 1995.' }
    ],
    quiz: [
      { q: '¿Qué es un exoplaneta?', o: ['Un planeta de otra estrella', 'Un planeta sin luna', 'Una estrella pequeña'], a: 0, e: 'Es un planeta que gira alrededor de otra estrella.' },
      { q: '¿Qué pasa cuando un planeta pasa frente a su estrella?', o: ['La estrella brilla más', 'El brillo baja un poquito', 'La estrella explota'], a: 1, e: 'El planeta tapa un poco de la luz.' },
      { q: '¿Qué tiene de especial la zona habitable?', o: ['Puede haber agua líquida', 'Siempre hay vida', 'No hay gravedad'], a: 0, e: 'Ahí la temperatura permite agua líquida.' }
    ]
  },
  {
    id: 'luz-invisible', title: 'La luz invisible', sub: 'Telescopios y colores ocultos', min: 4,
    orb: 'conic-gradient(from 0deg,#ff4a4a,#ffa64d,#fff15a,#3ee6a0,#3fd0ff,#3f6bff,#9a5bff,#ff4a4a)',
    slides: [
      { h: 'Más colores de los que ves', anim: 'spectrum',
        controls: [{ type: 'range', key: 'onda', label: 'Tipo de luz', min: 0, max: 6, step: 1, value: 3, auto: true }],
        t: 'La luz viaja en <b>ondas</b>. Tus ojos solo ven una parte: la luz visible. Hay luz con ondas más largas (radio, infrarrojo) y más cortas (ultravioleta, rayos X). Mueve la barra.',
        fact: 'Las serpientes pueden "ver" el infrarrojo: sienten el calor de otros animales.' },
      { h: 'Ojos gigantes', anim: 'telescope',
        controls: [{ type: 'range', key: 'ap', label: 'Tamaño', min: 1, max: 10, step: 1, value: 2 }],
        t: 'Un telescopio es como un <b>ojo gigante</b>: su lente o espejo atrapa mucha más luz que tu pupila. Por eso ve cosas muy lejanas y débiles. Hazlo más grande.',
        fact: 'El espejo del telescopio James Webb mide 6.5 m: junta casi un millón de veces más luz que tu ojo.' },
      { h: 'Ver a través del polvo', anim: 'infrared',
        controls: [{ type: 'toggle', key: 'vista2', options: [['visible', 'Luz visible'], ['infrarrojo', 'Infrarrojo']] }], opts: { vista2: 'visible' },
        t: 'Las estrellas nacen escondidas en nubes de polvo. La luz visible no las atraviesa, pero el <b>infrarrojo sí</b>. Cambia la vista y descubre las estrellas bebé.',
        fact: 'Por eso el James Webb ve en infrarrojo: puede ver dentro de las nubes y galaxias muy lejanas.' }
    ],
    quiz: [
      { q: '¿Qué tipo de luz ven tus ojos?', o: ['Rayos X', 'Luz visible', 'Ondas de radio'], a: 1, e: 'Solo vemos una parte pequeña: la luz visible.' },
      { q: '¿Para qué sirve un espejo grande en un telescopio?', o: ['Para verse bonito', 'Para juntar más luz', 'Para hacerlo más ligero'], a: 1, e: 'Más grande = más luz = ves cosas más débiles.' },
      { q: '¿Qué luz atraviesa el polvo del espacio?', o: ['La infrarroja', 'La visible', 'Ninguna'], a: 0, e: 'El infrarrojo atraviesa el polvo.' }
    ]
  },
  {
    id: 'cohetes', title: 'Cohetes y satélites', sub: 'Cómo llegamos al espacio', min: 4,
    orb: 'radial-gradient(circle at 50% 70%,#fff6c8,#ffb347 25%,#ff5e7a 50%,#2a1060 85%)',
    slides: [
      { h: 'Acción y reacción', anim: 'rocket',
        controls: [{ type: 'range', key: 'emp', label: 'Empuje', min: 0, max: 10, step: 1, value: 3 }],
        t: 'Un cohete echa gas muy caliente <b>hacia abajo</b>, y el gas lo empuja <b>hacia arriba</b>: acción y reacción. Si el empuje es mayor que su peso, ¡despega! Sube el empuje.',
        fact: 'Es como un globo que sueltas sin amarrar: el aire sale para un lado y el globo sale para el otro.' },
      { h: 'Por partes', anim: 'stages',
        t: 'Los cohetes tienen <b>etapas</b>. Cuando una se queda sin combustible, se suelta. Así el cohete pesa menos y puede ir más rápido. Para quedar en órbita hay que ir a unos <b>28,000 km/h</b>.',
        fact: 'Algunos cohetes modernos regresan su primera etapa y aterrizan parados para volver a usarla.' },
      { h: 'Satélites', anim: 'satorbits',
        controls: [{ type: 'toggle', key: 'orb', options: [['baja', 'Estación'], ['gps', 'GPS'], ['geo', 'Fijo']] }], opts: { orb: 'baja' },
        t: 'Los <b>satélites</b> giran alrededor de la Tierra. Los bajos dan vueltas rápido; los altos, más lento. A 36,000 km, un satélite da la vuelta en 24 horas y <b>se queda fijo</b> sobre un lugar.',
        fact: 'El GPS de tu celular usa varios satélites a la vez para saber dónde estás.' }
    ],
    quiz: [
      { q: '¿Cómo sube un cohete?', o: ['Flota como globo', 'Echa gas hacia abajo y el gas lo empuja hacia arriba', 'Lo jala la Luna'], a: 1, e: 'Acción y reacción.' },
      { q: '¿Por qué los cohetes sueltan etapas?', o: ['Para pesar menos', 'Por accidente', 'Para frenar'], a: 0, e: 'Menos peso = más velocidad con el mismo combustible.' },
      { q: 'Un satélite que se queda fijo sobre un lugar está a...', o: ['400 km', '36,000 km', '1 km'], a: 1, e: 'A unos 36,000 km da una vuelta cada 24 horas, igual que la Tierra.' }
    ]
  },
  {
    id: 'materia-oscura', title: 'Lo invisible', sub: 'Materia y energía oscuras', min: 4,
    orb: 'radial-gradient(circle at 50% 50%,#000 30%,#4a2a9a 55%,#8b6cff 70%,#140a30 90%)',
    slides: [
      { h: 'Galaxias que giran raro', anim: 'rotcurve',
        controls: [{ type: 'toggle', key: 'modo', options: [['esperado', 'Lo esperado'], ['real', 'Lo medido']] }], opts: { modo: 'esperado' },
        t: 'Las estrellas de las orillas de una galaxia deberían ir más lento. Pero van <b>igual de rápido</b>. Algo invisible con mucha gravedad las jala: la <b>materia oscura</b>.',
        fact: 'La astrónoma Vera Rubin midió esto en los años 70.' },
      { h: 'Lentes de gravedad', anim: 'lensing',
        controls: [{ type: 'range', key: 'masa2', label: 'Masa invisible', min: 0, max: 10, step: 1, value: 5 }],
        t: 'La materia oscura no se ve, pero su gravedad <b>dobla la luz</b> de galaxias más lejanas y las convierte en <b>arcos y anillos</b>. Así sabemos dónde está. Cambia la masa.',
        fact: 'Cuando la alineación es perfecta se forma un círculo completo: un anillo de Einstein.' },
      { h: '¿De qué está hecho el universo?', anim: 'pie',
        controls: [{ type: 'toggle', key: 'parte', options: [['normal', 'Normal'], ['oscura', 'M. oscura'], ['energia', 'E. oscura']] }], opts: { parte: 'normal' },
        t: 'Todo lo que vemos (estrellas, planetas, tú) es solo el <b>5%</b>. Un <b>27%</b> es materia oscura y un <b>68%</b> es <b>energía oscura</b>, que hace que el universo crezca cada vez más rápido.',
        fact: 'Nadie sabe todavía qué son. ¡Es uno de los grandes misterios de la ciencia!' }
    ],
    quiz: [
      { q: '¿Cómo sabemos que existe la materia oscura?', o: ['La vemos brillar', 'Por su gravedad', 'Huele raro'], a: 1, e: 'No se ve, pero su gravedad mueve estrellas y dobla la luz.' },
      { q: '¿Qué parte del universo es materia normal?', o: ['Casi todo', 'La mitad', 'Solo el 5%'], a: 2, e: 'Lo que vemos es apenas el 5%.' },
      { q: '¿Qué hace la energía oscura?', o: ['Hace que el universo crezca más rápido', 'Apaga estrellas', 'Hace los agujeros negros'], a: 0, e: 'Acelera la expansión del universo.' }
    ]
  },
  {
    id: 'escala', title: '¿Qué tan grande es?', sub: 'El tamaño del universo', min: 4,
    orb: 'radial-gradient(circle at 50% 50%,#fff 2%,#ff7ad9 8%,#5b4bd0 30%,#1a1050 60%,#ff9a6a 62%,#0a0620 66%)',
    slides: [
      { h: 'Un viaje alejándonos', anim: 'zoom',
        controls: [{ type: 'range', key: 'nivel', label: 'Alejarse', min: 0, max: 6, step: 0.02, value: 0, auto: true }],
        t: 'Empieza en la Tierra y aléjate: el Sistema Solar, las estrellas vecinas, nuestra galaxia, grupos de galaxias... Cada paso es <b>muchísimo más grande</b> que el anterior.',
        fact: 'Las galaxias forman una red gigante, como una telaraña cósmica.' },
      { h: 'Si el Sol fuera una pelota', anim: 'scaleball',
        controls: [{ type: 'toggle', key: 'obj', options: [['tierra', 'Tierra'], ['jupiter', 'Júpiter'], ['neptuno', 'Neptuno'], ['proxima', 'Estrella']] }], opts: { obj: 'tierra' },
        t: 'Imagina el Sol como una <b>pelota de 10 cm</b>. La Tierra sería un granito de pimienta a 11 metros. Y la estrella más cercana estaría... ¡a casi 3,000 km! Compara.',
        fact: 'El espacio está casi totalmente vacío.' },
      { h: 'Hasta dónde podemos ver', anim: 'horizon',
        t: 'Solo vemos la parte del universo cuya luz ha tenido tiempo de llegarnos: el <b>universo observable</b>. Mide unos <b>93,000 millones de años luz</b> de lado a lado. Más allá hay más.',
        fact: 'Nadie sabe si el universo completo tiene fin o es infinito.' }
    ],
    quiz: [
      { q: '¿Qué es más grande?', o: ['La Vía Láctea', 'El Sistema Solar', 'El Grupo Local de galaxias'], a: 2, e: 'El Grupo Local contiene a la Vía Láctea, que contiene al Sistema Solar.' },
      { q: 'Si el Sol fuera una pelota de 10 cm, la Tierra sería...', o: ['Un balón de fútbol', 'Un grano de pimienta', 'Una sandía'], a: 1, e: 'Un granito de menos de 1 mm, a unos 11 metros.' },
      { q: '¿Qué es el universo observable?', o: ['Todo lo que existe', 'La parte cuya luz ya nos llegó', 'Solo nuestra galaxia'], a: 1, e: 'Es lo que podemos ver porque su luz ya alcanzó a llegar.' }
    ]
  }
];
