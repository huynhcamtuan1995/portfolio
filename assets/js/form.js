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
      const formData = $(form);
      const actionUrl =
        "https://script.google.com/macros/s/AKfycbzIRakPU-BR8g4j5x7hX1iZUgfDAHx66coIBCvekSCBbhUX0sdfZZxDBJpQEm2rnFD3Pg/exec";

      $.ajax({
        type: "POST",
        url: actionUrl,
        data: formData.serialize(),
        beforeSend: function () {
          $("#loading").show();
          $("#submit-form").hide();
        },
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
