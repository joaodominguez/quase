/* ---------------------------------------------------------------
   quase.pt — mapa ilustrado
   O SVG já vem completo do gerador e é navegável sem JavaScript:
   cada ponto é uma ligação com <title>. Isto só acrescenta um cartão
   ao passar o rato, que o SVG sozinho não sabe fazer.
   --------------------------------------------------------------- */
(function () {
  "use strict";
  var svg = document.querySelector(".mapa");
  if (!svg) return;

  var dados = {};
  try {
    JSON.parse(document.getElementById("dados-sitios").textContent)
      .forEach(function (s) { dados[s.id] = s; });
  } catch (e) { return; }

  var cartao = document.createElement("div");
  cartao.className = "mapa-balao";
  cartao.hidden = true;
  svg.parentNode.appendChild(cartao);

  function mostrar(alvo) {
    var s = dados[alvo.getAttribute("data-id")];
    if (!s) return;
    var bits = [];
    if (s.temp !== null && s.temp !== undefined) bits.push(String(s.temp).replace(".", ",") + "°");
    if (s.preco !== null && s.preco !== undefined) bits.push(String(s.preco).replace(".", ",") + " €");
    if (s.avaliacao) bits.push(s.avaliacao);

    cartao.innerHTML = "";
    if (s.imagem) {
      var i = document.createElement("img");
      i.src = s.imagem; i.alt = ""; i.loading = "lazy";
      cartao.appendChild(i);
    }
    var c = document.createElement("div");
    c.className = "mapa-balao-corpo";
    var n = document.createElement("strong"); n.textContent = s.nome;
    var o = document.createElement("span"); o.className = "onde"; o.textContent = s.onde;
    c.appendChild(n); c.appendChild(o);
    if (bits.length) {
      var d = document.createElement("span"); d.className = "dados"; d.textContent = bits.join(" · ");
      c.appendChild(d);
    }
    cartao.appendChild(c);

    // Posicionar dentro da tela, sem sair pelas bordas.
    var cx = alvo.getBoundingClientRect();
    var pai = svg.parentNode.getBoundingClientRect();
    cartao.hidden = false;
    var l = cx.left - pai.left + cx.width / 2 - cartao.offsetWidth / 2;
    l = Math.max(8, Math.min(l, pai.width - cartao.offsetWidth - 8));
    cartao.style.left = l + "px";
    cartao.style.top = (cx.top - pai.top - cartao.offsetHeight - 12) + "px";
  }

  function esconder() { cartao.hidden = true; }

  svg.querySelectorAll(".ponto").forEach(function (p) {
    p.addEventListener("mouseenter", function () { mostrar(p); });
    p.addEventListener("mouseleave", esconder);
    var lig = p.closest("a");
    if (lig) {
      lig.addEventListener("focus", function () { mostrar(p); });
      lig.addEventListener("blur", esconder);
    }
  });
  svg.addEventListener("mouseleave", esconder);
})();
