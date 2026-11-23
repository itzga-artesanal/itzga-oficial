/* ITZGA · Configuración editable. Cambia solo los valores; no borres comillas ni comas. */
window.ITZGA={
  currency:"MXN",

  /* ETIQUETAS en las tarjetas: "nuevo" y "navidad". Puedes poner una o dos por producto: "codigo":"nuevo"  o  "codigo":["navidad","nuevo"]. Quita la línea para no mostrar etiqueta. */
  badges:{
    "vela-artesanal-kit-navideno":["navidad","nuevo"],
    "vela-artesanal-arbol-navidad":["navidad"],
    "vela-artesanal-estrella-5-piezas":["navidad","nuevo"],
    "vela-artesanal-suena":["navidad","nuevo"],
    "vela-artesanal-borrego-chico-5-piezas":"nuevo",
    "vela-artesanal-borrego-grande":"nuevo",
    "jabon-artesanal-pino-navideno":["navidad","nuevo"],
    "jabon-artesanal-mini-jabones-navidenos":["navidad","nuevo"],
    "jabon-artesanal-mini-pino":["navidad","nuevo"],
    "jabon-artesanal-galleta":["navidad","nuevo"],
    "jabon-artesanal-flor-encapsulada":"nuevo",
    "jabon-artesanal-ositos-recuerdo":"nuevo",
    "jabon-artesanal-racimo-uvas":"nuevo",
    "jabon-artesanal-racimo-uvas-chico":"nuevo",
    "jabon-artesanal-rosa":"nuevo",
    "jabon-clasico-aloe-bebe":"nuevo",
    "jabon-clasico-arroz":"nuevo",
    "jabon-clasico-coco-almendra":"nuevo"
  },

  /* 1) FORMULARIO DE CONTACTO REAL (opcional). Con Web3Forms (gratis): crea tu Access Key en web3forms.com con el correo itzgaoficial@gmail.com y pon:
     formEndpoint:"https://api.web3forms.com/submit",  formKey:"TU-ACCESS-KEY"
     Con Formspree: formEndpoint:"https://formspree.io/f/TU-ID" (y deja formKey vacío). Si lo dejas vacío, el formulario abre el correo del visitante. */
  formEndpoint:"",
  formKey:"",

  prices:{
    /* 2) PRECIO POR FAMILIA (en pesos, solo el número). Ejemplo: "vela-aromatica-":180 */
    prefix:{
      "jabon-clasico-":null,
      "jabon-artesanal-":null,
      "vela-artesanal-":null,
      "vela-aromatica-":85
    },
    /* 3) PRECIO POR PRODUCTO (tiene prioridad sobre la familia). null = "Consultar precio" */
    products:{
      "jabon-artesanal-flor-encapsulada":65,
      "jabon-artesanal-galleta":65,
      "jabon-artesanal-mini-jabones-navidenos":40,
      "jabon-artesanal-mini-pino":35,
      "jabon-artesanal-osito":35,
      "jabon-artesanal-ositos-recuerdo":65,
      "jabon-artesanal-pino-navideno":65,
      "jabon-artesanal-racimo-uvas":200,
      "jabon-artesanal-racimo-uvas-chico":100,
      "jabon-artesanal-rosa":50,
      "jabon-avena-miel":90,
      "jabon-cafe-cacao":90,
      "jabon-calendula-manzanilla":90,
      "jabon-carbon-romero":90,
      "jabon-citricos":90,
      "jabon-clasico-aloe-bebe":65,
      "jabon-clasico-arcilla-rosa":65,
      "jabon-clasico-arroz":90,
      "jabon-clasico-avena-miel":65,
      "jabon-clasico-bicolor":65,
      "jabon-clasico-carbon-activado":65,
      "jabon-clasico-carbon-coco":65,
      "jabon-clasico-coco-almendra":65,
      "jabon-clasico-exfoliante-lufa":65,
      "jabon-clasico-hierbas-naturales":null,
      "jabon-clasico-loofha":null,
      "jabon-clasico-marmoleado":null,
      "jabon-clasico-te-verde":65,
      "jabon-clasico-tricolor":65,
      "jabon-eucalipto":90,
      "jabon-romero-menta":90,
      "vela-aromatica-brisa-marina":null,
      "vela-aromatica-cafe":null,
      "vela-aromatica-canela":null,
      "vela-aromatica-coco":null,
      "vela-aromatica-eucalipto-menta":null,
      "vela-aromatica-fresa":null,
      "vela-aromatica-lavanda":null,
      "vela-aromatica-limon":null,
      "vela-aromatica-pino-bosque":null,
      "vela-aromatica-rosas":null,
      "vela-aromatica-sandalo":null,
      "vela-aromatica-vainilla":null,
      "vela-artesanal-arbol-navidad":65,
      "vela-artesanal-borrego-chico-5-piezas":50,
      "vela-artesanal-borrego-grande":65,
      "vela-artesanal-estrella-5-piezas":45,
      "vela-artesanal-kit-navideno":150,
      "vela-artesanal-osito":35,
      "vela-artesanal-suena":40
    }
  }
};
