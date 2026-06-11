function checkUser(u) {
  if (u.age <= 18) {
    return false;
  }

  if (u.subscribed != true) {
    return false;
  }

  if (u.country == "FR") {
    return false;
  }

  return true;
}
