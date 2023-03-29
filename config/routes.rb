Rails.application.routes.draw do
  
  get "/vicioperfecto", to: "home#index"
  get "/books", to: "books#index"

  get "/info", to: "pages#info"

  get "/privacidad", to: "pages#privacidad"
  get "/terminos", to: "pages#terminos"
  

  get "/narrativa", to: "pages#narrativa"
  get "/poesia", to: "pages#poesia"
  get "/cuento", to: "pages#cuento"
  get "/microcuento", to: "pages#microcuento"
  get "/novela", to: "pages#novela"
  get "/ensayo", to: "pages#ensayo"

  get "/autores", to: "pages#autores"

  #method name must be same as route
  get "/bicentenario", to: "books#bicentenario"
  get "/acleman", to: "books#acleman"
  get "/alpiedeldesierto", to: "books#alpiedeldesierto"
  get "/andandoencuentos", to: "books#andandoencuentos"
  get "/buscandoavenus", to: "books#buscandoavenus"  
  get "/celebraciondeltiempo", to: "books#celebraciondeltiempo"
  get "/companiaeterna", to: "books#companiaeterna"
  get "/cosasquesucedencuentosfantasticos", to: "books#cosasquesucedencuentosfantasticos"
  get "/cuentaconmigoversocontigo", to: "books#cuentaconmigoversocontigo"
  get "/deamorisessentia", to: "books#deamorisessentia"
  get "/decomplicetenemosalaluna", to: "books#decomplicetenemosalaluna"
  get "/dialogospostumos", to: "books#dialogospostumos"
  get "/elembajador", to: "books#elembajador"
  get "/elnovelistayeltrompo", to: "books#elnovelistayeltrompo"
  get "/elrevesdelcirculodebabel", to: "books#elrevesdelcirculodebabel"
  get "/eurekateatro", to: "books#eurekateatro"
  get "/fuegodeceniza", to: "books#fuegodeceniza"
  get "/generacionbicentenario", to: "books#generacionbicentenario"
  get "/gotasobrepiedra", to: "books#gotasobrepiedra"
  get "/lacomarcayotrosrelatos", to: "books#lacomarcayotrosrelatos"
  get "/lacuarentena", to: "books#lacuarentena"
  get "/laluchaporlaansiadalibertad", to: "books#laluchaporlaansiadalibertad"
  get "/lanuevaola", to: "books#lanuevaola"
  get "/laotraorilla", to: "books#laotraorilla"
  get "/lapaginaqueescribimos", to: "books#lapaginaqueescribimos"
  get "/lascallesdemialma", to: "books#lascallesdemialma"
  get "/linda", to: "books#linda"
  get "/masalladondetodonace", to: "books#masalladondetodonace"
  get "/misdecimasyyo", to: "books#misdecimasyyo"
  get "/mutilada", to: "books#mutilada"
  get "/nuncaensillesauncaballovirtual", to: "books#nuncaensillesauncaballovirtual"
  get "/oidossordos", to: "books#oidossordos"
  get "/paramiamantesustituta", to: "books#paramiamantesustituta"
  get "/sacrificiodeamor", to: "books#sacrificiodeamor"
  get "/sensaciones", to: "books#sensaciones"
  get "/sinfonialirica", to: "books#sinfonialirica"
  get "/sobresaltadosueno", to: "books#sobresaltadosueno"
  get "/soploinocente", to: "books#soploinocente"
  get "/tiempodetenido", to: "books#tiempodetenido"
  get "/todaslasvoces", to: "books#todaslasvoces"
  get "/vertigo", to: "books#vertigo"
  get "/vespertilio", to: "books#vespertilio"
  get "/vozcelestial", to: "books#vozcelestial"
  

  root "home#index"

end
