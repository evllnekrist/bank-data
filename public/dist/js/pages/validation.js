(() => {
  // src/js/pages/validation.js
  (function() {
    "use strict";
    function onSubmit(pristine) {
      let valid = pristine.validate();
      if (valid) {
        Toastify({
          node: $("#success-notification-content").clone().removeClass("hidden")[0],
          duration: 3e3,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true
        }).showToast();
      } else {
        Toastify({
          node: $("#failed-notification-content").clone().removeClass("hidden")[0],
          duration: 3e3,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true
        }).showToast();
      }
    }
    $(".validate-form").each(function() {
      let pristine = new Pristine(this, {
        classTo: "input-form",
        errorClass: "has-error",
        errorTextParent: "input-form",
        errorTextClass: "text-danger mt-2"
      });
      pristine.addValidator(
        $(this).find('input[type="url"]')[0],
        function(value) {
          let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
          let regex = new RegExp(expression);
          if (!value.length || value.length && value.match(regex)) {
            return true;
          }
          return false;
        },
        "This field is URL format only",
        2,
        false
      );
      $(this).on("submit", function(e) {
        e.preventDefault();
        onSubmit(pristine);
      });
    });
  })();
})();
