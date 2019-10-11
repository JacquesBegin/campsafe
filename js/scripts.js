function displayCopyrightYear() {
  let date = new Date;
  document.getElementById("footer-year").innerHTML = date.getFullYear();
}
displayCopyrightYear();