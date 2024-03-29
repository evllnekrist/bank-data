(() => {
  // node_modules/zoom-vanilla.js/dist/zoom-vanilla.min.js
  +function() {
    "use strict";
    function e(e2) {
      var t2 = e2.getBoundingClientRect(), n2 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, o = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      return { top: t2.top + n2, left: t2.left + o };
    }
    var t = 80, n = /* @__PURE__ */ function() {
      function n2() {
        var e2 = document.createElement("img");
        e2.onload = function() {
          d = Number(e2.height), l = Number(e2.width), o();
        }, e2.src = m.currentSrc || m.src;
      }
      function o() {
        f = document.createElement("div"), f.className = "zoom-img-wrap", f.style.position = "absolute", f.style.top = e(m).top + "px", f.style.left = e(m).left + "px", v = m.cloneNode(), v.style.visibility = "hidden", m.style.width = m.offsetWidth + "px", m.parentNode.replaceChild(v, m), document.body.appendChild(f), f.appendChild(m), m.classList.add("zoom-img"), m.setAttribute("data-action", "zoom-out"), c = document.createElement("div"), c.className = "zoom-overlay", document.body.appendChild(c), i(), r();
      }
      function i() {
        m.offsetWidth;
        var e2 = l, n3 = d, o2 = e2 / m.width, i2 = window.innerHeight - t, r2 = window.innerWidth - t, s2 = e2 / n3, a2 = r2 / i2;
        u = e2 < r2 && n3 < i2 ? o2 : s2 < a2 ? i2 / n3 * o2 : r2 / e2 * o2;
      }
      function r() {
        m.offsetWidth;
        var t2 = e(m), n3 = window.pageYOffset, o2 = n3 + window.innerHeight / 2, i2 = window.innerWidth / 2, r2 = t2.top + m.height / 2, s2 = t2.left + m.width / 2, a2 = Math.round(o2 - r2), d2 = Math.round(i2 - s2), l2 = "scale(" + u + ")", c2 = "translate(" + d2 + "px, " + a2 + "px) translateZ(0)";
        m.style.webkitTransform = l2, m.style.msTransform = l2, m.style.transform = l2, f.style.webkitTransform = c2, f.style.msTransform = c2, f.style.transform = c2, document.body.classList.add("zoom-overlay-open");
      }
      function s() {
        if (document.body.classList.remove("zoom-overlay-open"), document.body.classList.add("zoom-overlay-transitioning"), m.style.webkitTransform = "", m.style.msTransform = "", m.style.transform = "", f.style.webkitTransform = "", f.style.msTransform = "", f.style.transform = "", false in document.body.style)
          return a();
        f.addEventListener("transitionend", a), f.addEventListener("webkitTransitionEnd", a);
      }
      function a() {
        m.removeEventListener("transitionend", a), m.removeEventListener("webkitTransitionEnd", a), f && f.parentNode && (m.classList.remove("zoom-img"), m.style.width = "", m.setAttribute("data-action", "zoom"), v.parentNode.replaceChild(m, v), f.parentNode.removeChild(f), c.parentNode.removeChild(c), document.body.classList.remove("zoom-overlay-transitioning"));
      }
      var d = null, l = null, c = null, u = null, m = null, f = null, v = null;
      return function(e2) {
        return m = e2, { zoomImage: n2, close: s, dispose: a };
      };
    }();
    (/* @__PURE__ */ function() {
      function e2() {
        document.body.addEventListener("click", function(e3) {
          "zoom" === e3.target.getAttribute("data-action") && "IMG" === e3.target.tagName && t2(e3);
        });
      }
      function t2(e3) {
        if (e3.stopPropagation(), !document.body.classList.contains("zoom-overlay-open")) {
          if (e3.metaKey || e3.ctrlKey)
            return o();
          i({ forceDispose: true }), m = n(e3.target), m.zoomImage(), r();
        }
      }
      function o() {
        window.open(event.target.getAttribute("data-original") || event.target.currentSrc || event.target.src, "_blank");
      }
      function i(e3) {
        e3 = e3 || { forceDispose: false }, m && (m[e3.forceDispose ? "dispose" : "close"](), s(), m = null);
      }
      function r() {
        window.addEventListener("scroll", a), document.addEventListener("click", l), document.addEventListener("keyup", d), document.addEventListener("touchstart", c), document.addEventListener("touchend", l);
      }
      function s() {
        window.removeEventListener("scroll", a), document.removeEventListener("keyup", d), document.removeEventListener("click", l), document.removeEventListener("touchstart", c), document.removeEventListener("touchend", l);
      }
      function a(e3) {
        null === f && (f = window.pageYOffset);
        var t3 = f - window.pageYOffset;
        Math.abs(t3) >= 40 && i();
      }
      function d(e3) {
        27 == e3.keyCode && i();
      }
      function l(e3) {
        e3.stopPropagation(), e3.preventDefault(), i();
      }
      function c(e3) {
        v = e3.touches[0].pageY, e3.target.addEventListener("touchmove", u);
      }
      function u(e3) {
        Math.abs(e3.touches[0].pageY - v) <= 10 || (i(), e3.target.removeEventListener("touchmove", u));
      }
      var m = null, f = null, v = null;
      return { listen: e2 };
    }()).listen();
  }();
})();
