var form = document.getElementById("form");

var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var password2 = document.getElementById("password2");

//functions
function showError(paramName, errorText) {
  var formControl = paramName.parentElement;
  formControl.className = "form-control error";
  var small = formControl.querySelector("small");
  small.innerText = errorText;
}

function showSuccess(paramName) {
  var formControl = paramName.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid");
  }

  return re.test(String(email).toLowerCase());
}

function checkRequired(inputArr) {
  inputArr.forEach(function (field) {
    if (field.value.trim() === "") {
      showError(field, `${firstLetter(field)} is required`);
    } else {
      showSuccess(field);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${firstLetter(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${firstLetter(input)}  must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function firstLetter(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function comparePass(input, input2) {
  if (input.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, "Passwords must match");
  }
}

//event Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  comparePass(password, password2);
});
