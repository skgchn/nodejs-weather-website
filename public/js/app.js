console.log('Client side javascript file is loaded.');

const weatherForm = document.querySelector('form');
const searchField = document.querySelector('input');
let errorElem = document.querySelector('p#error');
let placeElem = document.querySelector('h2#place');
let weatherElem = document.querySelector('p#weather');

const forecastMessage = (data) => {
    let forecast = data.summary;
    forecast += ' It is currently ' + data.temperature + ' degrees Celcius outside.';

    if (data.apparentTemperature != data.temperature) {
        forecast += ' However, the temperature feels like ' +  data.apparentTemperature +
                    ' degrees Celcius.'
    }
    
    forecast += ' There is a ' + data.precipProbability + '% chance of rain.'

    return forecast;
}

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    // Reset dynamic elements
    errorElem.innerHTML = '';
    errorElem.style.display = 'none';
    weatherElem.innerHTML = 'Loading...';
    weatherElem.style.display = 'block';
    placeElem.innerHTML = '';
    placeElem.style.display = 'none';


    const place = searchField.value;
    const weatherURL = 'http://localhost:3000/weather?place=' + encodeURIComponent(place);
    fetch(weatherURL).then(res => {
        return res.json();
     }).then(data => {
        weatherElem.innerHTML = '';
        weatherElem.style.display = 'none';
    
        if (data.error) {
            errorElem.innerHTML = data.error;
            errorElem.style.display = 'block';
            return;
        }

        placeElem.innerHTML = 'Weather for ' + data.place;
        weatherElem.innerHTML = forecastMessage(data);

        placeElem.style.display = 'block';
        weatherElem.style.display = 'block';
    })
});