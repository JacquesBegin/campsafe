const alertTypes = [
  "Bear spotted in the park! Use proper food storage techniques.",
  "Heavy rain is forecasted for this area. Flooding could occur!",
  "Forest fire near campground! Camping is prohibited until further notice.",
  "Rock slide on park road 3A! Use alternate routes."
];

const states = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming"
};

function populateStateList(stateList) {
  let statesElement = document.getElementById("selectStateList");
  for (let x in stateList) {
    let currentState = document.createElement("option");
    currentState.value = x;
    currentState.innerHTML = stateList[x];
    statesElement.append(currentState);
  }
}
populateStateList(states);


async function campgroundStateSearch() {
  let state = document.getElementById("selectStateList").value;

  const response = await fetch("campgrounds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      pstate: state })
  })
  return await response.json();
}
document.getElementById("selectStateButton").addEventListener("click", getCampgrounds);


function getCampgrounds() {
  campgroundStateSearch()
  .then(campgroundData => {
    console.log(campgroundData.data);
    displayCampgrounds(campgroundData.data);
  });
}


function displayCampgrounds(campgrounds) {
  // console.log(`typeof: ${typeof campgrounds}`);
  // console.log(`campgrounds: ${campgrounds}`);
  let list = document.getElementById("campgroundList");
  list.innerHTML = "";
  for (let camp of campgrounds) {
    
    let facilityName = document.createElement("p");
    let contractID = document.createElement("p");
    let facilityID = document.createElement("p");
    let latitude = document.createElement("p");
    let longitude = document.createElement("p");
    let state = document.createElement("p");
    let campgroundButton = document.createElement("input");
    facilityName.innerHTML = `Facility Name - ${camp.facilityName}`;
    contractID.innerHTML = `Contract ID - ${camp.contractID}`;
    facilityID.innerHTML = `Facility ID - ${camp.facilityID}`;
    latitude.innerHTML = `Latitude - ${camp.latitude}`;
    longitude.innerHTML = `Longitude - ${camp.longitude}`;
    state.innerHTML = `State - ${camp.state}`;
    campgroundButton.type = "button";
    campgroundButton.value = "Details";
    list.append(facilityName);
    list.append(contractID);
    list.append(facilityID);
    list.append(latitude);
    list.append(longitude);
    list.append(state);
    list.append(campgroundButton);
    list.append(document.createElement("hr"));
  }
}

async function getCampgroundDetails() {
  // let state = document.getElementById("selectStateList").value;

  const response = await fetch("campgroundDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      pstate: state 
    })
  })
  return await response.json();
}
document.getElementById("selectStateButton").addEventListener("click", getCampgrounds);


function deletePopupAlert() {
  let popupAlertHolder = document.getElementById("popupAlertHolder");
  popupAlertHolder.innerHTML = "";
  popupAlertHolder.style.display = "none";
}

function openPopupAlert(campgroundData, alertData) {
  let popupAlertHolder = document.getElementById("popupAlertHolder");
  let popupAlertHolderTmp = document.createElement("div");
  popupAlertHolderTmp.id = "popupAlertHolderTmp";
  let alertFacilityName = document.createElement("div");
  alertFacilityName.id = "popupAlertFacilityName";
  alertFacilityName.innerHTML = campgroundData.facilityName;
  popupAlertHolderTmp.append(alertFacilityName);
  let alertClosePopup = document.createElement("div");
  alertClosePopup.id = "closePopupAlert";
  alertClosePopup.innerHTML = "X";
  alertClosePopup.addEventListener("click", deletePopupAlert);
  popupAlertHolderTmp.append(alertClosePopup);
  let alertMessage = document.createElement("div");
  alertMessage.id = "popupAlertMessage";
  alertMessage.innerHTML = alertData;
  popupAlertHolderTmp.append(alertMessage);
  popupAlertHolder.append(popupAlertHolderTmp);
  popupAlertHolder.style.display = "block";
  popupAlertHolder.addEventListener("click", function(event) {
    if (event.target === popupAlertHolder) {
      deletePopupAlert();
    }
  });
}

function displayCampgroundList(campgroundDivs) {
  console.log("campgroundDivs:", campgroundDivs);

  let campgroundSection = document.getElementById("campgroundList");
  campgroundSection.innerHTML = "";

  let listHeader = document.createElement("div");
  let listBody = document.createElement("div");
  listHeader.innerHTML = "Available Campgrounds";
  listHeader.id = "listHeader";
  listBody.id = "listBody";
  campgroundSection.append(listHeader);
  for (let x = 0; x < campgroundDivs.length; x++) {
    console.log("div: ", campgroundDivs[x]);
    listBody.append(campgroundDivs[x]);
  }
  campgroundSection.append(listBody);
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
        openPopupAlert(campgrounds[x], tmpAlert);
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






// Used to display the current year in the footer's copyright element
function displayCopyrightYear() {
  let date = new Date;
  document.getElementById("footerYear").innerHTML = date.getFullYear();
}
displayCopyrightYear();

