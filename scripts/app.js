const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

//get the city and weather from submit
const updateCity = async city => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

//update UI
const updateUI = data => {
  const { cityDets, weather } = data;

  //update details
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
    `;
  //remove display none if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
  //update daytime and icon
  let timeSrc = weather.IsDayTIme ? 'img/day.svg' : 'img/night.svg';
  let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

  time.setAttribute('src', timeSrc);
  icon.setAttribute('src', iconSrc);
};

cityForm.addEventListener('submit', e => {
  e.preventDefault();
  //get city and clear form
  const city = cityForm.city.value.trim();
  cityForm.reset();
  //update ui with new city information
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
