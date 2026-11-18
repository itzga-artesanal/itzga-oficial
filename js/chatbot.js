/* ITZGA · Chatbot "Itzi" — asistente sencillo sin servidor.
   Responde con los precios reales de js/config.js (window.ITZGA),
   explica cómo pedir por WhatsApp, envíos y velas comestibles.
   No inventa costos de envío ni tiempos: esos se cotizan por WhatsApp. */
(function () {
  'use strict';

  var WA_NUMBER = '525567337838';
  var WA_BASE = 'https://wa.me/' + WA_NUMBER + '?text=';

  function waLink(text) {
    return WA_BASE + encodeURIComponent(text);
  }

  /* Precios: nombre que ve el cliente -> código en js/config.js */
  var PRODUCTS = [
    { keys: ['racimo', 'uvas'], code: 'jabon-artesanal-racimo-uvas', name: 'Jabón Racimo de Uvas' },
    { keys: ['kit navide'], code: 'vela-artesanal-kit-navideno', name: 'Kit navideño' },
    { keys: ['rosa'], code: 'jabon-artesanal-rosa', name: 'Jabón Rosa' },
    { keys: ['galleta'], code: 'jabon-artesanal-galleta', name: 'Jabón Galleta' },
    { keys: ['pino'], code: 'jabon-artesanal-pino-navideno', name: 'Jabón Pino navideño' },
    { keys: ['arbol', 'árbol'], code: 'vela-artesanal-arbol-navidad', name: 'Vela Árbol de Navidad' },
    { keys: ['flor encapsulada', 'flor'], code: 'jabon-artesanal-flor-encapsulada', name: 'Jabón Flor encapsulada' },
    { keys: ['ositos'], code: 'jabon-artesanal-ositos-recuerdo', name: 'Jabón Ositos para recuerdo' },
    { keys: ['arroz'], code: 'jabon-clasico-arroz', name: 'Jabón Arroz, miel y avena' },
    { keys: ['coco con almendra', 'coco'], code: 'jabon-clasico-coco-almendra', name: 'Jabón Coco con almendra' },
    { keys: ['lavanda'], code: 'vela-aromatica-lavanda', name: 'Vela aromática Lavanda' }
  ];

  /* Precio real desde la configuración del sitio (productos, luego familia). */
  function getPrice(code) {
    try {
      var cfg = window.ITZGA && window.ITZGA.prices;
      if (!cfg) return null;
      if (cfg.products && cfg.products[code] != null) return cfg.products[code];
      if (cfg.prefix) {
        for (var p in cfg.prefix) {
          if (code.indexOf(p) === 0 && cfg.prefix[p] != null) return cfg.prefix[p];
        }
      }
    } catch (e) { /* sin precios: se responde por WhatsApp */ }
    return null;
  }

  function fmt(n) { return '$' + n + ' MXN'; }

  function norm(s) {
    return (s || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /* ---------- Respuestas ---------- */

  function priceList() {
    var lines = ['Estos son algunos de nuestros precios:'];
    var shown = 0;
    PRODUCTS.forEach(function (p) {
      var price = getPrice(p.code);
      if (price != null && shown < 8) {
        lines.push('• ' + p.name + ': ' + fmt(price));
        shown++;
      }
    });
    lines.push('Las velas aromáticas cuestan $85 MXN cada una.');
    lines.push('¿Te interesa alguno? Pídelo por WhatsApp y te lo apartamos.');
    return { text: lines.join('\n'), wa: 'Hola ITZGA, me gustaría pedir un jabón o una vela.' };
  }

  function productAnswer(p) {
    var price = getPrice(p.code);
    if (price != null) {
      return {
        text: 'El ' + p.name + ' cuesta ' + fmt(price) + '.\n¿Quieres pedirlo? Te lo apartamos por WhatsApp.',
        wa: 'Hola ITZGA, quiero pedir: ' + p.name + ' (' + fmt(price) + ').'
      };
    }
    return {
      text: 'El ' + p.name + ' es de precio a consultar.\nEscríbenos por WhatsApp y te confirmamos el precio y disponibilidad al momento.',
      wa: 'Hola ITZGA, ¿me pueden confirmar el precio del ' + p.name + '?'
    };
  }

  function answer(raw) {
    var t = norm(raw);

    if (/\b(hola|buenas|buenos dias|buenas tardes|buenas noches|que tal|qué tal)\b/.test(t)) {
      return { text: '¡Hola! Soy Itzi, la asistente de ITZGA. Puedo ayudarte con precios, pedidos, envíos y nuestras velas comestibles. ¿Qué te gustaría saber?' };
    }
    if (/\b(gracias)\b/.test(t)) {
      return { text: '¡Con gusto! Si necesitas algo más, aquí estoy. Que tengas un bonito día.' };
    }
    if (/\b(adios|hasta luego|chao|bye|nos vemos)\b/.test(t)) {
      return { text: '¡Gracias por visitar ITZGA! Cuando quieras, aquí estoy. Hecho a mano, con amor.' };
    }
    if (/\b(comestible)/.test(t)) {
      return { text: '¡Sí! Nuestras velas comestibles están hechas con ingredientes de cocina, como mantequilla o chocolate, y son para probarlas.\nPregúntanos por los ingredientes y alérgenos antes de pedir, guárdalas en un lugar fresco y no te comas la mecha.\n¿Quieres ver los sabores? Escríbenos por WhatsApp.', wa: 'Hola ITZGA, quiero información sobre las velas comestibles.' };
    }
    if (/\b(envio|entrega|mandan|reparto|toda la republica|llegan a)\b/.test(t)) {
      return { text: 'Hacemos envíos a toda la República Mexicana.\nEl costo y el tiempo de entrega dependen de tu ubicación y del tamaño de tu pedido, así que te cotizamos por WhatsApp en un momento.\n¿Me dices tu código postal o tu ciudad?', wa: 'Hola ITZGA, quiero cotizar un envío. Mi código postal es: ' };
    }
    if (/\b(como pido|como compro|como pedi|quiero pedir|quiero comprar|hacer un pedido|pedido|comprar|ordenar)\b/.test(t)) {
      return { text: 'Pedir es muy fácil:\n1. Elige tu jabón o vela favorito.\n2. Escríbenos por WhatsApp con tu pedido.\n3. Te confirmamos disponibilidad y tu envío.\n\nPuedes pedirme el precio de cualquier producto aquí mismo.', wa: 'Hola ITZGA, quiero hacer un pedido.' };
    }
    if (/\b(horario|hora|abren|cierran|atienden|cuando abren)\b/.test(t)) {
      return { text: 'Nuestro horario de atención es de lunes a sábado de 9:00 a 18:00 horas. El domingo descansamos.\nPor WhatsApp te contestamos en ese horario.' };
    }
    if (/\b(contacto|telefono|correo|email|instagram|facebook|tiktok|redes)\b/.test(t)) {
      return { text: 'Claro, aquí nos encuentras:\n• WhatsApp: 55 6733 7838\n• Correo: itzgaoficial@gmail.com\n• Instagram, Facebook y TikTok: @itzgaoficial' };
    }
    if (/\b(aromatica|aroma|olor|fragancia)\b/.test(t)) {
      return { text: 'Nuestras velas aromáticas cuestan $85 MXN cada una. Tenemos 12 aromas: vainilla, lavanda, canela, café, brisa marina, fresa, eucalipto menta, sándalo, limón, rosas, coco y pino del bosque.\n¿Cuál es tu favorita?', wa: 'Hola ITZGA, quiero una vela aromática.' };
    }
    if (/\b(precio|cuesta|cuestan|cuanto|cuánto|vale|valen|lista de precios)\b/.test(t)) {
      for (var i = 0; i < PRODUCTS.length; i++) {
        var p = PRODUCTS[i];
        for (var k = 0; k < p.keys.length; k++) {
          if (t.indexOf(p.keys[k]) !== -1) return productAnswer(p);
        }
      }
      return priceList();
    }
    /* Mención de un producto sin la palabra "precio". */
    for (var j = 0; j < PRODUCTS.length; j++) {
      var p2 = PRODUCTS[j];
      for (var k2 = 0; k2 < p2.keys.length; k2++) {
        if (t.indexOf(p2.keys[k2]) !== -1) return productAnswer(p2);
      }
    }
    if (/\b(jabon|jabones|vela|velas)\b/.test(t)) {
      return { text: 'Tenemos jabones artesanales, clásicos y botánicos, y velas artesanales, aromáticas y comestibles, todos hechos a mano en CDMX.\n¿Buscas un precio, hacer un pedido o saber de los envíos? También puedes preguntarme por un producto, por ejemplo: "¿cuánto cuesta el Racimo de Uvas?"' };
    }
    return { text: 'No estoy segura de eso, pero te ayudo con mucho gusto por WhatsApp: ahí te atiende directamente el taller.\nTambién puedes preguntarme por precios, pedidos, envíos o velas comestibles.', wa: 'Hola ITZGA, tengo una duda.' };
  }

  /* ---------- Interfaz ---------- */

  var panel, msgs, input, badge, greeted = false;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function addMsg(text, who, waText) {
    var m = el('div', 'itzi-msg itzi-' + who);
    m.textContent = text;
    if (waText) {
      var a = el('a', 'itzi-wa', 'Pedir por WhatsApp');
      a.href = waLink(waText);
      a.target = '_blank';
      a.rel = 'noopener';
      m.appendChild(document.createElement('br'));
      m.appendChild(a);
    }
    msgs.appendChild(m);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function botReply(userText) {
    var r = answer(userText);
    setTimeout(function () { addMsg(r.text, 'bot', r.wa); }, 350);
  }

  function send(text) {
    var v = (text != null ? text : input.value).trim();
    if (!v) return;
    addMsg(v, 'user');
    input.value = '';
    botReply(v);
  }

  function build() {
    /* Botón flotante */
    var fab = el('button', null);
    fab.id = 'itzi-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Abrir chat con Itzi, asistente de ITZGA');
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.78 1.44 5.25 3.7 6.83L5 22l4.5-2.5c.8.18 1.63.28 2.5.28 5.52 0 10-3.94 10-8.8S17.52 2 12 2zm-2 8.5h-2v2h2v-2zm5 0h-2v2h2v-2z"/></svg>';
    badge = el('span', 'itzi-fab-badge', '1');
    fab.appendChild(badge);
    document.body.appendChild(fab);

    /* Panel */
    panel = el('div', null);
    panel.id = 'itzi-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat con Itzi, asistente de ITZGA');
    panel.innerHTML =
      '<div class="itzi-head">' +
        '<div class="itzi-avatar">I</div>' +
        '<div><div class="itzi-title">Itzi · Asistente ITZGA</div>' +
        '<div class="itzi-sub">En línea · Responde al instante</div></div>' +
        '<button class="itzi-close" type="button" aria-label="Cerrar chat">×</button>' +
      '</div>' +
      '<div id="itzi-msgs" aria-live="polite"></div>' +
      '<div class="itzi-chips">' +
        '<button type="button" class="itzi-chip">Precios</button>' +
        '<button type="button" class="itzi-chip">Cómo pedir</button>' +
        '<button type="button" class="itzi-chip">Envíos</button>' +
        '<button type="button" class="itzi-chip">Velas comestibles</button>' +
        '<button type="button" class="itzi-chip">Horario</button>' +
      '</div>' +
      '<form class="itzi-form">' +
        '<input id="itzi-input" type="text" placeholder="Escribe tu mensaje…" autocomplete="off" aria-label="Escribe tu mensaje">' +
        '<button class="itzi-send" type="submit" aria-label="Enviar">➤</button>' +
      '</form>';
    document.body.appendChild(panel);

    msgs = panel.querySelector('#itzi-msgs');
    input = panel.querySelector('#itzi-input');

    function toggle(open) {
      var willOpen = open != null ? open : !panel.classList.contains('itzi-open');
      panel.classList.toggle('itzi-open', willOpen);
      if (willOpen) {
        if (badge) badge.style.display = 'none';
        if (!greeted) {
          greeted = true;
          addMsg('¡Hola! Soy Itzi, la asistente de ITZGA. ¿Te ayudo con precios, un pedido o los envíos?', 'bot');
        }
        input.focus();
      }
    }

    fab.addEventListener('click', function () { toggle(); });
    panel.querySelector('.itzi-close').addEventListener('click', function () { toggle(false); });
    panel.querySelector('.itzi-form').addEventListener('submit', function (e) {
      e.preventDefault();
      send();
    });
    var chips = panel.querySelectorAll('.itzi-chip');
    for (var i = 0; i < chips.length; i++) {
      chips[i].addEventListener('click', function () { send(this.textContent); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') toggle(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
