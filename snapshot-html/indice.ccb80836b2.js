/* ---------------------------------------------------------------
   quase.pt — filtros do índice, que é a entrada
   Sem dependências. A página funciona sem isto: os 103 já vêm todos
   no HTML e os filtros só reduzem.

   Os filtros são os campos com cobertura real — categoria (100%),
   região (100%), distância de carro (63%) e presença de preço ou
   fotografia. A temperatura não filtra nada: está medida em 7 de 103.
   --------------------------------------------------------------- */
(function () {
  "use strict";

  var raiz = document.getElementById("indice");
  var lista = document.getElementById("lista-sitios");
  var conta = document.getElementById("f-contagem");
  if (!raiz || !lista || !conta) return;

  var D = [];
  try {
    D = JSON.parse(document.getElementById("dados-sitios").textContent);
  } catch (e) { return; }

  // Guardar os cartões já desenhados pelo gerador: reordenar e esconder é
  // mais barato e mais fiel do que voltar a construí-los em JavaScript.
  // A ordem do JSON não é a ordem da grelha: o gerador ordena pelo que sabemos
  // de cada sítio. Percorre-se o DOM, que é a ordem que a pessoa vê — senão os
  // "primeiros 12" seriam doze quaisquer, espalhados pela página.
  var porId = {};
  D.forEach(function (s) { porId[s.id] = s; });
  var ordem = Array.prototype.map.call(lista.children, function (li) {
    return { li: li, s: porId[li.getAttribute("data-id")] };
  }).filter(function (x) { return x.s; });

  // Os 103 estão todos no HTML — é assim que os motores os veem e é assim que
  // a página funciona sem JavaScript. Aqui só se colapsa a vista a 12, porque
  // cento e três de uma vez é um muro.
  var LOTE = 12;

  var estado = {
    tipos: { "termas": true, "hotel-termal": true, "hotel": true,
             "jacuzzi-no-quarto": true, "motel": true },
    onde: null, carro: null, tem: {}, tudo: false,
  };

  var mais = document.createElement("button");
  mais.type = "button";
  mais.className = "mostrar-mais";
  lista.parentNode.insertBefore(mais, lista.nextSibling);
  mais.addEventListener("click", function () {
    estado.tudo = true;
    render();
    // Levar o foco ao primeiro cartão que acabou de aparecer, para quem
    // navega por teclado não ficar perdido no fim da página.
    var novo = lista.querySelector("li:not([hidden]) ~ li:not([hidden]) a");
    if (novo) mais.blur();
  });

  function passa(s) {
    if (!estado.tipos[s.categoria]) return false;
    if (estado.onde && s.regiao !== estado.onde) return false;
    if (estado.carro) {
      var p = estado.carro.split("-");
      var h = s[p[0]];
      if (h === null || h === undefined || h > parseFloat(p[1])) return false;
    }
    if (estado.tem.preco && s.preco === null) return false;
    if (estado.tem.foto && !s.imagem) return false;
    return true;
  }

  function render() {
    var n = 0, vistos = 0;
    ordem.forEach(function (x) {
      var ok = passa(x.s);
      if (ok) {
        n++;
        var cabe = estado.tudo || vistos < LOTE;
        x.li.hidden = !cabe;
        if (cabe) vistos++;
      } else {
        x.li.hidden = true;
      }
    });

    var restam = n - vistos;
    mais.hidden = restam <= 0;
    mais.textContent = restam > 0
      ? (n === ordem.length ? "Ver os outros " + restam : "Ver os outros " + restam + " de " + n)
      : "";

    if (n === 0) {
      conta.innerHTML = "<b>Nenhum</b> corresponde a estes filtros. ";
      var b = document.createElement("button");
      b.type = "button"; b.className = "filtro"; b.textContent = "Mostrar todos";
      b.addEventListener("click", limpar);
      conta.appendChild(b);
    } else if (n === ordem.length) {
      conta.innerHTML = "<b>" + n + "</b> sítios. Ordenados pelo que sabemos de cada um, não por qualidade — ainda não visitámos nenhum.";
    } else {
      conta.innerHTML = "<b>" + n + "</b> de " + D.length + ".";
    }
  }

  function limpar() {
    estado.tipos = { "termas": true, "hotel-termal": true, "hotel": true,
                     "jacuzzi-no-quarto": true, "motel": true };
    estado.onde = null; estado.carro = null; estado.tem = {}; estado.tudo = false;
    Array.prototype.forEach.call(raiz.querySelectorAll(".filtro"), function (b) {
      b.setAttribute("aria-pressed", b.hasAttribute("data-tipo") ? "true" : "false");
    });
    render();
  }

  raiz.addEventListener("click", function (ev) {
    var b = ev.target.closest(".filtro");
    if (!b || !raiz.contains(b)) return;
    var ligado = b.getAttribute("aria-pressed") === "true";

    if (b.hasAttribute("data-tipo")) {
      estado.tipos[b.getAttribute("data-tipo")] = !ligado;
      b.setAttribute("aria-pressed", !ligado);
    } else if (b.hasAttribute("data-onde")) {
      var o = b.getAttribute("data-onde");
      estado.onde = ligado ? null : o;
      // Região é exclusiva: escolher Madeira desliga Açores.
      Array.prototype.forEach.call(raiz.querySelectorAll("[data-onde]"), function (x) {
        x.setAttribute("aria-pressed", !ligado && x.getAttribute("data-onde") === o);
      });
    } else if (b.hasAttribute("data-carro")) {
      var c = b.getAttribute("data-carro");
      estado.carro = ligado ? null : c;
      Array.prototype.forEach.call(raiz.querySelectorAll("[data-carro]"), function (x) {
        x.setAttribute("aria-pressed", !ligado && x.getAttribute("data-carro") === c);
      });
    } else if (b.hasAttribute("data-tem")) {
      var t = b.getAttribute("data-tem");
      estado.tem[t] = !ligado;
      b.setAttribute("aria-pressed", !ligado);
    }
    estado.tudo = false;
    render();
  });

  raiz.addEventListener("submit", function (e) { e.preventDefault(); });
  render();
})();
