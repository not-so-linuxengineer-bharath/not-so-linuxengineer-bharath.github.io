/* terminal-native portfolio — vanilla JS, no deps */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* year in footer */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- typed command in the hero ---- */
  var typed = document.getElementById("typed");
  var afterType = document.getElementById("after-type");
  if (typed) {
    var text = typed.getAttribute("data-text") || "";
    if (reduce) {
      typed.textContent = text;
      if (afterType) afterType.style.opacity = 1;
    } else {
      var i = 0;
      (function tick() {
        if (i <= text.length) {
          typed.textContent = text.slice(0, i);
          i++;
          setTimeout(tick, 55);
        } else if (afterType) {
          afterType.style.transition = "opacity .4s ease";
          afterType.style.opacity = 1;
        }
      })();
    }
  }

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- animate the metric bars when visible ---- */
  function fillBars(container) {
    container.querySelectorAll(".bar-fill").forEach(function (b) {
      b.style.width = (b.getAttribute("data-w") || "0") + "%";
    });
  }
  var metric = document.querySelector(".metric");
  if (metric) {
    if (reduce || !("IntersectionObserver" in window)) {
      fillBars(metric);
    } else {
      var mo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { fillBars(metric); mo.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      mo.observe(metric);
    }
  }

  /* ---- click-to-copy commands ---- */
  document.querySelectorAll(".cmd-copy").forEach(function (el) {
    el.addEventListener("click", function () {
      var code = el.querySelector("code");
      var label = el.querySelector(".copy");
      if (!code) return;
      var txt = code.textContent;
      var done = function () {
        if (!label) return;
        var prev = label.textContent;
        label.textContent = "copied!";
        setTimeout(function () { label.textContent = prev; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  });
})();
