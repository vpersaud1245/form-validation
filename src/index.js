import "./style.css";

/**
 * Displays error messages and styles for an email input field.
 *
 * This function fetches the email input field and its corresponding error field,
 * then displays the error field, applies error styles to the email input field,
 * and sets specific error messages based on validation criteria.
 */
function showEmailErrors() {
  const email = document.querySelector(".form__input--email");
  const errorField = document.querySelector(".form-item__error-message--email");
  // Display error field
  errorField.style.display = "inline-block";
  // Style email input field with error styles
  email.style.border = "1px solid darkred";
  email.style.borderRadius = "5px 5px 0 0";
  if (email.validity.valueMissing) {
    errorField.textContent = `Email cannot be empty`;
    return;
  }
  if (email.validity.typeMismatch) {
    errorField.textContent = `Must be a valid email address`;
  }
}

/**
 * Handles validation and error display for a zipcode input field.
 *
 * This function is triggered by input events and checks the length of the zipcode field.
 * It displays error messages and styles based on the length and specific key events.
 * Additionally, it prevents input beyond the valid length and clears errors at the appropriate length.
 */
function showZipcodeErrors(e) {
  const zipcodeField = document.querySelector(".form__input--zipcode");
  const currentZipcodeFieldLength = zipcodeField.value.length;
  const zipcodeErrorField = document.querySelector(
    ".form-item__error-message--zipcode",
  );
  // Display error message if length is less than 5
  if (currentZipcodeFieldLength < 4 || e.key === "Backspace") {
    zipcodeErrorField.style.display = "inline-block";
    zipcodeErrorField.textContent = "Must be a valid zipcode";
    zipcodeField.style.border = "1px solid darkred";
    zipcodeField.style.borderRadius = "5px 5px 0 0";
    return;
  }
  // Prevents inputs longer than 5 characters
  if (currentZipcodeFieldLength > 4 && e.key !== "Backspace") {
    e.preventDefault();
    return;
  }
  // Clears error message at appropriate length
  if (currentZipcodeFieldLength === 4) {
    zipcodeErrorField.style.display = "none";
    zipcodeErrorField.textContent = "";
    zipcodeField.style.border = "1px solid black";
    zipcodeField.style.borderRadius = "5px";
  }
}

/**
 * Validates a password based on specified criteria and
 * updates checklist items accordingly.
 *
 * Checks password length, first letter capitalization,
 * and the presence of at least one number.
 */
function checkPasswordValidation() {
  const password = document.querySelector(".form__input--password");
  // Get password checklist list items
  const minCharItem = document.querySelector(
    ".password-checklist__list-item--min-chars",
  );
  const capitalItem = document.querySelector(
    ".password-checklist__list-item--capital",
  );
  const minNumsItem = document.querySelector(
    ".password-checklist__list-item--min-nums",
  );
  const firstLetterCapitalRegex = /^[A-Z]/;
  const atLeastOneNumberRegex = /\d/;

  // Check for minimum password length
  if (password.value.length >= 7) {
    minCharItem.style.color = "green";
  } else {
    minCharItem.style.color = "darkred";
  }

  // Check if first letter is capital
  if (password.value.match(firstLetterCapitalRegex)) {
    capitalItem.style.color = "green";
  } else {
    capitalItem.style.color = "darkred";
  }

  // Check if password contains at least one number
  if (password.value.match(atLeastOneNumberRegex)) {
    minNumsItem.style.color = "green";
  } else {
    minNumsItem.style.color = "darkred";
  }
}

function showConfirmPasswordErrors() {
  const passwordValue = document.querySelector(".form__input--password").value;
  const confirmPassword = document.querySelector(
    ".form__input--confirm-password",
  );
  const confirmPasswordErrorField = document.querySelector(
    ".form-item__error-message--confirm-password",
  );

  if (confirmPassword.validity.valueMissing) {
    confirmPasswordErrorField.style.display = "inline-block";
    confirmPasswordErrorField.textContent = "Confirm password cannot be empty";
    confirmPassword.style.border = "1px solid darkred";
    confirmPassword.style.borderRadius = "5px 5px 0 0";
    return;
  }

  if (confirmPassword.value !== passwordValue) {
    confirmPasswordErrorField.style.display = "inline-block";
    confirmPasswordErrorField.textContent = "Passwords do not match";
    confirmPassword.style.border = "1px solid darkred";
    confirmPassword.style.borderRadius = "5px 5px 0 0";
    return;
  }

  confirmPasswordErrorField.style.display = "none";
  confirmPasswordErrorField.textContent = "";
  confirmPassword.style.border = "1px solid black";
  confirmPassword.style.borderRadius = "5px";
}

// ADD EMAIL VALIDATION
const email = document.querySelector(".form__input--email");
email.addEventListener("input", () => {
  const emailErrorField = document.querySelector(
    ".form-item__error-message--email",
  );
  if (!email.validity.valid) {
    showEmailErrors();
    return;
  }
  if (email.validity.valid) {
    // Reset email input and error fields to default styles
    emailErrorField.style.display = "none";
    emailErrorField.textContent = "";
    email.style.border = "1px solid black";
    email.style.borderRadius = "5px";
  }
});

// ADD ZIPCODE VALIDATION
const zipcode = document.querySelector(".form__input--zipcode");
zipcode.addEventListener("keydown", (e) => {
  const isNumberRegex = /^[0-9]$/;
  if (e.key.match(isNumberRegex) || e.key === "Backspace") {
    showZipcodeErrors(e);
  }
});

// ADD PASSWORD VALIDATION
const password = document.querySelector(".form__input--password");
const passwordChecklist = document.querySelector(
  ".password-item__validation-checklist",
);

// Display password checklist on focus
password.addEventListener("focus", () => {
  passwordChecklist.style.display = "block";
  checkPasswordValidation();
});
password.addEventListener("blur", () => {
  passwordChecklist.style.display = "none";
});

// Check for password validation on each input
password.addEventListener("input", checkPasswordValidation);

// ADD CONFIRM PASSWORD VALIDATION
const confirmPassword = document.querySelector(
  ".form__input--confirm-password",
);
confirmPassword.addEventListener("input", () => {
  showConfirmPasswordErrors();
});
