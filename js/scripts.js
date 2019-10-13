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
  },
  {
    facilityName: "Great Big State Park",
    state: "ID"
  },
  {
    facilityName: "Great Small State Park",
    state: "ID"
  },
  {
    facilityName: "Rocky Road Highlands",
    state: "ID"
  },
  {
    facilityName: "The Arches",
    state: "ID"
  },
  {
    facilityName: "Red Fire Mountains",
    state: "ID"
  }
];

let alertTypes = [
  "Bear spotted in the park! Use proper food storage techniques.",
  "Heavy rain is forecasted for this area. Flooding could occur!",
  "Forest fire near campground! Camping is prohibited until further notice.",
  "Rock slide on park road 3A! Use alternate routes."
]



function displayCampgroundList(campgroundDivs) {
  console.log("campgroundDivs:", campgroundDivs);

  let campgroundSection = document.getElementById("campgroundList");
  campgroundSection.innerHTML = "";

  let listHeader = document.createElement("div");
  let listBody = document.createElement("div");
  listHeader.innerHTML = "Available Campgrounds";
  //styles are not being applied
  listHeader.id = "listHeader";
  listBody.id = "listBody";
  campgroundSection.append(listHeader);
  for (let x = 0; x < campgroundDivs.length; x++) {
    console.log("div: ", campgroundDivs[x]);
    listBody.append(campgroundDivs[x]);
  }
  campgroundSection.append(listBody);
}

function deletePopupAlert() {

}

function createPopupAlert(alertText) {
  let popupAlertHolder = document.getElementsByClassName("popupAlertHolder")[0];
  if (popupAlertHolder) {
    popupAlertHolder.removeChild(popupAlertHolder.firstChild);
  } else {
    popupAlertHolder = document.createElement("div");
    popupAlertHolder.className = "popupAlertHolder";
  }
  let popupAlert = document.createElement("div");
  popupAlert.className = "popupAlert";
  popupAlert.innerHTML = alertText;
  popupAlertHolder.append(popupAlert);
  let body = document.getElementsByTagName("body")[0];
  body.append(popupAlertHolder);
}

function buildCampgroundList(campgrounds) {
  console.log("campground:", campgrounds);
  let campgroundElements = [];
  for(let x = 0; x < campgrounds.length; x++) {
    let element;
    element = document.createElement("div");
    element.className = "campgroundItem";

    let facilityName = document.createElement("span");
    facilityName.className = "facilityName";
    facilityName.innerHTML = campgrounds[x].facilityName;
    element.append(facilityName);

    // This is a permanent element that is arbitrarily assigning data.
    // Actual data will have to be returned from Active API.
    let facilityAlert = document.createElement("span");
    facilityAlert.className = "facilityAlert";
    facilityAlert.style.backgroundColor = "#d40d0d";
    if ((Math.floor(Math.random() * 4)) < 2) {
      facilityAlert.innerHTML = "!! ALERT !!";
      let tmpAlert = alertTypes[Math.floor(Math.random() * 4)];
      element.addEventListener("click", function() {
        createPopupAlert(tmpAlert);
      });
    }
    element.append(facilityAlert);

    if (x % 2 !== 0) {
      element.style.backgroundColor = "#ebebeb";
    }
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

