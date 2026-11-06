document.querySelectorAll(".grid").forEach(function(g){var tb=g.previousElementSibling,cs=[],cards=g.querySelectorAll(".card");if(!tb||!tb.classList.contains("tabs"))return;cards.forEach(function(c){if(cs.indexOf(c.dataset.c)<0)cs.push(c.dataset.c)});if(cs.length<2)return;
function s(k){tb.innerHTML="";["All"].concat(cs).forEach(function(x){var b=document.createElement("button");b.type="button";b.textContent=x;if(x==k)b.className="on";b.onclick=function(){s(x)};tb.appendChild(b)});cards.forEach(function(c){c.hidden=!(k=="All"||c.dataset.c==k)})}s("All")});

(function(){var EM="itzgaoficial@gmail.com",d=document,cart=[];
try{cart=JSON.parse(localStorage.getItem("itzga_cart")||"[]")}catch(e){}
function save(){try{localStorage.setItem("itzga_cart",JSON.stringify(cart))}catch(e){}}
function el(h){var t=d.createElement("div");t.innerHTML=h;return t.firstChild}
var fab=el('<button class="fab" id="fab" aria-label="View order">🛍<span id="cnt">0</span></button>'),
dr=el('<aside class="drawer" id="drawer"><div class="dh"><h3>Your order</h3><button class="x" data-close>×</button></div><div id="items"></div><div class="df"><a class="btn wab" id="sendwa" href="#" target="_blank" rel="noopener">Send via WhatsApp</a><a class="btn o" id="send" href="#" target="_blank" rel="noopener">Send by email</a><button class="btn o" id="copy" type="button">Copy order</button><p class="note">We’ll reply with prices and availability.</p></div></aside>'),
md=el('<div class="modal" id="modal"><div class="mb"><button class="x" data-close>×</button><img id="mi" alt=""><div class="mt"><span class="tag" id="mtag"></span><h3 id="mn"></h3><p id="md" style="margin:0;color:var(--mut)"></p><ul id="ml"></ul><button class="btn" id="madd" type="button">Add to order</button></div></div></div>'),
ts=el('<div class="toast" id="toast"></div>');
d.body.append(fab,dr,md,ts);
function $(i){return d.getElementById(i)}
function toast(t){ts.textContent=t;ts.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(function(){ts.classList.remove("show")},1800)}
function txt(){return "Hi, I would like to place the following order with ITZGA:\n\n"+cart.map(function(c){return "- "+c.q+" x "+c.n}).join("\n")+"\n\nThank you."}
function draw(){var n=cart.reduce(function(s,c){return s+c.q},0);$("cnt").textContent=n;$("cnt").style.display=n?"":"none";
$("items").innerHTML=cart.length?cart.map(function(c,i){return '<div class="it"><b>'+c.n+'</b><span class="q"><button data-m="'+i+'">−</button>'+c.q+'<button data-p="'+i+'">+</button></span></div>'}).join(""):'<p class="note" style="padding:20px 0">You haven’t added anything yet. Tap "Add to order" on any product.</p>';
$("send").style.display=$("copy").style.display=$("sendwa").style.display=cart.length?"":"none";$("sendwa").href="https://wa.me/525567337838?text="+encodeURIComponent(txt());$("send").href="mailto:"+EM+"?subject="+encodeURIComponent("ITZGA order")+"&body="+encodeURIComponent(txt())}
function copy(t,m){try{navigator.clipboard.writeText(t).then(function(){toast(m)},fb)}catch(e){fb()}function fb(){var a=d.createElement("textarea");a.value=t;d.body.appendChild(a);a.select();try{d.execCommand("copy");toast(m)}catch(e){toast("Couldn’t copy")}a.remove()}}
function add(n){var c=cart.filter(function(x){return x.n==n})[0];if(c)c.q++;else cart.push({n:n,q:1});save();draw();toast("Added: "+n);fab.classList.remove("bump");void fab.offsetWidth;fab.classList.add("bump")}
function close(){dr.classList.remove("open");md.classList.remove("show")}
d.addEventListener("click",function(e){var t=e.target,a=t.closest(".add");
if(a){add(a.dataset.n);return}
if(t.closest("[data-close]")||t===md){close();return}
if(t.closest("#fab")){draw();dr.classList.add("open");return}
if(t.closest("#madd")){add(t.closest("#madd").dataset.n);return}
var p=t.closest("[data-p]"),m=t.closest("[data-m]");
if(p){cart[p.dataset.p].q++;save();draw();return}
if(m){var i=m.dataset.m;if(--cart[i].q<1)cart.splice(i,1);save();draw();return}
if(t.closest("#copy")){copy(txt(),"Order copied");return}
if(t.closest("#copymail")){copy(EM,"Email copied");return}
var c=t.closest(".card");if(c&&c.querySelector(".add")){var u=c.querySelector("ul");$("mi").src=c.querySelector("img").src;$("mn").textContent=c.querySelector("h3").textContent;$("mtag").textContent=c.querySelector(".tag").textContent;$("md").textContent=c.querySelector("p").textContent;$("ml").innerHTML=u?u.innerHTML:"";$("madd").dataset.n=c.querySelector(".add").dataset.n;md.classList.add("show")}});
d.addEventListener("keydown",function(e){if(e.key=="Escape")close()});
var f=$("cform");if(f)f.addEventListener("submit",function(e){e.preventDefault();var b="Name: "+$("cn").value+"\nEmail: "+$("ce").value+"\n\n"+$("cm").value,u="mailto:"+EM+"?subject="+encodeURIComponent($("cs").value+" - ITZGA")+"&body="+encodeURIComponent(b);
var a=d.createElement("a");a.href=u;a.target="_blank";a.rel="noopener";d.body.appendChild(a);a.click();a.remove();$("cnote").textContent="If your email app didn’t open, write to us at "+EM+" (you can copy it with the button on the left)."});
addEventListener("scroll",function(){d.querySelectorAll("nav").forEach(function(n){n.classList.toggle("sc",scrollY>10)})},{passive:true});
var io=window.IntersectionObserver?new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12}):null;
function obs(){d.querySelectorAll(".card:not(.rv),.vals div:not(.rv),section h2:not(.rv),.cinfo:not(.rv),.cform:not(.rv),.bot:not(.rv),.tile:not(.rv),.story>*:not(.rv),.empty:not(.rv)").forEach(function(x){x.classList.add("rv");if(io)io.observe(x);else x.classList.add("in")})}
obs();new MutationObserver(obs).observe(d.body,{childList:true,subtree:true});
draw()})();

(function(){document.addEventListener("click",function(e){var t=e.target,bg=t.closest(".bg");if(bg){bg.closest("nav").classList.toggle("open");return}
var dt=t.closest(".dt");if(dt){e.stopPropagation();var dd=dt.parentNode,o=dd.classList.contains("open");document.querySelectorAll(".dd").forEach(function(y){y.classList.remove("open")});if(!o)dd.classList.add("open");return}
if(!t.closest(".dd"))document.querySelectorAll(".dd").forEach(function(y){y.classList.remove("open")})})})();
(function(){var d=document,WA="525567337838";var a=d.createElement("a");a.className="wa";a.href="https://wa.me/"+WA+"?text="+encodeURIComponent("Hi ITZGA, I would like information about your soaps and candles.");a.target="_blank";a.rel="noopener";a.setAttribute("aria-label","Message us on WhatsApp");a.innerHTML='<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';d.body.appendChild(a);
var b=d.getElementById("cwa");if(b)b.addEventListener("click",function(){var f=d.getElementById("cform");if(!f.reportValidity())return;var t="Hi ITZGA, I am "+d.getElementById("cn").value+" ("+d.getElementById("ce").value+").\n"+d.getElementById("cs").value+": "+d.getElementById("cm").value;window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(t),"_blank","noopener")})})();
