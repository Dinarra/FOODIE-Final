
const reservationForm = document.getElementById("reservation-form");

// Show an error under a field
function showError(field, message) {
  let error = document.getElementById(field.id + "-error");

  if (!error) {
    error = document.createElement("small");
    error.id = field.id + "-error";
    error.className = "text-danger d-block mt-1";
    field.insertAdjacentElement("afterend", error);
  }

  error.textContent = message;
  field.classList.add("is-invalid");
  field.setAttribute("aria-invalid", "true");
  field.setAttribute("aria-describedby", error.id);
}

// Remove the error message
function clearError(field) {
  const error = document.getElementById(field.id + "-error");

  if (error) {
    error.remove();
  }

  field.classList.remove("is-invalid");
  field.removeAttribute("aria-invalid");
  field.removeAttribute("aria-describedby");
}

// Check email format
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Check phone number
function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

// Check that the date is not in the past
function isValidDate(dateValue) {
  if (!dateValue) {
    return false;
  }

  const selectedDate = new Date(dateValue + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selectedDate >= today;
}

// Check all reservation fields
function validateReservation() {
  const name = document.getElementById("res-name");
  const email = document.getElementById("res-email");
  const phone = document.getElementById("res-phone");
  const date = document.getElementById("res-date");
  const time = document.getElementById("res-time");
  const guests = document.getElementById("res-guests");

  const fields = [name, email, phone, date, time, guests];
  let isValid = true;

  // Remove old errors
  fields.forEach(field => clearError(field));

  if (name.value.trim().length < 2) {
    showError(name, "Please enter at least 2 characters.");
    isValid = false;
  }

  if (!isValidEmail(email.value.trim())) {
    showError(email, "Please enter a valid email address.");
    isValid = false;
  }

  if (!isValidPhone(phone.value.trim())) {
    showError(phone, "Please enter a valid phone number.");
    isValid = false;
  }

  if (!isValidDate(date.value)) {
    showError(date, "Please select today or a future date.");
    isValid = false;
  }

  if (!time.value) {
    showError(time, "Please select a reservation time.");
    isValid = false;
  }

  if (!guests.value) {
    showError(guests, "Please select the number of guests.");
    isValid = false;
  }

  return isValid;
}

// Show the reservation result
function showReservationSuccess() {
  let message = document.getElementById("reservation-success");

  if (!message) {
    message = document.createElement("div");
    message.id = "reservation-success";
    message.className = "alert alert-success mt-3";
    message.setAttribute("role", "status");
    reservationForm.appendChild(message);
  }

  message.textContent = "Your reservation request has been submitted successfully!";
}

// Handle form submission
if (reservationForm) {
  reservationForm.setAttribute("novalidate", "");

  reservationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const oldMessage = document.getElementById("reservation-success");

    if (oldMessage) {
      oldMessage.remove();
    }

    if (validateReservation()) {
      showReservationSuccess();
      reservationForm.reset();
    }
  });

  // Clear errors when the user edits a field
  reservationForm.addEventListener("input", function(event) {
    if (event.target.matches("input, select, textarea")) {
      clearError(event.target);
    }
  });

  reservationForm.addEventListener("change", function(event) {
    if (event.target.matches("input, select")) {
      clearError(event.target);
    }
  });
}
