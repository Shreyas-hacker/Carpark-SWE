var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var validPasssword =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

export function emailChecker(email) {
  return email.match(mailFormat);
}

export function passwordCheck(password) {
  return password.match(validPasssword);
}
