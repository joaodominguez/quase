/* ---------------------------------------------------------------
   quase.pt — interruptor de tema
   Três estados: o do sistema (sem atributo), claro e escuro. O botão
   alterna entre claro e escuro a partir do que está a ser mostrado.
   --------------------------------------------------------------- */
(function () {
  "use strict";
  var b = document.getElementById("tema");
  if (!b) return;

  function actual() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  b.addEventListener("click", function () {
    var novo = actual() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", novo);
    try { localStorage.setItem("quase-tema", novo); } catch (e) { /* janela privada */ }
    document.dispatchEvent(new CustomEvent("quase:tema", { detail: novo }));
  });
})();

/* ---------------------------------------------------------------
   Menu em ecrã pequeno
   Sem JavaScript o menu fica simplesmente visível, empilhado: a classe
   .js no documento é que autoriza o CSS a escondê-lo. Ninguém fica sem
   navegação por causa de um script que não carregou.
   --------------------------------------------------------------- */
(function () {
  "use strict";
  var b = document.getElementById("menu-btn");
  var m = document.getElementById("menu");
  if (!b || !m) return;

  function abrir(sim) {
    b.setAttribute("aria-expanded", sim ? "true" : "false");
    b.setAttribute("aria-label", sim ? "Fechar menu" : "Abrir menu");
    document.documentElement.classList.toggle("menu-aberto", sim);
  }

  b.addEventListener("click", function () {
    abrir(b.getAttribute("aria-expanded") !== "true");
  });

  m.addEventListener("click", function (e) {
    if (e.target.closest("a")) abrir(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && b.getAttribute("aria-expanded") === "true") {
      abrir(false);
      b.focus();
    }
  });

  // Ao passar para ecrã largo o menu volta a ser sempre visível.
  var largo = window.matchMedia("(min-width: 940px)");
  function ajustar() { if (largo.matches) abrir(false); }
  if (largo.addEventListener) largo.addEventListener("change", ajustar);
})();
