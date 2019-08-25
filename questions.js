module.exports = [
  {
    // 0
    text:
      "<break time='300ms'/>Una puerta esta un tu camino,  <break time='300ms'/>esta tiene una resistencia de ${x}. <emphasis level='reduced'>Tu hechizo, Bola de Fuego,</emphasis> puede hacer ${y} de daño con cada uso. <break time='500ms'/>¿Cuántas veces necesitas disparar a la puerta para destruirla y <emphasis level='reduced'>continuar con tu aventura?</emphasis>",
    correct:
      'La puerta se rompe y <emphasis level = "reduced">continuas con tu aventura</emphasis>',
    wrong:
      'Has calculado erróneamente, lo que ocasiona que uses magia de más para pasar la puerta. <break time = "300ms"/>Pierdes un poco de tu vida.',
    type: "DIRECTA"
  },
  {
    // 1
    text:
      '<break time="1000ms"/>Encuentras otra puerta, tiene una resistencia de ${x}. Tu otro hechizo, Bola de Nieve, puede hacer ' +
      "${y} de daño con cada uso. ¿Cuántas veces necesitas disparar a la puerta para destruirla y continuar?",
    correct: "La puerta se rompe y continuas con tu aventura",
    wrong:
      "Has calculado erróneamente lo que ocasiona que uses magia de más para pasar la puerta. Pierdes un poco de tu vida",
    type: "DIRECTA"
  },
  {
    // 2
    text:
      '<break time="1000ms"/><emphasis level = "reduced">Un temible esqueleto te ha lanzado un hechizo de debilidad</emphasis>, ahora tus hechizos de ataque hacen tres cuartos de daño. Tu ataque, Trueno Voraz normalmente hace ${x} de daño. Serás capaz de vencer a tu enemigo con ${y} de vida en este ataque?',
    correct: [
      'Has calculado tu magia bien, <emphasis level = "reduced">destruyes a tu enemigo</emphasis>',
      'Has calculado tu magia bien,<break time = "300ms"/> utilizas una de tus pociones de fuerza y <emphasis level = "reduced">destruyes a tu enemigo con tu hechizo</emphasis>'
    ],
    wrong: [
      'Corres de tu enemigo pero el hechizo de debilidad te quita un poco de vida,<break time = "300ms"/> pudiste destruir a tu enemigo con trueno voraz.',
      'Tu hechizo no es suficiente así que huyes <break time = "400ms"/> pero  <break time = "200ms"/> pierdes un poco de vida cuando el esqueleto te lanza un hechizo.'
    ],
    type: "SINO"
  },
  {
    // 3
    text:
      '<break time="1000ms"/>Te adentras más el castillo y encuentras a un golem de fuego, <break time = "300ms"/>el golem se prepara para atacar. Tu sabes que el golem de fuego recibe <emphasis level = "moderate">4 veces más daño de agua</emphasis><break time = "300ms"/> Tus opciones son: <break time = "400ms"/>Usar Hydro-Manguera que hace ${x} de daño contra enemigos normales o <break time = "100ms"/>usar Lanzamiento de Rocas que hace ${y} de daño. ¿Es conveniente atacar con tu hechizo de agua Hydro-Manguera?',
    correct: [
      "Utilizas el agua y está apaga las llamas del golem, el cual cae al piso como una bolsa de papas.",
      "Lanzas una gran roca la cual destruye completamente a tu oponente. Te preguntas por qué no usas ese hechizo más seguido"
    ],
    wrong: [
      'Lanzas una gran roca la cual destruye a tu enemigo,<break time = "300ms"/> pero no antes de que el golem te lanzará una bola de fuego, el hechizo de agua hubiera sido mejor opción. Pierdes vida.',
      'Tu hechizo acuático es demasiado débil. No es tu mejor elemento. El golem cae, <break time = "300ms"/>pero no antes de lanzarte una bola de fuego, <break time = "300ms"/>pierdes vida.'
    ],
    type: "SINO"
  },
  {
    // 4
    text:
      '<break time="1000ms"/>Ahora te encuentras en un corredor, <break time="300ms"/>mientras caminas una <break time="200ms"/>parte del techo de desprende y caerá sobre ti al menos que hagas algo. <break time="300ms"/>Decides reforzar tus defensas con un hechizo mágico. <break time="300ms"/>Tienes 10 puntos de defensa, puedes usar Defensa Mágica para multiplicar este número por ${x} <break time="300ms"/>o sumarle ${y} con Piel de piedra. ¿La defensa de Piel de piedra es mayor a la de Defensa Mágica?',
    correct:
      'La piedra cae sobre tu cabeza y se rompe en pedacitos, <break time="300ms"/>no sientes nada de dolor',
    wrong:
      'La piedra cae sobre tu cabeza y se parte en dos, <break time="300ms"/>sientes un gran dolor de cabeza y pierdes un poco de vida.',
    type: "SINO"
  }, // TE FALTA AGREGAR DESDE AQUI
  {
    // 5
    text:
      ' <break time="1000ms"/>Das la vuelta en el siguiente corredor y  <break time="300ms"/> <emphasis level = "strong">zaz</emphasis> <break time="300ms"/> te encuentras con una serpiente gigante.  <break time="300ms"/>Decides usar un hechizo doble de de fuego y aire,  <break time="200ms"/>El huracán caliente.  <break time="300ms"/>Si necesitas infringir ${x} de daño para vencer a la serpiente y la parte de fuego del hechizo causará ${y} de daño  <break time="300ms"/>¿Cuanto daño necesitas infringir con tu ataque de aire para vencer a la serpiente de manera que no desperdicies tu magia?',
    correct:
      'La serpiente es envuelta en llamas y el camino ahora está libre, <break time="300ms"/>continuas con tu aventura.',
    wrong:
      'Lanzas un hechizo desequilibrado y débil,  <break time="300ms"/>la serpiente parece molesta y te dispara un chorro de veneno,  <break time="400ms"/>pierdes vida y te regresas a buscar otro camino.',
    type: "DIRECTA"
  },
  {
    // 6
    text:
      '<break time="1000ms"/>Continúas por los pasillos del castillo a y te das cuenta de que algo te persigue rápidamente,<break time="300ms"/> ¡Es un centauro! <break time="300ms"/>La única forma de escapar de él es dispararle en sus 4 patas, <break time="300ms"/>si cada pata del centauro tiene ${x} de vida y tu hechizo Flecha de Hielo hace ${y} de daño<break time="300ms"/> ¿Cuántas veces tendrás que usar el hechizo para lograr escapar?',
    correct:
      'Disparas con alta precisión y ninguno de tus hechizos fallan, <break time="300ms"/>el centauro no puede hacer más que detenerse. <break time="300ms"/>Continuas con tu travesía.',
    wrong:
      'Atacas al centauro y baja su velocidad, pero no lo suficiente. <break time="300ms"/>El centauro te patea con una de sus patas frontales y continúa galopando,<break time="200ms"/> por suerte el centauro prefiere no seguir peleando así que se retira. <break time="300ms"/>Pierdes vida.',
    type: "DIRECTA"
  },
  {
    // 7
    text:
      '<break time="1000ms"/>Una barrera mágica bloquea tu camino.<break time="300ms"/> La barrera tiene una fuerza mágica de ${x},<break time="300ms"/> podrías pasarla con tu hechizo Taladro Giratorio<break time="100ms"/> pero necesitas aplicar exactamente ${y} veces la fuerza mágica de la barrera. <break time="300ms"/>¿Cuanta magia pones en tu taladro?',
    correct:
      'Tu taladro destruye fácilmente la barrera,<break time="300ms"/> es como si nunca hubiera estado allí.',
    wrong:
      'Empiezas a taladrar pero algo sale mal <break time="100ms"/> la barrera explota y pierdes vida. <break time="300ms"/>Mínimo la barrera ha caído.',
    type: "DIRECTA"
  },
  {
    // 8
    text:
      '<break time="1000ms"/>El pasillo siguiente parece estar llenándose de un gas venenoso, <break time="300ms"/>en pasillo se llenará de veneno en ${x} segundos, <break time="200ms"/>y tu puedes mantener tu respiración por ${y} segundos más <break time="300ms"/>¿Cuánto tiempo podrás pasar en total en este corredor envenenado?',
    correct:
      'Atraviesas el pasillo sin respirar el gas <break time="100ms"/>y continuas hacia los interiores del castillo.',
    wrong:
      'Atraviesas el pasillo pero respiras un poco de gas, <break time="200ms"/>al parecer <break time="50ms"/>tus cálculos no fueron certeros. <break time="300ms"/>Pierdes vida.',
    type: "DIRECTA"
  },
  {
    // 9
    text:
      '<break time="1000ms"/>En uno de los cuartos del castillo <break time="50ms"/>te encuentras con una bruja. <break time="300ms"/>Al verte, <break time="100ms"/>la bruja inmediatamente se toma una poción que multiplica su vida por ${x}, <break time="300ms"/>ya sabes que las brujas cuentan con ${y} puntos de vida. <break time="300ms"/>¿Cuantos puntos de daño necesita hacer tu siguiente ataque para vencer a la bruja sin gastar magia?',
    correct:
      'Vences a la bruja con tu hechizo preferido <break time="50ms"/>Golpe Solar <break time="100ms"/>y continuas después de probar lo que la bruja cocinaba en su caldero.',
    wrong:
      'Tu ataque <break time="50ms"/>Golpe Solar <break time="50ms"/>es impreciso y le das a la pared, <break time="200ms"/>al parecer hubo un error en tus cálculos, <break time="300ms"/>la bruja te manda volando fuera de su recámara,<break time="300ms"/> continuas después de perder vida.',
    type: "DIRECTA"
  },
  {
    // 10
    text:
      '<break time="1000ms"/>Al continuar por la mazmorra eres descuidado y pisas una trampa<emphasis level = "moderate"> mortal</emphasis>, <break time = "300ms"/>${x} proyectiles que infrinjan ${y} de daño son lanzados a una velocidad deslumbrante en tu dirección, <break time = "300ms"/>necesitas protegerte con <emphasis level = "reduced">tu hechizo Muralla Implacable</emphasis> <break time = "300ms"/>¿Cuanto daño necesita absorber tu hechizo para detener los proyectiles sin pasarte de fuerza?',
    correct:
      "Paras los proyectiles sin recibir ningún rasguño, te sientes implacable",
    wrong:
      'Tus cálculos son erróneos, los proyectiles impactan con tu muralla pero <break time = "300ms" /> aun así logran hacerte daño.',
    type: "DIRECTA"
  }
];
