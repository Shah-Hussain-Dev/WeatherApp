const key = "99c2d1dc714439be33cafd86c453f8ac";
const formEl = document.querySelector("form");
const details = document.querySelector(".details");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  details.innerHTML = "<h1>Loading...</h1>";
  const location = e.target.location.value;
  if(location!= weatherApp(location) ){  
    details.innerHTML = "<span><img src='images/error.png'height='50px'></span> <h1>Data not found. </h1>";

  }else{
    weatherApp(location);

  }
  formEl.reset();
});
async function weatherApp(location) {
  const data = await fetchAPI(location);
  generateHTML(data);
}
async function fetchAPI(location) {
  const baseURL = `http://api.weatherstack.com/current?access_key=${key}&query=${location}`;

  // Use ⬇this⬇ header with fetch method if you get any error with cors-anywhere
  // {headers: {
  //   'x-requested-with': 'text/plain';
  // }}

  const res = await fetch(baseURL);
  const data = await res.json();
  console.log(data);
  return data;
}

function generateHTML(data) {
  const html = `
  <h1 class="temp">${data.current.temperature}°c</h1>
  <h1 class="status">${data.current.weather_descriptions
    .map((item) => item)
    .join(" ")}</h1>
    <img src=' ${data.current.weather_icons}' height="100px">
  <div class="more-info">
    <p>Humidity- ${data.current.humidity}%</p>
    <p>Wind Speed- ${data.current.wind_speed}km/h</p>
    <p>Wind Dir- ${data.current.wind_dir}</p>
    <p>Pressure- ${data.current.pressure}MB</p>
  
  </div>
  <div class="query">${data.request.query}</div>
  `;
  details.innerHTML = html;
}
