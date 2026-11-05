document.querySelectorAll(".grid").forEach(function(g){var tb=g.previousElementSibling,cs=[],cards=g.querySelectorAll(".card");if(!tb||!tb.classList.contains("tabs"))return;cards.forEach(function(c){if(cs.indexOf(c.dataset.c)<0)cs.push(c.dataset.c)});if(cs.length<2)return;
function s(k){tb.innerHTML="";["Todas"].concat(cs).forEach(function(x){var b=document.createElement("button");b.type="button";b.textContent=x;if(x==k)b.className="on";b.onclick=function(){s(x)};tb.appendChild(b)});cards.forEach(function(c){c.hidden=!(k=="Todas"||c.dataset.c==k)})}s("Todas")});

(function(){var EM="itzgaoficial@gmail.com",d=document,cart=[];
try{cart=JSON.parse(localStorage.getItem("itzga_cart")||"[]")}catch(e){}
function save(){try{localStorage.setItem("itzga_cart",JSON.stringify(cart))}catch(e){}}
function el(h){var t=d.createElement("div");t.innerHTML=h;return t.firstChild}
var fab=el('<button class="fab" id="fab" aria-label="Ver pedido">🛍<span id="cnt">0</span></button>'),
dr=el('<aside class="drawer" id="drawer"><div class="dh"><h3>Tu pedido</h3><button class="x" data-close>×</button></div><div id="items"></div><div class="df"><a class="btn" id="send" href="#" target="_blank" rel="noopener">Enviar por correo</a><button class="btn o" id="copy" type="button">Copiar pedido</button><p class="note">Te responderemos con precios y disponibilidad.</p></div></aside>'),
md=el('<div class="modal" id="modal"><div class="mb"><button class="x" data-close>×</button><img id="mi" alt=""><div class="mt"><span class="tag" id="mtag"></span><h3 id="mn"></h3><p id="md" style="margin:0;color:var(--mut)"></p><ul id="ml"></ul><button class="btn" id="madd" type="button">Agregar al pedido</button></div></div></div>'),
ts=el('<div class="toast" id="toast"></div>');
d.body.append(fab,dr,md,ts);
function $(i){return d.getElementById(i)}
function toast(t){ts.textContent=t;ts.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(function(){ts.classList.remove("show")},1800)}
function txt(){return "Hola, quiero hacer el siguiente pedido a ITZGA:\n\n"+cart.map(function(c){return "- "+c.q+" x "+c.n}).join("\n")+"\n\nGracias."}
function draw(){var n=cart.reduce(function(s,c){return s+c.q},0);$("cnt").textContent=n;$("cnt").style.display=n?"":"none";
$("items").innerHTML=cart.length?cart.map(function(c,i){return '<div class="it"><b>'+c.n+'</b><span class="q"><button data-m="'+i+'">−</button>'+c.q+'<button data-p="'+i+'">+</button></span></div>'}).join(""):'<p class="note" style="padding:20px 0">Aún no has agregado nada. Toca "Agregar al pedido" en cualquier producto.</p>';
$("send").style.display=$("copy").style.display=cart.length?"":"none";$("send").href="mailto:"+EM+"?subject="+encodeURIComponent("Pedido ITZGA")+"&body="+encodeURIComponent(txt())}
function copy(t,m){try{navigator.clipboard.writeText(t).then(function(){toast(m)},fb)}catch(e){fb()}function fb(){var a=d.createElement("textarea");a.value=t;d.body.appendChild(a);a.select();try{d.execCommand("copy");toast(m)}catch(e){toast("No se pudo copiar")}a.remove()}}
function add(n){var c=cart.filter(function(x){return x.n==n})[0];if(c)c.q++;else cart.push({n:n,q:1});save();draw();toast("Agregado: "+n);fab.classList.remove("bump");void fab.offsetWidth;fab.classList.add("bump")}
function close(){dr.classList.remove("open");md.classList.remove("show")}
d.addEventListener("click",function(e){var t=e.target,a=t.closest(".add");
if(a){add(a.dataset.n);return}
if(t.closest("[data-close]")||t===md){close();return}
if(t.closest("#fab")){draw();dr.classList.add("open");return}
if(t.closest("#madd")){add(t.closest("#madd").dataset.n);return}
var p=t.closest("[data-p]"),m=t.closest("[data-m]");
if(p){cart[p.dataset.p].q++;save();draw();return}
if(m){var i=m.dataset.m;if(--cart[i].q<1)cart.splice(i,1);save();draw();return}
if(t.closest("#copy")){copy(txt(),"Pedido copiado");return}
if(t.closest("#copymail")){copy(EM,"Correo copiado");return}
var c=t.closest(".card");if(c&&c.querySelector(".add")){var u=c.querySelector("ul");$("mi").src=c.querySelector("img").src;$("mn").textContent=c.querySelector("h3").textContent;$("mtag").textContent=c.querySelector(".tag").textContent;$("md").textContent=c.querySelector("p").textContent;$("ml").innerHTML=u?u.innerHTML:"";$("madd").dataset.n=c.querySelector(".add").dataset.n;md.classList.add("show")}});
d.addEventListener("keydown",function(e){if(e.key=="Escape")close()});
var f=$("cform");if(f)f.addEventListener("submit",function(e){e.preventDefault();var b="Nombre: "+$("cn").value+"\nCorreo: "+$("ce").value+"\n\n"+$("cm").value,u="mailto:"+EM+"?subject="+encodeURIComponent($("cs").value+" - ITZGA")+"&body="+encodeURIComponent(b);
var a=d.createElement("a");a.href=u;a.target="_blank";a.rel="noopener";d.body.appendChild(a);a.click();a.remove();$("cnote").textContent="Si no se abrió tu correo, escríbenos a "+EM+" (puedes copiarlo con el botón de la izquierda)."});
var nv=d.querySelector("nav");addEventListener("scroll",function(){nv.classList.toggle("sc",scrollY>10)},{passive:true});
var io=window.IntersectionObserver?new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12}):null;
function obs(){d.querySelectorAll(".card:not(.rv),.vals div:not(.rv),section h2:not(.rv),.cinfo:not(.rv),.cform:not(.rv),.bot:not(.rv),.tile:not(.rv),.story>*:not(.rv),.empty:not(.rv)").forEach(function(x){x.classList.add("rv");if(io)io.observe(x);else x.classList.add("in")})}
obs();new MutationObserver(obs).observe(d.body,{childList:true,subtree:true});
draw()})();

(function(){var nv=document.querySelector("nav"),b=nv.querySelector(".bg");b.addEventListener("click",function(){nv.classList.toggle("open")});
nv.querySelectorAll(".dt").forEach(function(x){x.addEventListener("click",function(e){e.stopPropagation();var o=x.parentNode.classList.contains("open");nv.querySelectorAll(".dd").forEach(function(y){y.classList.remove("open")});if(!o)x.parentNode.classList.add("open")})});
document.addEventListener("click",function(e){if(!e.target.closest(".dd"))nv.querySelectorAll(".dd").forEach(function(y){y.classList.remove("open")})})})();
