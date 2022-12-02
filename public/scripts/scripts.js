"use strict";

function validateForm() {
  var username = document.forms["myForm"]["username"].value;
  var email = document.forms["myForm"]["email"].value;
  var password = document.forms["myForm"]["password"].value;
  var phoneNumber = document.forms["myForm"]["phoneNumber"].value;
  // error array where we will store all the errors
  let errors = [];

  // validate username
  if (username == "") {
    errors.push("Name is required");
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // validate email
  if (email == "") {
    errors.push("Email is required");
  } else if (!validateEmail(email)) {
    errors.push("Email is not in a valid format");
  }

  const containsSpecialChars = (string) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(string);
  };

  // validate password
  if (password == "") {
    errors.push("Password is required");
  } else if (password.length < 7 || password.length > 16) {
    errors.push("Password must be between 8 and 16 characters");
  } else if (!containsSpecialChars(password)) {
    errors.push("Password must contain at least one special character");
  }

  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  // validate phone number
  if (phoneNumber == "") {
    errors.push("Phone number is required");
  } else if (phoneNumber.length < 9) {
    errors.push("Phone number must be at least 9 digits");
  } else if (!containsOnlyNumbers(phoneNumber)) {
    errors.push("Phone number must contain only numbers");
  }

  // returns false if there are errors
  if (errors.length > 0) {
    const errorList = document.getElementById("errors");
    errorList.innerHTML = errors.join("<br>");
    return false;
  } else {
    // returns true if there are no errors
    return true;
  }
}
