(() => {
  // src/js/components/base/theme-color.js
  if (localStorage.getItem("theme-color") === null) {
    localStorage.setItem("theme-color", "default");
    $("html").attr("class", "default");
  } else {
    $("html").attr("class", localStorage.getItem("theme-color"));
  }
  $("html").removeClass("light dark");
  if (localStorage.getItem("appearance-mode") === null) {
    localStorage.setItem("appearance-mode", "light");
    $("html").addClass("light");
  } else {
    $("html").addClass(localStorage.getItem("appearance-mode"));
  }
  $(`[data-theme-color='${localStorage.getItem("theme-color")}']`).addClass(
    "active"
  );
  $(
    `[data-appearance-mode='${localStorage.getItem("appearance-mode")}']`
  ).addClass("active");
  $("[data-theme-color]").on("click", function() {
    localStorage.setItem("theme-color", $(this).attr("data-theme-color"));
    $("html").attr("class", $(this).attr("data-theme-color"));
    localStorage.getItem("appearance-mode") == "dark" ? $("html").addClass("dark") : $("html").addClass("light");
    $("[data-theme-color]").removeClass("active");
    $(`[data-theme-color='${localStorage.getItem("theme-color")}']`).addClass(
      "active"
    );
  });
  $("[data-appearance-mode]").on("click", function() {
    localStorage.setItem(
      "appearance-mode",
      $(this).attr("data-appearance-mode")
    );
    $("html").removeClass("light dark");
    $("html").addClass($(this).attr("data-appearance-mode"));
    $("[data-appearance-mode]").removeClass("active");
    $(
      `[data-appearance-mode='${localStorage.getItem("appearance-mode")}']`
    ).addClass("active");
    isDark = ($(this).attr("data-appearance-mode") == 'dark')? true:false;
    influencedColorScheme();
  });
})();
