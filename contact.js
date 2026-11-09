
$(document).ready(function() {
  const contactForm = $("#contact-form");
  const fields = ["contact-name", "contact-email", "contact-subject", "contact-message"];

  // Check email format
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Show an error under a field
  function showError(fieldId, message) {
    const field = $("#" + fieldId);
    const errorId = fieldId + "-error";

    $("#" + errorId).remove();

    const error = $("<small></small>")
      .attr("id", errorId)
      .addClass("text-danger d-block mt-1")
      .text(message)
      .hide();

    field.after(error);
    field.addClass("is-invalid");
    field.attr("aria-invalid", "true");
    field.attr("aria-describedby", errorId);

    error.fadeIn(300);
  }

  // Remove an error
  function clearError(fieldId) {
    const field = $("#" + fieldId);

    field.removeClass("is-invalid");
    field.removeAttr("aria-invalid aria-describedby");

    $("#" + fieldId + "-error").fadeOut(200, function() {
      $(this).remove();
    });
  }

  // Check all contact fields
  function validateContact() {
    let isValid = true;

    const name = $("#contact-name").val().trim();
    const email = $("#contact-email").val().trim();
    const subject = $("#contact-subject").val().trim();
    const message = $("#contact-message").val().trim();

    fields.forEach(fieldId => clearError(fieldId));

    if (name.length < 2) {
      showError("contact-name", "Please enter at least 2 characters.");
      isValid = false;
    }

    if (!isValidEmail(email)) {
      showError("contact-email", "Please enter a valid email address.");
      isValid = false;
    }

    if (subject.length < 3) {
      showError("contact-subject", "Please enter a subject.");
      isValid = false;
    }

    if (message.length < 10) {
      showError("contact-message", "Please enter at least 10 characters.");
      isValid = false;
    }

    return isValid;
  }

  // Show success message
  function showSuccess() {
    $("#contact-success").remove();

    const success = $("<div></div>")
      .attr("id", "contact-success")
      .attr("role", "status")
      .addClass("alert alert-success mt-3")
      .text("Your message has been submitted successfully!")
      .hide();

    contactForm.append(success);
    success.slideDown(400);
  }

  // Handle form submission
  contactForm.on("submit", function(event) {
    event.preventDefault();

    $("#contact-success").remove();

    if (validateContact()) {
      showSuccess();
      this.reset();
    }
  });

  // Clear errors while typing
  contactForm.on("input", "input, textarea", function() {
    clearError(this.id);
  });

  // Highlight the active field
  contactForm.on("focusin", "input, textarea", function() {
    $(this).closest(".mb-3").addClass("active-field");
  });

  contactForm.on("focusout", "input, textarea", function() {
    $(this).closest(".mb-3").removeClass("active-field");
  });
});
