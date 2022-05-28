// Calculate age
$(document).ready(function () {
  $("#email-form").validate({
    // Specify validation rules
    rules: {
      name: {
        required: true,
        minlength: 4,
      },
      subject: {
        required: true,
        minlength: 6,
      },
      email: {
        required: true,
        email: true,
      },
      message: {
        required: true,
      },
    },

    // Specify validation error messages
    messages: {
      name: "Please enter your name",
      subject: "Please enter your subject",
      message: "Please enter your message",
      email: "Please enter a valid email address",
    },
    submitHandler: function (form) {
      $("#loading").show();
      $("#submit-form").hide();
      const formData = $(form);
      const actionUrl =
        "https://script.google.com/macros/s/AKfycbx8b5GRGxyqZwcAZWi3DOSLPrcaEWQFY2M6LRCvRoGUA_esTVaobBwN1XwtwrUq7PVgaw/exec";

      $.ajax({
        type: "POST",
        url: actionUrl,
        data: formData.serialize(),
        success: function (data) {
          $("#message-modal").html(
            "Your message has been sent<br/>I will reply you soon"
          );
        },
        error: function (data) {
          $("#message-modal").html(
            "Have problems with your message<br/>Please try again later<br/>Or contact me via email, telegram, linkedin, etc..."
          );
        },
        complete: function (data) {
          $("#loading").hide();
          $("#submit-form").show();
          $("#popup-modal").modal("show");
        },
      });
    },
  });
});
