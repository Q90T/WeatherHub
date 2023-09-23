//the menu functions

//menu three lines animation
function myFunction(x) {
  x.classList.toggle("change");
}



//display and hide the navigation bar
var nav = document.getElementById('access_nav'),
    body = document.body;

nav.addEventListener('click', function(e) {
    body.className = body.className? '' : 'with_nav';
    e.preventDefault();
});
// time and date functions

// Get the elements for the day, time, and date
  let dayElement = document.querySelector('#day');
  let timeElement = document.querySelector('#time');
  let dateElement = document.querySelector('#date');
  let pmElement = document.querySelector('#pm');

  // Update the day
  function updateDay() {
    date = new Date;
    day = date.getDay();
    days = new Array('Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    dayElement.innerHTML = days[day];
    return true; 
  }


  // Update the time
  function updateTime() {
    date = new Date;
    h = date.getHours();
    m = date.getMinutes();
    if(h<10) { h = "0"+h; }
    if(m<10) { m = "0"+m; }
    timeElement.innerHTML = h+':'+m;
    return true; 
  }
  //use pm and am
  function updatePm() {
    date = new Date;
    h = date.getHours();
    s = 'AM';
    if(h>=12) { s = "PM"; }
    if(h==12) { h = 12; }
    if(h>12) { h = h-12; }
    if(h<10) { h = "0"+h; }
    pmElement.innerHTML = s;
    return true; 
  }


  // Update the date
  function updateDate() {
    date = new Date;
    year = date.getFullYear();
    month = date.getMonth();
    months = new Array('Jan', 'Febr', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    d = date.getDate();
    dateElement.innerHTML = months[month]+' '+d+', '+year;
    return true; 
  }

  // Call the functions and update the elements each second
updateDay();
updateTime();
updateDate();
//updatePm();
setInterval(updateDay, 1000);
setInterval(updateTime, 1000);
setInterval(updateDate, 1000);
//setInterval(updatePm, 1000);

// Google Maps API 

async function initMap(a,b) {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {

    center: { lat: a, lng: b },
    zoom: 8,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });
}
 
initMap();

// OpenWeatherMap API
const cityName = document.querySelector('#city-name');
const searchBtn = document.querySelector('[data-search-btn]');

searchBtn.addEventListener('click', getWeather);
// Get the input field

// Execute a function when the user presses a key on the keyboard
cityName.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {getWeather();}
});

async function getWeather() {
  let city = cityName.value;
  let units = 'metric';
  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a7111373aa7c082059593b594237e89a&units=${units}`);
  let data = await response.json();
  console.log(data);
  //geting lat and lon
  initMap(data.coord.lat, data.coord.lon);
}
