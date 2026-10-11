// Theme: follow the device setting unless the visitor has picked one with the button.
(function () {
  var KEY = "kf-theme";
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function apply(theme) { document.documentElement.setAttribute("data-theme", theme); }
  apply(saved() || (media.matches ? "dark" : "light"));
  media.addEventListener("change", function (e) { if (!saved()) apply(e.matches ? "dark" : "light"); });

  function label(btn) {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    btn.title = btn.getAttribute("aria-label");
  }
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    label(btn);
    btn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label(btn);
    });
  });
})();
