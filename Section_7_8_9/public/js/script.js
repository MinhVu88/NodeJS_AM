console.log('script.js is loaded');

// fetch('http://puzzle.mead.io/puzzle').then(response => response.json())
//                                      .then(data => console.log(data))
//                                      .catch(error => console.log(error));

const search_form = document.querySelector('form'),
      search_input = document.querySelector('input'),
      weather_data = document.querySelector('#weather-info');

search_form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`/weather?location=${search_input.value}`)
         .then(response => response.json())
         .then(data => {
                console.log(data, data.error);

                if (data.error) {
                    weather_data.innerHTML = `<span style="color: crimson;">${data.error}</span>`;
                } else {
                    const {location, weather, temperature_fahrenheit, feels_like, humidity} = data,
                           html = `<ul>
                                       <li>Location: ${location}</li>
                                       <li>Weather: ${weather}</li>
                                       <li>Temperature (Fahrenheit): ${temperature_fahrenheit} degrees</li>
                                       <li>Feels like: ${feels_like} degrees</li>
                                       <li>Humidity: ${humidity} %</li>
                                   </ul>`;

                    weather_data.innerHTML = html;
                }

                search_input.value = '';
         });
});