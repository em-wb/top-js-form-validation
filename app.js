const form = document.querySelector("form");
const email = document.getElementById("email");
const country = document.getElementById("country");
const postcode = document.getElementById("postcode");
const password = document.getElementById("password");
const passwordConf = document.getElementById("password-confirmation");
const inputFields = document.querySelectorAll("input");
const confirmSubmit = document.getElementById("confirm");

let hasErrors;

function showEmailError() {
  if (email.validity.typeMismatch) {
    email.nextElementSibling.textContent = "Type a valid email address.";
  } else if (email.validity.tooShort || email.validity.tooLong) {
    email.textContent.length < 5
      ? (email.nextElementSibling.textContent = "Email address is too short")
      : (email.nextElementSibling = "Email address is too long");
  }
}

function showCountryError() {
  if (country.validity.patternMismatch) {
    country.nextElementSibling.textContent =
      "Enter a country name only, without numbers.";
  } else if (country.validity.tooShort || country.validity.tooLong) {
    country.textContent < 2
      ? (country.nextElementSibling.textContent = "Country name is too short")
      : (country.nextElementSibling.textContent = "Country name is too long");
  }
}

function showPostcodeError() {
  if (postcode.validity.tooShort || postcode.validity.tooLong) {
    postcode.textContent < 2
      ? (postcode.nextElementSibling.textContent =
          "Post / Zip code is too short")
      : (postcode.nextElementSibling.textContent =
          "Post / Zip code is too long");
  }
}

function showPasswordError() {
  const requirements = [
    { regex: /[0-9]/, description: "a number" },
    { regex: /[a-z]/, description: "a lowercase letter" },
    { regex: /[A-Z]/, description: "an uppercase letter" },
    {
      regex: /[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]/,
      description: "a special character",
    },
  ];
  const missing = requirements.filter((req) => !req.regex.test(password.value));

  if (missing.length > 0) {
    const missingList = missing.map((req) => req.description).join(", ");
    password.nextElementSibling.textContent = `Required: ${missingList}.`;
  } else {
    password.nextElementSibling.textContent =
      "Password must be 8 characters or more";
  }
}

function showPasswordConfError() {
  passwordConf.nextElementSibling.textContent = "Passwords do not match";
}

function showEmptyFieldError(inputField) {
  if (inputField.validity.valueMissing) {
    inputField.nextElementSibling.textContent = "This field cannot be blank.";
  }
}

function handleFormValidation() {
  email.addEventListener("input", () => {
    email.validity.valid
      ? (email.nextElementSibling.textContent = "")
      : showEmailError();
  });

  country.addEventListener("input", () => {
    country.validity.valid
      ? (country.nextElementSibling.textContent = "")
      : showCountryError();
  });

  postcode.addEventListener("input", () => {
    postcode.validity.valid
      ? (postcode.nextElementSibling.textContent = "")
      : showPostcodeError();
  });

  password.addEventListener("input", () => {
    password.validity.valid
      ? (password.nextElementSibling.textContent = "")
      : showPasswordError();
  });

  passwordConf.addEventListener("input", () => {
    passwordConf.value === password.value
      ? (passwordConf.nextElementSibling.textContent = "")
      : showPasswordConfError();
  });

  inputFields.forEach((inputField) => {
    inputField.addEventListener("blur", () => {
      inputField.validity.valid
        ? (inputField.nextElementSibling.textContent = "")
        : showEmptyFieldError(inputField);
    });
  });
}

function handleSubmitValidation() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hasErrors = false;
    inputFields.forEach((inputField) => {
      if (inputField.validity.valid) {
        inputField.nextElementSibling.textContent = "";
      } else {
        showEmptyFieldError(inputField);
        hasErrors = true;
      }
    });
    if (!email.validity.valid) {
      hasErrors = true;
      showEmailError();
    }
    if (!country.validity.valid) {
      hasErrors = true;
      showCountryError();
    }
    if (!postcode.validity.valid) {
      showPostcodeError();
      hasErrors = true;
    }
    if (!password.validity.valid) {
      showPasswordError();
      hasErrors = true;
    }
    if (!passwordConf.value === password.value) {
      showPasswordConfError();
      hasErrors = true;
    }
    if (!hasErrors) {
      confirmSubmit.textContent = "FORM SUBMITTED !! (nowhere)";
      form.reset();
    }
  });
}

handleFormValidation();
handleSubmitValidation();
