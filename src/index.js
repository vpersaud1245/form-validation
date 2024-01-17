import "./style.css";

/* ----- ADD EMAIL VALIDATION ----- */
const email = document.querySelector(".form__input--email");
const emailErrorField = document.querySelector(
  ".form-item__error-message--email",
);
/**
 * Displays error messages and styles for an email input field.
 *
 * This function fetches the email input field and its corresponding error field,
 * then displays the error field, applies error styles to the email input field,
 * and sets specific error messages based on validation criteria.
 */
function showEmailErrors() {
  // Display error field
  emailErrorField.style.display = "inline-block";
  // Style email input field with error styles
  email.style.border = "1px solid darkred";
  email.style.borderRadius = "5px 5px 0 0";
  if (email.validity.valueMissing) {
    emailErrorField.textContent = `Email cannot be empty`;
    return;
  }
  if (email.validity.typeMismatch) {
    emailErrorField.textContent = `Must be a valid email address`;
  }
}

// Provide live validation on email input
email.addEventListener("input", () => {
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

/* ----- ADD ZIPCODE VALIDATION ----- */
const zipcode = document.querySelector(".form__input--zipcode");
const zipcodeErrorField = document.querySelector(
  ".form-item__error-message--zipcode",
);

/**
 * Handles validation and error display for a zipcode input field.
 *
 * This function is triggered by input events and checks the length of the zipcode field.
 * It displays error messages and styles based on the length and specific key events.
 * Additionally, it prevents input beyond the valid length and clears errors at the appropriate length.
 */
function showZipcodeErrors() {
  const currentZipcodeFieldLength = zipcode.value.length;
  // Display error message if length is less than 5
  if (currentZipcodeFieldLength <= 4) {
    zipcodeErrorField.style.display = "inline-block";
    zipcodeErrorField.textContent = "Must be a valid zipcode";
    zipcode.style.border = "1px solid darkred";
    zipcode.style.borderRadius = "5px 5px 0 0";
    return;
  }
  // Clears error message at appropriate length
  if (currentZipcodeFieldLength === 5) {
    zipcodeErrorField.style.display = "none";
    zipcodeErrorField.textContent = "";
    zipcode.style.border = "1px solid black";
    zipcode.style.borderRadius = "5px";
  }
}

// Prevents input on zipcodes longer than 5 characters
zipcode.addEventListener("keydown", (e) => {
  if (zipcode.value.length > 4 && e.key !== "Backspace") {
    e.preventDefault();
  }
});

// Provide live validation on email input
zipcode.addEventListener("keyup", (e) => {
  // Input will only accept number input or backspace
  const isNumberRegex = /^[0-9]$/;
  if (e.key.match(isNumberRegex) || e.key === "Backspace") {
    showZipcodeErrors();
  }
  // Displays error message while deleting due to length not being met
  if (e.key === "Backspace") {
    zipcodeErrorField.style.display = "inline-block";
    zipcodeErrorField.textContent = "Must be a valid zipcode";
    zipcode.style.border = "1px solid darkred";
    zipcode.style.borderRadius = "5px 5px 0 0";
  }
});

/* ----- ADD PASSWORD VALIDATION ----- */
const password = document.querySelector(".form__input--password");
const passwordChecklist = document.querySelector(
  ".password-item__validation-checklist",
);
/**
 * Validates a password based on specified criteria and
 * updates checklist items accordingly.
 *
 * Checks password length, first letter capitalization,
 * and the presence of at least one number.
 */
function checkPasswordValidation() {
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
  if (password.value.length >= 8) {
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

// DISPLAY PASSWORD CHECKLIST
password.addEventListener("focus", () => {
  passwordChecklist.style.display = "block";
  checkPasswordValidation();
});
// REMOVE PASSWORD CHECKLIST
password.addEventListener("blur", (e) => {
  const submitBtn = document.querySelector(".form__submit-btn");
  // Checklist will remain open if submit btn is clicked for form validation
  if (e.relatedTarget !== submitBtn) {
    passwordChecklist.style.display = "none";
  }
});

// Check for password validation on each input
password.addEventListener("input", checkPasswordValidation);

/* ----- ADD CONFIRM PASSWORD VALIDATION ----- */
const confirmPassword = document.querySelector(
  ".form__input--confirm-password",
);
function showConfirmPasswordErrors() {
  const passwordValue = document.querySelector(".form__input--password").value;
  const confirmPasswordErrorField = document.querySelector(
    ".form-item__error-message--confirm-password",
  );
  // Display error is confirm password field is empty
  if (confirmPassword.validity.valueMissing) {
    confirmPasswordErrorField.style.display = "inline-block";
    confirmPasswordErrorField.textContent = "Confirm password cannot be empty";
    confirmPassword.style.border = "1px solid darkred";
    confirmPassword.style.borderRadius = "5px 5px 0 0";
    return;
  }
  // Display error if passwords dont match
  if (confirmPassword.value !== passwordValue) {
    confirmPasswordErrorField.style.display = "inline-block";
    confirmPasswordErrorField.textContent = "Passwords do not match";
    confirmPassword.style.border = "1px solid darkred";
    confirmPassword.style.borderRadius = "5px 5px 0 0";
    return;
  }

  // Removes error fields
  confirmPasswordErrorField.style.display = "none";
  confirmPasswordErrorField.textContent = "";
  confirmPassword.style.border = "1px solid black";
  confirmPassword.style.borderRadius = "5px";
}

// Provides live confirm password validation
confirmPassword.addEventListener("input", () => {
  showConfirmPasswordErrors();
});

// ADD FORM SUBMIT VALIDATION
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isFormValidated = true;

  // Validate Email
  if (!email.validity.valid) {
    showEmailErrors();
    isFormValidated = false;
  }

  // Validate Zipcode
  if (zipcode.validity.valueMissing || zipcode.value.length < 5) {
    showZipcodeErrors();
    isFormValidated = false;
  }

  // Validate Password
  const firstLetterCapitalRegex = /^[A-Z]/;
  const atLeastOneNumberRegex = /\d/;
  if (
    password.value.length < 8 ||
    !password.value.match(firstLetterCapitalRegex) ||
    !password.value.match(atLeastOneNumberRegex)
  ) {
    passwordChecklist.style.display = "block";
    checkPasswordValidation();
    isFormValidated = false;
  } else {
    passwordChecklist.style.display = "none";
  }

  // Validate Confirm Password
  if (
    confirmPassword.validity.valueMissing ||
    confirmPassword.value !== password.value
  ) {
    showConfirmPasswordErrors();
    isFormValidated = false;
  }

  // SUBMIT FORM
  if (isFormValidated === true) {
    alert("High Five");
  }
});
