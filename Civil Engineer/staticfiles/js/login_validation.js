//validation code for inputs
var email = document.forms['form']['email'];
var password = document.forms['form']['password'];
var email_error = document.getElementById('email_error');
var pass_error =document.getElementById('pass_error');
email.addEventListener('textInput', email_verify);
password.addEventListener('textInput', pass_verify);
function validated() {
  if(email.value.length <8)
  {
    email.style.border="3px solid red";
    email_error.style.display ="block";
    email.focus();
    return false;
  }
  if(password.value.length <1)
  {
    password.style.border="3px solid red";
    pass_error.style.display ="block";
    password.focus();
    return false;
  }

}
function email_verify() {
  if(email.value.length >=8)
  {
    email.style.border="3px solid silver";
    email_error.style.display ="none";
    return true;
  }}

function pass_verify() {

  if(password.value.length >=5)
  {
    password.style.border="3px solid silver";
    pass_error.style.display ="none";
    return true;
  }
}
