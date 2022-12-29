function isValidEmail(value) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
  if (value == "") {
    setEmailError("");
  } else if (isValidEmail(value)) {
    setEmailError("");
  } else {
    setEmailError("Email Invalid!");
  }
}

const validateUsername = (value, setErrorUserNameMsg) => {
  if (value === "") {
    setErrorUserNameMsg("Veuillez entre un pseudo");
  } else if (value?.length < 3) {
    setErrorUserNameMsg("Le pseudo doit avoir 3 caractères ou plus");
  } else {
    setErrorUserNameMsg("");
  }
};

const validatePassword = (value, setErrorPasswordMsg) => {
  if (value?.length < 9) {
    setErrorPasswordMsg("Le mot de passe doit avoir 9 caractères ou plus");
  } else setErrorPasswordMsg("");
};

const confirmPassword = (
  value,
  confirmPassword,
  setErrorConfirmPasswordMsg
) => {
  if (value === confirmPassword) {
    setErrorConfirmPasswordMsg("");
  } else setErrorConfirmPasswordMsg("Passwords do not match");
};

const utils = {
  validateUsername,
  validatePassword,
  confirmPassword,
  isValidEmail,
  validateEmail,
};

export default utils;
