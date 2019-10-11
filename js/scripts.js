document.getElementById("selectStateButton").addEventListener("click", stateSearch);

function displayCopyrightYear() {
  let date = new Date;
  document.getElementById("footerYear").innerHTML = date.getFullYear();
}
displayCopyrightYear();

function stateSearch() {
  let state = document.getElementById("selectStateList").value;
  alert(state);
}
