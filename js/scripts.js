document.getElementById("selectStateButton").addEventListener("click", stateSearch);

let campgrounds = [
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
    state: "ID"
  },
  {
    contractID: "NRSO",
    contractType: "FEDERAL",
    facilityID: "70685",
    facilityName: "Acadia National Park",
    facilityPhoto: "/photos/image.jpg",
    latitude: "37.4744444",
    longitude: "-105.7986111",
    sitesWithAmps: "Y",
    sitesWithPetsAllowed: "Y",
    sitesWithSewerHookup: "N",
    sitesWithWaterHookup: "N",
    sitesWithWaterfront: "Y",
    state: "ME"
  },
  {
    contractID: "UTSP",
    contractType: "STATE",
    facilityID: "61928",
    facilityName: "Bear Lake State Park",
    facilityPhoto: "/photos/image.jpg",
    latitude: "37.4744444",
    longitude: "-105.7986111",
    sitesWithAmps: "N",
    sitesWithPetsAllowed: "Y",
    sitesWithSewerHookup: "N",
    sitesWithWaterHookup: "N",
    sitesWithWaterfront: "N",
    state: "UT"
  }
];

function displayCampgroundList(campgroundDivs) {
  console.log("campgroundDivs:", campgroundDivs);

  let campgroundSection = document.getElementById("campgroundList");
  for (let x = 0; x < campgroundDivs.length; x++) {
    console.log("div: ", campgroundDivs[x]);
    campgroundSection.append(campgroundDivs[x]);
  }
}

function buildCampgroundList(campgrounds) {
  console.log("campground:", campgrounds);
  let campgroundElements = [];
  for(let x = 0; x < campgrounds.length; x++) {
    let element;
    element = document.createElement("div");
    element.innerHTML = campgrounds[x].facilityName;
    campgroundElements.push(element);
  }
  return campgroundElements;
}

function getCampgrounds(state) {
  let selectedCampgrounds = [];
  for (let x = 0; x < campgrounds.length; x++) {
    if (campgrounds[x].state === state) {
      selectedCampgrounds.push(campgrounds[x]);
    }
  }
  if (selectedCampgrounds.length > 0) {
    displayCampgroundList(buildCampgroundList(selectedCampgrounds));
  }
}

function stateSearch() {
  let state = document.getElementById("selectStateList").value;
  getCampgrounds(state);
  
  // Use the following line to fetch the campground list once
  // the server has been setup.
  // console.log(`Returned from fetch: ${fetchState(state)}`);


}



function displayCopyrightYear() {
  let date = new Date;
  document.getElementById("footerYear").innerHTML = date.getFullYear();
}
displayCopyrightYear();

