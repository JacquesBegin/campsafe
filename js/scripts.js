document.getElementById("selectStateButton").addEventListener("click", stateSearch);

let campground = [
  {
    contractID: "KOA",
    contractType: "PRIVATE",
    facilityID: "191502",
    facilityName: "Alamosa KOA",
    facilityPhoto: "/photos/image.jpg",
    latitude: "37.4744444",
    longitude: "-105.7986111",
    sitesWithAmps: "Y",
    sitesWithPetsAllowed: "Y",
    sitesWithSewerHookup: "N",
    sitesWithWaterHookup: "Y",
    sitesWithWaterfront: "",
    state: "CO"
  }
]


function displayCopyrightYear() {
  let date = new Date;
  document.getElementById("footerYear").innerHTML = date.getFullYear();
}
displayCopyrightYear();

function stateSearch() {
  let state = document.getElementById("selectStateList").value;
  
  // Use the following line to fetch the campground list once
  // the server has been setup.
  // console.log(`Returned from fetch: ${fetchState(state)}`);


}

