const form = document.getElementById('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');


/**
 * Form Validation:
*/
form.addEventListener('submit', function (e) {
  e.preventDefault();

  /**
   * 1. Get values from form and trim them
  */
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  /**
   * 2. Reset errors
  */
  let isValid = true;
  emailError.textContent = '';
  passwordError.textContent = '';

  /**
   * 3. Validate email and password
   *    a. Email validation
   *    b. Password validation
   */
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  if (!emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  if (!passwordRegex.test(password)) {
    passwordError.textContent = `Password must be at least 6 characters long and include:
    - 1 uppercase
    - 1 lowercase
    - 1 number
    - 1 special character`;
    isValid = false;
  }

  /**
   * 4. Show success if valid and reset form
  */
  if (isValid) {
    alert('Login Successful!');
    form.reset();
  }
});
