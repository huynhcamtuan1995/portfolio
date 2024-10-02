$(document).ready(function () {
  const successedMess = "Your message has been sent<br/>I will reply you soon"
  const failedMess = "Have problems with your message<br/>Please try again later<br/>Or contact me via email, telegram, linkedin, etc..."


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

      captcha: {
        required: true,
      },
    },

    // Specify validation error messages
    messages: {
      name: "Please enter your name",
      subject: "Please enter your subject",
      message: "Please enter your message",
      email: "Please enter a valid email address",
      captcha: "Please verify captcha",
    },
    submitHandler: function (form) {
      const formData = $(form);
      const actionUrl =
        "https://profile-app-test.fly.dev/api/portfolio/contact";

      $.ajax({
        type: "POST",
        url: actionUrl,
        data: formData.serialize(),
        beforeSend: function () {
          $("#loading").show();
          $("#submit-form").hide();
        },
        success: function (_data) {
          $("#message-modal").html(successedMess);
        },
        error: function (_data) {
          $("#message-modal").html(failedMess);
        },
        complete: function (_data) {
          $("#loading").hide();
          $("#submit-form").show();
          $("#popup-modal").modal("show");
        },
      });
    },
  });
});
