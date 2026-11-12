/* Contenido de las 10 lecciones. Cada lección: 3–4 diapositivas + 3 preguntas. */
const LESSONS = [
  {
    id: 'big-bang', title: 'El Big Bang', sub: 'Cómo empezó todo', min: 4,
    orb: 'radial-gradient(circle at 35% 30%,#fff,#ffd166 30%,#ff5ea8 65%,#5b2bbf)',
    slides: [
      { h: 'Todo empezó muy pequeño', anim: 'bang',
        t: 'Hace unos <b>13,800 millones de años</b>, todo el universo estaba apretado en un punto muy pequeño, caliente y denso. De pronto empezó a crecer muy rápido. A eso le llamamos <b>Big Bang</b>.',
        fact: 'No fue una explosión <i>dentro</i> del espacio: fue el espacio mismo el que empezó a estirarse.' },
      { h: 'El universo se infla como un globo', anim: 'balloon',
        t: 'Imagina puntos pintados en un globo. Al inflarlo, <b>todos los puntos se alejan entre sí</b>. Así pasa con las galaxias: no es que corran, es que el espacio entre ellas crece.',
        fact: 'El universo sigue creciendo hoy, ¡y cada vez más rápido!' },
      { h: 'De luz a estrellas', anim: 'timeline',
        t: 'Al crecer, el universo se enfrió. Primero se formaron átomos, luego la primera luz libre. Unos <b>200 millones de años</b> después nacieron las primeras estrellas. Nuestro Sol llegó mucho después.',
        fact: 'Si toda la historia del universo fuera un año, el Sol nacería a principios de septiembre.' },
      { h: '¿Cómo lo sabemos?', anim: 'redshift',
        t: 'Las galaxias lejanas se alejan de nosotros, y por eso su luz nos llega <b>estirada y más roja</b>. Además, todavía vemos un brillo muy débil que viene de todas partes: el "eco" del Big Bang.',
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
        t: 'El eje de la Tierra está <b>inclinado 23.5°</b> y siempre apunta hacia el mismo lado. Por eso, en una parte del año el norte se inclina hacia el Sol (verano) y en otra se aleja (invierno).',
        fact: 'Cuando en México es verano, en Argentina es invierno.' },
      { h: 'Rayos directos vs. inclinados', anim: 'tiltlight',
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
        t: 'La Luna no brilla sola: <b>refleja la luz del Sol</b>. Siempre tiene una mitad iluminada, pero según dónde esté en su órbita, vemos más o menos de esa mitad. Esas son las <b>fases</b>.',
        fact: 'Un ciclo completo de fases dura unos 29.5 días.' },
      { h: 'Los eclipses', anim: 'eclipse',
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
        t: 'La <b>gravedad</b> es la atracción entre todo lo que tiene masa. Einstein la explicó así: los objetos pesados <b>curvan el espacio</b>, como una pelota sobre un trampolín, y lo demás rueda hacia ellos.',
        fact: 'Tú también atraes a la Tierra, ¡pero muchísimo menos que ella a ti!' },
      { h: 'Orbitar es caer sin parar', anim: 'cannon',
        controls: [{ type: 'range', key: 'v', label: 'Velocidad', min: 3, max: 10, step: 0.5, value: 5 }],
        t: 'Mueve la velocidad. Lento, la bala cae. Si va <b>suficientemente rápido</b>, sigue cayendo... pero la Tierra se curva y nunca la alcanza: ¡eso es una <b>órbita</b>! Prueba con 7.',
        fact: 'La Estación Espacial va a unos 28,000 km/h y da la vuelta a la Tierra cada 90 minutos.' },
      { h: 'Tu peso en otros mundos', anim: 'jump',
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
      { h: 'Dobla la luz', anim: 'raybend',
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
        t: 'Aun así, el universo es tan grande que la luz tarda. Del Sol a la Tierra hay 150 millones de km: la luz tarda <b>8 minutos y 20 segundos</b>.',
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
  }
];
