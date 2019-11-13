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


async function getCampgroundsByState() {
  let state = document.getElementById("selectStateList").value;

  const response = await fetch("campgrounds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      stateCode: state 
    })
  })
  .catch(error => console.error(error));
  return await response.json();
}


function displayCampgrounds(campgrounds) {
  // console.log(`typeof: ${typeof campgrounds}`);
  // console.log(`campgrounds: ${campgrounds}`);
  let list = document.getElementById("campgroundList");
  list.innerHTML = "";
  for (let camp of campgrounds) {
    let parkName = document.createElement("p");
    let parkDescription = document.createElement("p");
    // let facilityID = document.createElement("p");
    // let latitude = document.createElement("p");
    // let longitude = document.createElement("p");
    // let state = document.createElement("p");
    // let campgroundButton = document.createElement("input");
    parkName.innerHTML = `Park Name - ${camp.name}`;
    parkDescription.innerHTML = `Park Description - ${camp.description}`;
    // facilityID.innerHTML = `Facility ID - ${camp.facilityID}`;
    // latitude.innerHTML = `Latitude - ${camp.latitude}`;
    // longitude.innerHTML = `Longitude - ${camp.longitude}`;
    // state.innerHTML = `State - ${camp.state}`;
    // campgroundButton.type = "button";
    // campgroundButton.value = "Details";
    // campgroundButton.addEventListener("click", function(e) {
    //   getDetails(camp.contractID, camp.facilityID);
    // });
    list.append(parkName);
    list.append(parkDescription);
    // list.append(facilityID);
    // list.append(latitude);
    // list.append(longitude);
    // list.append(state);
    // list.append(campgroundButton);
    list.append(document.createElement("hr"));
  }
}


function getCampgrounds() {
  getCampgroundsByState()
  .then(campgroundData => {
    console.log(campgroundData.data);
    displayCampgrounds(campgroundData.data);
  });
}


// Create events for clicking/selecting the State Search button
document.getElementById("selectStateButton").addEventListener("click", getCampgrounds);
document.getElementById("selectStateButton").addEventListener("keypress", function(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    getCampgrounds();
  }
});




async function getCampgroundDetails(contractID, facilityID) {
  // let state = document.getElementById("selectStateList").value;

  const response = await fetch("campgroundDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      contractID: contractID,
      facilityID: facilityID
    })
  })
  .catch(error => console.error(error));
  return await response.json();
}


function getDetails(contractID, facilityID) {
  getCampgroundDetails(contractID, facilityID)
  .then(data => {
    console.log("data:", data);
  })
}


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

