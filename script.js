document.addEventListener("DOMContentLoaded",function () {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmpassword");
    const signUpButton = document.querySelector('#signup-form button[type="submit"]');
    signUpButton.addEventListener("click", function (event) {
      if (passwordInput.value !== confirmPasswordInput.value) {
        event.preventDefault(); // Prevent form submission
        alert("Passwords do not match. Please make sure both passwords are the same.");
      }
    });
  });