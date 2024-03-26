document.getElementById('searchBtn').addEventListener('click', function(){
    var city = document.getElementById('cityname').value;
    var apiKey = '1c629aa75562864e920791a34a77f1f7';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var weatherinfo = document.getElementById('weatherinfo');
            weatherinfo.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
            document.body.style.backgroundImage = getBackgroundImage(data.weather[0].main);
            
        })
        .catch(error => {
            console.error('Error fetching data:', error); 
            var weatherinfo = document.getElementById('weatherinfo');
            weatherinfo.innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
});

function getBackgroundImage(weatherCondition) {
    switch (weatherCondition) {
        case 'Clear':
            return "url('clear.jpeg')";
        case 'Clouds':
            return "url('cloudy.avif')";
        case 'Rain':
            return "url('rainy.webp')";
        default:
            return "none";
    }
}
