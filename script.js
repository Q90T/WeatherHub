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
updatePm();
setInterval(updateDay, 1000);
setInterval(updateTime, 1000);
setInterval(updateDate, 1000);
setInterval(updatePm, 1000);

// Google Maps API 

async function initMap(a,b) {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {

    center: { lat: a, lng: b },
    zoom: 8,  
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
  if (event.key === "Enter") {getWeather();getPhotos();}
});

async function getWeather() {
  let city = cityName.value;
  let units = 'metric';
  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a7111373aa7c082059593b594237e89a&units=${units}`);
  let data = await response.json();
  console.log(data);
  document.getElementById('city-name').value = '';
  document.getElementById('temp').innerHTML = data.main.temp;
  document.getElementById('feels-like').innerHTML = data.main.feels_like;
  document.getElementById('humidity').innerHTML = data.main.humidity;
  document.getElementById('pressure').innerHTML = data.main.pressure;
  document.getElementById('min').innerHTML = data.main.temp_min;
  document.getElementById('max').innerHTML = data.main.temp_max;
  document.getElementById('weather-description').innerHTML = data.weather[0].description;
  //geting lat and lon
  initMap(data.coord.lat, data.coord.lon);
}
//geting images
let currentImageIndex = 0;
let imageURLs = [];
function getPhotos(){
currentImageIndex = 0;
imageURLs = [];
storPhotos();
}
 function storPhotos(){
  let city_name = cityName.value;
  let access_key = 'EtOGrwc6_TuQj6ZhcjUUaJoluXhHUsMljjXexC5hjtc';
  let url = `https://api.unsplash.com/search/photos?query=${city_name}&client_id=${access_key}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    data.results.forEach(photo => {
      imageURLs.push(photo.urls.small); // Store the URLs of all images
    });
    displayImage();
  })
  .catch(error => console.error(error));
  
 }
function displayImage() {
  document.getElementById('slideshow').src = imageURLs[currentImageIndex];
}

document.getElementById('prev').addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + imageURLs.length) % imageURLs.length;
  displayImage();
});

document.getElementById('next').addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % imageURLs.length;
  displayImage();
});
