(function(){
var d=document,W=window,CFG=W.ITZGA||{},EM="itzgaoficial@gmail.com",WA="525567337838";
var L=(d.documentElement.lang||"es").slice(0,2)=="en"?"en":"es";
var T={es:{all:"Todas",view:"Ver pedido",your:"Tu pedido",sendwa:"Enviar por WhatsApp",sendmail:"Enviar por correo",copy:"Copiar pedido",note:"El equipo ITZGA confirmará precios y disponibilidad al recibir tu pedido.",add:"Agregar al pedido",hi:"Hola, quiero hacer el siguiente pedido a ITZGA:",thanks:"Gracias.",empty:"Aún no has agregado nada. Toca \"Agregar al pedido\" en cualquier producto.",subj:"Pedido ITZGA",added:"Agregado: ",copied:"Pedido copiado",mcopied:"Correo copiado",cfail:"No se pudo copiar",nm:"Nombre: ",em:"Correo: ",fb1:"Si no se abrió tu correo, escríbenos a ",fb2:" (puedes copiarlo con el botón de la izquierda).",wah:"Hola ITZGA, me gustaría información sobre sus jabones y velas.",waa:"Escribir por WhatsApp",was:"Hola ITZGA, soy ",ask:"Consultar precio",sub:"Subtotal",subp:"Subtotal (productos con precio)",quote:" por cotizar",ship:"Envío: por confirmar",each:" c/u",sending:"Enviando…",sent:"¡Mensaje enviado! Te responderemos pronto.",serr:"No se pudo enviar. Escríbenos por WhatsApp o a ",smsg:"Enviar mensaje",close:"Cerrar",sph:"Buscar en esta colección…",sar:"Buscar productos en esta colección",nores:"No encontramos productos con esa búsqueda. Prueba con otro nombre.",p1:" producto",pn:" productos",f1:" encontrado",fn:" encontrados"},
en:{all:"All",view:"View order",your:"Your order",sendwa:"Send via WhatsApp",sendmail:"Send by email",copy:"Copy order",note:"The ITZGA team will confirm prices and availability when we receive your order.",add:"Add to order",hi:"Hi, I would like to place the following order with ITZGA:",thanks:"Thank you.",empty:"You haven’t added anything yet. Tap \"Add to order\" on any product.",subj:"ITZGA order",added:"Added: ",copied:"Order copied",mcopied:"Email copied",cfail:"Couldn’t copy",nm:"Name: ",em:"Email: ",fb1:"If your email app didn’t open, write to us at ",fb2:" (you can copy it with the button on the left).",wah:"Hi ITZGA, I would like information about your soaps and candles.",waa:"Message us on WhatsApp",was:"Hi ITZGA, I am ",ask:"Ask for price",sub:"Subtotal",subp:"Subtotal (priced items)",quote:" to be quoted",ship:"Shipping: to be confirmed",each:" each",sending:"Sending…",sent:"Message sent! We’ll reply soon.",serr:"Couldn’t send. Write to us on WhatsApp or at ",smsg:"Send message",close:"Close",sph:"Search this collection…",sar:"Search products in this collection",nores:"No products match your search. Try another name.",p1:" product",pn:" products",f1:" found",fn:" found"}}[L];
function $(i){return d.getElementById(i)}
function C(i){return d.getElementById(L=="en"&&d.getElementById(i+"_en")?i+"_en":i)}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function price(k){var P=CFG.prices||{},pr=P.products||{},px=P.prefix||{},best=null,bl=0;if(!k)return null;if(pr[k]!=null&&pr[k]!=="")return +pr[k];for(var p in px){if(k.indexOf(p)==0&&p.length>bl&&px[p]!=null&&px[p]!==""){best=+px[p];bl=p.length}}return best}
function fmt(n){try{return new Intl.NumberFormat(L=="en"?"en-US":"es-MX",{style:"currency",currency:CFG.currency||"MXN",maximumFractionDigits:0}).format(n)}catch(e){return "$"+n}}
/* catálogo: pestañas + buscador (sin distinguir acentos) */
function norm(s){return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}
d.querySelectorAll("main .grid").forEach(function(g){var tb=g.previousElementSibling,cs=[],cards=Array.prototype.slice.call(g.querySelectorAll(".card"));if(!tb||!tb.classList.contains("tabs")||!cards.length)return;
cards.forEach(function(c){if(c.dataset.c&&cs.indexOf(c.dataset.c)<0)cs.push(c.dataset.c)});var active=null,query="";
var wrap=d.createElement("div");wrap.className="catalog-search";var input=d.createElement("input");input.type="search";input.placeholder=T.sph;input.setAttribute("aria-label",T.sar);wrap.appendChild(input);g.parentNode.insertBefore(wrap,g);
var count=d.createElement("p");count.className="catalog-count";count.setAttribute("aria-live","polite");g.parentNode.insertBefore(count,g);
var empty=d.createElement("p");empty.className="no-results";empty.textContent=T.nores;empty.hidden=true;g.appendChild(empty);
function render(){var v=0;cards.forEach(function(c){var ok=!active||c.dataset.c==active,hay=norm(c.textContent+" "+((c.querySelector("img")||{}).alt||"")),mt=!query||hay.indexOf(query)>-1;c.hidden=!(ok&&mt);if(!c.hidden)v++});count.textContent=v+(v==1?T.p1:T.pn)+(query?(v==1?T.f1:T.fn):"");empty.hidden=v!==0}
function s(k){active=k;tb.innerHTML="";if(cs.length>1){[T.all].concat(cs).forEach(function(x){var b=d.createElement("button");b.type="button";b.textContent=x;var on=x==(k||T.all);if(on)b.className="on";b.setAttribute("aria-pressed",String(on));b.onclick=function(){s(x==T.all?null:x)};tb.appendChild(b)})}render()}
s(null);input.addEventListener("input",function(){query=norm(input.value.trim());render()})});
/* carrito */
var cart=[];try{cart=JSON.parse(localStorage.getItem("itzga_cart")||"[]")}catch(e){}
function save(){try{localStorage.setItem("itzga_cart",JSON.stringify(cart))}catch(e){}}
function el(h){var t=d.createElement("div");t.innerHTML=h;return t.firstChild}
var fab=el('<button class="fab" id="fab" aria-label="'+T.view+'">🛍<span id="cnt">0</span></button>'),
dr=el('<aside class="drawer" id="drawer" aria-label="'+T.your+'"><div class="dh"><h3>'+T.your+'</h3><button class="x" data-close aria-label="'+T.close+'">×</button></div><div id="items"></div><div class="tot" id="tot"></div><div class="df"><a class="btn wab" id="sendwa" href="#" target="_blank" rel="noopener">'+T.sendwa+'</a><a class="btn o" id="send" href="#" target="_blank" rel="noopener">'+T.sendmail+'</a><button class="btn o" id="copy" type="button">'+T.copy+'</button><p class="note">'+T.note+'</p></div></aside>'),
md=el('<div class="modal" id="modal"><div class="mb"><button class="x" data-close aria-label="'+T.close+'">×</button><img id="mi" alt=""><div class="mt"><span class="tag" id="mtag"></span><h3 id="mn"></h3><p id="md" style="margin:0;color:var(--mut)"></p><ul id="ml"></ul><p class="price" id="mp"></p><button class="btn" id="madd" type="button">'+T.add+'</button></div></div></div>'),
ts=el('<div class="toast" id="toast"></div>');
d.body.append(fab,dr,md,ts);
function toast(t){ts.textContent=t;ts.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(function(){ts.classList.remove("show")},1800)}
function calc(){var tot=0,np=0,any=false,rows=cart.map(function(c){var p=price(c.k);if(p==null)np++;else{tot+=p*c.q;any=true}return{c:c,p:p}});return{rows:rows,tot:tot,np:np,any:any}}
function txt(){var o=calc();return T.hi+"\n\n"+o.rows.map(function(r){return "- "+r.c.q+" x "+r.c.n+(r.p!=null?" — "+fmt(r.p*r.c.q):"")}).join("\n")+(o.any?"\n\n"+(o.np?T.subp:T.sub)+": "+fmt(o.tot)+(o.np?" + "+o.np+T.quote:"")+"\n"+T.ship:"")+"\n\n"+T.thanks}
function draw(){var o=calc(),n=cart.reduce(function(s,c){return s+c.q},0);$("cnt").textContent=n;$("cnt").style.display=n?"":"none";
$("items").innerHTML=cart.length?o.rows.map(function(r,i){return '<div class="it"><div><b>'+esc(r.c.n)+'</b>'+(r.p!=null?'<small>'+fmt(r.p)+T.each+'</small>':'')+'</div><span class="q"><button type="button" aria-label="−" data-m="'+i+'">−</button>'+r.c.q+'<button type="button" aria-label="+" data-p="'+i+'">+</button></span></div>'}).join(""):'<p class="note" style="padding:20px 0">'+T.empty+'</p>';
$("tot").innerHTML=o.any?'<div><span>'+(o.np?T.subp:T.sub)+'</span><b>'+fmt(o.tot)+'</b></div>'+(o.np?'<div><span>'+o.np+T.quote+'</span></div>':'')+'<span class="sm">'+T.ship+'</span>':'';
$("send").style.display=$("copy").style.display=$("sendwa").style.display=cart.length?"":"none";
$("sendwa").href="https://wa.me/"+WA+"?text="+encodeURIComponent(txt());$("send").href="mailto:"+EM+"?subject="+encodeURIComponent(T.subj)+"&body="+encodeURIComponent(txt())}
function copy(t,m){function fb(){var a=d.createElement("textarea");a.value=t;d.body.appendChild(a);a.select();try{d.execCommand("copy");toast(m)}catch(e){toast(T.cfail)}a.remove()}try{navigator.clipboard.writeText(t).then(function(){toast(m)},fb)}catch(e){fb()}}
function add(n,k){var c=cart.filter(function(x){return x.n==n})[0];if(c){c.q++;if(!c.k)c.k=k}else cart.push({n:n,q:1,k:k});save();draw();toast(T.added+n);fab.classList.remove("bump");void fab.offsetWidth;fab.classList.add("bump")}
function close(){dr.classList.remove("open");md.classList.remove("show")}
/* precios en tarjetas */
d.querySelectorAll(".card").forEach(function(c){var b=c.querySelector(".add");if(!b||c.querySelector(".price"))return;var p=price(b.dataset.k),e=d.createElement("p");e.className="price"+(p==null?" ask":"");e.textContent=p==null?T.ask:fmt(p);b.parentNode.insertBefore(e,b)});
d.addEventListener("click",function(e){var t=e.target,a=t.closest(".add");
if(a){add(a.dataset.n,a.dataset.k);return}
if(t.closest("[data-close]")||t===md){close();return}
if(t.closest("#fab")){draw();dr.classList.add("open");return}
var ma=t.closest("#madd");if(ma){add(ma.dataset.n,ma.dataset.k);return}
var p=t.closest("[data-p]"),m=t.closest("[data-m]");
if(p){cart[p.dataset.p].q++;save();draw();return}
if(m){var i=m.dataset.m;if(--cart[i].q<1)cart.splice(i,1);save();draw();return}
if(t.closest("#copy")){copy(txt(),T.copied);return}
if(t.closest("#copymail,#copymail_en")){copy(EM,T.mcopied);return}
var c=t.closest(".card");if(c&&c.querySelector(".add")){var u=c.querySelector("ul"),b=c.querySelector(".add"),pp=price(b.dataset.k);$("mi").src=c.querySelector("img").src;$("mn").textContent=c.querySelector("h3").textContent;$("mtag").textContent=c.querySelector(".tag").textContent;$("md").textContent=c.querySelector("p").textContent;$("ml").innerHTML=u?u.innerHTML:"";$("mp").textContent=pp==null?T.ask:fmt(pp);$("mp").className="price"+(pp==null?" ask":"");$("madd").dataset.n=b.dataset.n;$("madd").dataset.k=b.dataset.k||"";md.classList.add("show")}});
d.addEventListener("keydown",function(e){if(e.key=="Escape")close()});
/* formulario de contacto */
var f=C("cform");if(f){var sb=C("csend"),live=!!CFG.formEndpoint;if(live&&sb)sb.textContent=T.smsg;
f.addEventListener("submit",function(e){e.preventDefault();var note=C("cnote"),bot=C("cbot");if(bot&&bot.checked)return;
if(live){note.textContent=T.sending;sb.disabled=true;var fd=new FormData();if(CFG.formKey)fd.append("access_key",CFG.formKey);fd.append("name",C("cn").value);fd.append("email",C("ce").value);fd.append("subject",C("cs").value+" - ITZGA");fd.append("message",C("cm").value);fd.append("from_name","ITZGA");
fetch(CFG.formEndpoint,{method:"POST",headers:{Accept:"application/json"},body:fd}).then(function(r){return r.json().catch(function(){return{success:r.ok}})}).then(function(j){if(j.success||j.ok){note.textContent=T.sent;f.reset()}else throw 0}).catch(function(){note.textContent=T.serr+EM+"."}).then(function(){sb.disabled=false})}
else{var b=T.nm+C("cn").value+"\n"+T.em+C("ce").value+"\n\n"+C("cm").value,u="mailto:"+EM+"?subject="+encodeURIComponent(C("cs").value+" - ITZGA")+"&body="+encodeURIComponent(b),a=d.createElement("a");a.href=u;a.target="_blank";a.rel="noopener";d.body.appendChild(a);a.click();a.remove();note.textContent=T.fb1+EM+T.fb2}})}
var bw=C("cwa");if(bw)bw.addEventListener("click",function(){var f2=C("cform");if(!f2.reportValidity())return;var t=T.was+C("cn").value+" ("+C("ce").value+").\n"+C("cs").value+": "+C("cm").value;W.open("https://wa.me/"+WA+"?text="+encodeURIComponent(t),"_blank","noopener")});
/* efectos */
addEventListener("scroll",function(){d.querySelectorAll("nav").forEach(function(n){n.classList.toggle("sc",scrollY>10)})},{passive:true});
var io=W.IntersectionObserver?new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12}):null;
function obs(){d.querySelectorAll(".card:not(.rv),.vals div:not(.rv),section h2:not(.rv),.cinfo:not(.rv),.cform:not(.rv),.bot:not(.rv),.tile:not(.rv),.story>*:not(.rv),.empty:not(.rv),.faq details:not(.rv)").forEach(function(x){x.classList.add("rv");if(io)io.observe(x);else x.classList.add("in")})}
obs();new MutationObserver(obs).observe(d.body,{childList:true,subtree:true});
/* menú */
d.addEventListener("click",function(e){var t=e.target,bg=t.closest(".bg");if(bg){bg.closest("nav").classList.toggle("open");return}
var dt=t.closest(".dt");if(dt){e.stopPropagation();var dd=dt.parentNode,o=dd.classList.contains("open");d.querySelectorAll(".dd").forEach(function(y){y.classList.remove("open")});if(!o)dd.classList.add("open");return}
if(!t.closest(".dd"))d.querySelectorAll(".dd").forEach(function(y){y.classList.remove("open")})});
/* botón flotante de WhatsApp */
var wa=d.createElement("a");wa.className="wa";wa.href="https://wa.me/"+WA+"?text="+encodeURIComponent(T.wah);wa.target="_blank";wa.rel="noopener";wa.setAttribute("aria-label",T.waa);wa.innerHTML='<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';d.body.appendChild(wa);
draw()})();
