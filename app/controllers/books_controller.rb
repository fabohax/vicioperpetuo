class BooksController < ApplicationController
  def index
  end

  def bicentenario
    @bookTitle = "200"
    @bookAuthor = "Antología de Poesia Contemporánea"
    @bookDescription = "Esta antología recoge los mejores poemas escritos por autores de México, Argentina, Chile, Puerto Rico, Venezuela y Perú desde la generación del 60 hasta la generación del 2020."
    @bookPrice = "30"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "164"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Al pie del desierto"
    @bookNextPath = "alpiedeldesierto"
  end

  def acleman
    @bookTitle = "Ácleman"
    @bookAuthor = "Luciano Ácleman"
    @bookDescription = "Esta antología recoge los mejores poemas escritos por el autor."
    @bookPrice = "30"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "164"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Al pie del desierto"
    @bookNextPath = "alpiedeldesierto"
  end

  def alpiedeldesierto
    @bookTitle = "Al pie del desierto"
    @bookAuthor = "Alberto Benavides Ganoza"
    @bookDescription = "Este poemario es un homenaje a la vida retirada, a la amistad, al amor, al campo y al quechua, el poeta lo escribió a modo de oda a la vida retirada."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2020"
    @bookPages = "80"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Andando en cuentos"
    @bookNextPath = "andandoencuentos"
  end

  def andandoencuentos
    @bookTitle = "Andando en cuentos"
    @bookAuthor = "Antología de Poesia Contemporánea"
    @bookDescription = "Este libro reúne 27 voces disimiles que retratan con su registro narrativo lo mejor del cuento peruano. Al abrir este tesoro encontraremos autores de la generación del 60 y conforme avancemos también nos topamos con autores de la novísima generación de 2010."
    @bookPrice = "30"
    @bookGender = "Cuento"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289293"
    @bookYear = "2021"
    @bookPages = "130"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Buscando a Venus"
    @bookNextPath = "buscandoavenus"
  end

  def buscandoavenus
    @bookTitle = "Buscando a Venus"
    @bookAuthor = "Julio Benavides Parra"
    @bookDescription = "Este libro nos acerca a los cuentos de terror que escuchábamos de niños y que nos escarapelaban los nervios. Incluye historias que te pasaron a ti o a algún amigo, confesiones sobre la muerte, testimonios sobre la destrucción del mundo, un cuento sobre jóvenes bohemios, premoniciones, un gallito travieso y entrañable llamado Ludovico, un cuento ecológico, testimonios sobre los efectos de la televisión y la búsqueda de la mujer ideal. La búsqueda de Venus ha comenzado en cada página, donde se va pintando este hermoso cuadro de belleza in extremis, de esta vigorosa muestra de exquisita narrativa."
    @bookPrice = "27"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2022"
    @bookPages = "180"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Nunca ensilles a un caballo virtual"
    @bookNextPath = "nuncaensillesauncaballovirtual"
  end

  def nuncaensillesauncaballovirtual
    @bookTitle = "Nunca ensilles a un caballo virtual"
    @bookAuthor = "Gustavo Espejo Landauro"
    @bookDescription = "Relatos que tratan nos mostrarnos la relación difícil que tiene la tecnología y el hombre. Una relación esclavizante y asfixiante."
    @bookPrice = "10"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "78"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Celebración del Tiempo"
    @bookNextPath = "celebraciondeltiempo"
  end

  def celebraciondeltiempo
    @bookTitle = "Celebración del Tiempo"
    @bookAuthor = "Eduardo Arroyo"
    @bookDescription = "Este libro es un homenaje a la amistad y a los 50 años de poesía de un gran autor. Cada poema incluido tiene una dedicatoria."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2020"
    @bookPages = "80"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Compañía Eterna"
    @bookNextPath = "companiaeterna"
  end

  def companiaeterna
    @bookTitle = "Compañía Eterna"
    @bookAuthor = "Colección Bicentenario"
    @bookDescription = "Este libro reúne textos de 38 autores de Hispanoamérica, desde la generación del 60 hasta el 2020, que nos muestran las diversas posibilidades de la narrativa escrita en países como España, México, Puerto Rico, Venezuela y Perú."
    @bookPrice = "25"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2022"
    @bookPages = "204"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Cosas que suceden... cuentos fantásticos"
    @bookNextPath = "cosasquesucedencuentosfantasticos"
  end

  def cosasquesucedencuentosfantasticos
    @bookTitle = "Cosas que suceden... cuentos fantásticos"
    @bookAuthor = "Eduardo Borrero Vargas"
    @bookDescription = "Este texto habla sobre la tendencia del hombre a ubicarse en el futuro y buscar respuestas a sus dudas y utopías, lo que ha llevado a una falta de interés en la novela realista. En cambio, los relatos hipotéticos que exploran la infinitud del tiempo cósmico, como los que desarrollaron Sagan y Asimov, tienen una fuerza especial en la literatura fantástica de Eduardo Borrero Vargas. La literatura fantástica ofrece una apertura hacia otras realidades, lo que resulta valioso en un mundo donde el escritor no está contento con lo que sucede alrededor de la llamada realidad. Los relatos cortos de 'Cosas que suceden... cuentos fantásticos' son una celebración de esta búsqueda de otras realidades y merecen nuestra atención en esta incierta posmodernidad."
    @bookPrice = "20"
    @bookGender = "Cuento"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Cuenta conmigo, verso contigo"
    @bookNextPath = "cuentaconmigoversocontigo"
  end

  def cuentaconmigoversocontigo
    @bookTitle = "Cuenta conmigo, verso contigo"
    @bookAuthor = "Abdela Romero Herbozo"
    @bookDescription = "Este libro incluye relatos que nos acercan al espíritu regionalista de los pueblos del norte de Lima, específicamente en la provincia de Huacho, así como poemas de corte interiorista."
    @bookPrice = "10"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "73"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "De Amoris Essentia"
    @bookNextPath = "deamorisessentia"
  end

  def deamorisessentia
    @bookTitle = "De Amoris Essentia"
    @bookAuthor = "Manuel Alonso Navazar"
    @bookDescription = "Este poemario está dividido en tres partes, en las cuales se desarrolla el amor a lo largo de la historia: los primeros amores, el amor en la adultez y el amor en la madurez. El amor es el tema principal y es homenajeado en todo el poemario."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2020"
    @bookPages = "91"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "De cómplice tenemos a la luna"
    @bookNextPath = "decomplicetenemosalaluna"
  end

  def decomplicetenemosalaluna
    @bookTitle = "De cómplice tenemos a la luna"
    @bookAuthor = "Colección Bicentenario"
    @bookDescription = "Esta antología de microcuentos, 'De cómplice tenemos a la luna', reúne a 50 autores y es un viaje imaginario por nuestro país y el mundo. Los autores provienen de lugares como Ayacucho, Piura, Arequipa, Cajamarca, Lima, Huancayo, Cusco, Huancavelica, Trujillo, Sullana, Callao, Jauja, Pacasmayo, Áncash, Chancay e Ica, así como de países como Argentina, Bolivia, Bosnia, Cuba, España, México, Puerto Rico y Venezuela. Este viaje lleno de travesías y muchas paradas, le permitirá deleitarse con lo mejor del microcuento contemporáneo escrito en los últimos 70 años."
    @bookPrice = "20"
    @bookGender = "Cuento"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2022"
    @bookPages = "108"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Diálogos póstumos"
    @bookNextPath = "dialogospostumos"
  end

  def dialogospostumos
    @bookTitle = "Diálogos póstumos"
    @bookAuthor = "Juan Andrés Gómez"
    @bookDescription = "El autor, conocido por su trabajo en el teatro, presenta en este libro una propuesta poética en la que los personajes dialogan con la muerte y con el lector."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "El Embajador"
    @bookNextPath = "elembajador"
  end

  def elembajador
    @bookTitle = "El Embajador"
    @bookAuthor = "Leandro Meza"
    @bookDescription = "Esta novela sigue las aventuras de jóvenes talentosos y decididos, que se ven involucrados en divertidas travesuras que atraparán al lector."
    @bookPrice = "20"
    @bookGender = "Novela"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2020"
    @bookPages = "220"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "El novelista y el trompo"
    @bookNextPath = "elnovelistayeltrompo"
  end

  def elnovelistayeltrompo
    @bookTitle = "El novelista y el trompo"
    @bookAuthor = "Enrique González Arias"
    @bookDescription = "Este libro nos acerca a los cuentos de terror que escuchábamos de niños y que nos escarapelaban los nervios. Incluye historias que te pasaron a ti o a algún amigo, confesiones sobre la muerte, testimonios sobre la destrucción del mundo, un cuento sobre jóvenes bohemios, premoniciones, un gallito travieso y entrañable llamado Ludovico, un cuento ecológico, testimonios sobre los efectos de la televisión y la búsqueda de la mujer ideal. La búsqueda de Venus ha comenzado en cada página, donde se va pintando este hermoso cuadro de belleza in extremis, de esta vigorosa muestra de exquisita narrativa."
    @bookPrice = "20"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2013"
    @bookPages = "80"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "El revés del círculo de Babel"
    @bookNextPath = "elrevesdelcirculodebabel"
  end

  def elrevesdelcirculodebabel
    @bookTitle = "El revés del círculo de Babel"
    @bookAuthor = "Gustavo Espejo Landauro"
    @bookDescription = "Este libro de poemas reúne textos que nos retratan el amor más tierno, el afecto familiar, los recuerdos y la amistad."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Eureka Teatro"
    @bookNextPath = "eurekateatro"
  end

  def eurekateatro
    @bookTitle = "Eureka Teatro"
    @bookAuthor = "Ruth Vásquez García"
    @bookDescription = "Este libro incluye cuatro entremeses que deleitarán al lector con lo mejor de la literatura. Apropiado para todas las edades, podremos disfrutar de 'El Gallinazo sin Plumas', 'Rosita' y 'Las Mariposas.'"
    @bookPrice = "10"
    @bookGender = "Dramaturgia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2014"
    @bookPages = "60"
    @bookRatio = "14 x 18"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Fuego de ceniza"
    @bookNextPath = "fuegodeceniza"
  end

  def fuegodeceniza
    @bookTitle = "Fuego de ceniza"
    @bookAuthor = "Ginger Santiago"
    @bookDescription = "Estos poemas son cortos y tienen un tono romántico y erótico, en los que la poeta lleva al 'yo poético' a través de relaciones estables con su ser amado."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2020"
    @bookPages = "80"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Generación Bicentenario"
    @bookNextPath = "generacionbicentenario"
  end

  def generacionbicentenario
    @bookTitle = "Generación Bicentenario"
    @bookAuthor = "Antología latinoamericana de microrelato"
    @bookDescription = "Esta antología del microcuento latinoamericano presenta 42 autores y su magia en la literatura breve."
    @bookPrice = "20"
    @bookGender = "Cuento"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Gota sobre piedra"
    @bookNextPath = "gotasobrepiedra"
  end

  def gotasobrepiedra
    @bookTitle = "Gota sobre piedra"
    @bookAuthor = "César Monge Durá"
    @bookDescription = "."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "La comarca y otros relatos"
    @bookNextPath = "lacomarcayotrosrelatos"
  end

  def lacomarcayotrosrelatos
    @bookTitle = "La comarca y otros relatos"
    @bookAuthor = "Manuel Arboccó de los Heros"
    @bookDescription = "."
    @bookPrice = "20"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "La cuarentena"
    @bookNextPath = "lacuarentena"
  end

  def lacuarentena
    @bookTitle = "La cuarentena"
    @bookAuthor = "Colección Bicentenario"
    @bookDescription = "Esta antología recoge los mejores microcuentos del país. Contiene varias temáticas en un solo libro, como el amor, el suspenso, el terror, lo histórico, lo ecológico, las anécdotas, los cuentos moralizantes, etc."
    @bookPrice = "10"
    @bookGender = "Cuento"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2020"
    @bookPages = "110"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "La lucha por la ansiada libertad"
    @bookNextPath = "laluchaporlaansiadalibertad"
  end

  def laluchaporlaansiadalibertad
    @bookTitle = "La lucha por la ansiada libertad"
    @bookAuthor = "Eduardo Ángel Benavides Parra"
    @bookDescription = "Esta novela sigue las aventuras de jóvenes talentosos y decididos, que se ven involucrados en divertidas travesuras que atraparán al lector."
    @bookPrice = "20"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2022"
    @bookPages = "108"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "La nueva ola"
    @bookNextPath = "lanuevaola"
  end

  def lanuevaola
    @bookTitle = "La nueva ola"
    @bookAuthor = "Colección Bicentenario"
    @bookDescription = "."
    @bookPrice = "20"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "La otra orilla"
    @bookNextPath = "laotraorilla"
  end

  def laotraorilla
    @bookTitle = "La otra orilla"
    @bookAuthor = "Antología de cuento hispanoamericano"
    @bookDescription = "Este libro de cuentos incluye a varios autores con temáticas variadas. Reúne 34 relatos de autores que desarrollan un universo casi ilimitado en sus propuestas."
    @bookPrice = "20"
    @bookGender = "Cuento"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "138"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "La página que escribimos"
    @bookNextPath = "lapaginaqueescribimos"
  end

  def lapaginaqueescribimos
    @bookTitle = "La página que escribimos"
    @bookAuthor = "Gustavo Espejo Landauro"
    @bookDescription = "Este libro de poemas reúne textos que nos retratan el amor más tierno, el afecto familiar, los recuerdos y la amistad."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Las calles de mi alma"
    @bookNextPath = "lascallesdemialma"
  end

  def lascallesdemialma
    @bookTitle = "Las calles de mi alma"
    @bookAuthor = "Melec Laguna Boza"
    @bookDescription = "."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Linda"
    @bookNextPath = "linda"
  end

  def linda
    @bookTitle = "Linda"
    @bookAuthor = "César Carbonel Cabrera"
    @bookDescription = "Este libro de poemas reúne textos que nos retratan el amor más tierno, el afecto familiar, los recuerdos y la amistad."
    @bookPrice = "20"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Más allá donde todo nace"
    @bookNextPath = "masalladondetodonace"
  end

  def masalladondetodonace
    @bookTitle = "Más allá, donde todo nace"
    @bookAuthor = "Max Cristian Huamán Pérez"
    @bookDescription = "."
    @bookPrice = "20"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Mis décimas y yo"
    @bookNextPath = "misdecimasyyo"
  end

  def misdecimasyyo
    @bookTitle = "Mis décimas y yo"
    @bookAuthor = "Gustavo Espejo Landauro"
    @bookDescription = "La décima es un género lírico originario de España, que ha llegado hasta nosotros a través de la conquista. Entre los autores de décimas destacados se encuentran políticos, Zambo Cavero, Facundo Cabral, entre otros."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2020"
    @bookPages = "80"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Mutilada"
    @bookNextPath = "mutilada"
  end

  def mutilada
    @bookTitle = "Mutilada"
    @bookAuthor = "Gustavo Espejo Landauro"
    @bookDescription = "Este libro de poemas reúne textos que nos retratan el amor más tierno, el afecto familiar, los recuerdos y la amistad."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Oídos Sordos"
    @bookNextPath = "oidossordos"
  end

  def oidossordos
    @bookTitle = "Oídos Sordos"
    @bookAuthor = "Julio Benavides Parra"
    @bookDescription = "Esta novela nos lleva de regreso al tiempo de la dictadura para narrar una gran historia: la vida de Alcides Chinchorro, el dilema de Anita y la relación entre María y José."
    @bookPrice = "20"
    @bookGender = "Novela"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "79"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Para mi amante sustituta"
    @bookNextPath = "paramiamantesustituta"
  end

  def paramiamantesustituta
    @bookTitle = "Para mi amante sustituta"
    @bookAuthor = "Ricardo Alonso More Juárez"
    @bookDescription = "."
    @bookPrice = "20"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Sacrificio de amor"
    @bookNextPath = "sacrificiodeamor"
  end

  def sacrificiodeamor
    @bookTitle = "Sacrificio de amor"
    @bookAuthor = "Ángelo Torres"
    @bookDescription = "Este libro de poemas aborda temas como el amor, el sufrimiento, el dolor y la muerte."
    @bookPrice = "10"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2022"
    @bookPages = "204"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Sensaciones"
    @bookNextPath = "sensaciones"
  end

  def sensaciones
    @bookTitle = "Sensaciones"
    @bookAuthor = "Nelson Cardoza"
    @bookDescription = "Este libro de poemas reúne textos que nos retratan el amor más tierno, el afecto familiar, los recuerdos y la amistad."
    @bookPrice = "10"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "57"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Sinfonía Lírica"
    @bookNextPath = "sinfonialirica"
  end

  def sinfonialirica
    @bookTitle = "Sinfonía Lírica"
    @bookAuthor = "Muestra de poesía total"
    @bookDescription = "Nuestro sello presenta esta antología anual con 61 poetas de todas las generaciones, desde la del 40 hasta la más reciente del 2020. Son multitemáticos."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2020"
    @bookPages = "80"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Sobresaltado sueño"
    @bookNextPath = "sobresaltadosueno"
  end

  def sobresaltadosueno
    @bookTitle = "Sobresaltado sueño"
    @bookAuthor = "Antología de sueños y pesadillas"
    @bookDescription = "."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Ediciones Infinito"
    @bookNextName = "Soplo inocente"
    @bookNextPath = "soploinocente"
  end
  
  def soploinocente
    @bookTitle = "Soplo inocente"
    @bookAuthor = "Juan José Cavero Benites"
    @bookDescription = "Esta es la primera novela de un gran autor que más tarde obtendría el premio Copé, Norma y Barco de Vapor. La novela cuenta la historia de un niño con problemas cardíacos y representa el espíritu de las personas provenientes de las provincias que llegan a Lima."
    @bookPrice = "20"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2020"
    @bookPages = "91"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Tiempo detenido"
    @bookNextPath = "tiempodetenido"
  end

  def tiempodetenido
    @bookTitle = "Tiempo detenido"
    @bookAuthor = "Ezequiel Valenzuela Noguera"
    @bookDescription = "Este libro de cuentos reúne relatos cuyo tema central es la cuarentena. Los personajes son variados y se ven envueltos por esta fuerza inexplicable."
    @bookPrice = "20"
    @bookGender = "Narrativa"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "84"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Todas las voces"
    @bookNextPath = "todaslasvoces"
  end

  def todaslasvoces
    @bookTitle = "Todas las voces"
    @bookAuthor = "Muestra de poesía mundial"
    @bookDescription = "."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Vértigo"
    @bookNextPath = "vertigo"
  end

  def vertigo
    @bookTitle = "Vértigo"
    @bookAuthor = "Marco Martos"
    @bookDescription = "Este libro de poemas está dedicado a la naturaleza, a los animales, al amor y al mundo antiguo. El poeta es como un orfebre que nos muestra en estos textos la fuerza de su poética."
    @bookPrice = "10"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase.to_s
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2020"
    @bookPages = "60"
    @bookRatio = "14 x 18"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Vespertilio"
    @bookNextPath = "vespertilio"
  end

  def vespertilio
    @bookTitle = "Vespertilio"
    @bookAuthor = "Marco Martos"
    @bookDescription = "."
    @bookPrice = "20"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2021"
    @bookPages = "60"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "Antología Voz Celestial Poesia Total"
    @bookNextPath = "vozcelestial"
  end

  def vozcelestial
    @bookTitle = "Antología Voz Celestial Poesia Total"
    @bookAuthor = "Colección Bicentenario"
    @bookDescription = "Esta antología recoge una selección de los mejores poemas de autores de Hispanoamérica desde la generación del 60 hasta la más reciente generación 2020, ofreciendo lo mejor de su lírica en este libro."
    @bookPrice = "25"
    @bookGender = "Poesia"
    @bookGenderPath = @bookGender.downcase
    @bookID = __method__.to_s
    @bookISBN = "9786124289637"
    @bookYear = "2022"
    @bookPages = "168"
    @bookRatio = "14 x 21"
    @bookEditorial = "Vicio Perpetuo Vicio Perfecto"
    @bookNextName = "200"
    @bookNextPath = "bicentenario"
  end

end