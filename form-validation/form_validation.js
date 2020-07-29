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

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//event Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //console.dir(e);

  if (username.value === "") {
    showError(username, "Username is required");
  } else {
    showSuccess(username);
  }

  if (email.value === "") {
    showError(email, "Email is required");
  } else if (!validateEmail(email.value)) {
    showError(email, "Email is incorrect");
    // console.log(validateEmail(email.value) ? true : false);
  } else {
    showSuccess(email);
  }
});
