let $form = document.querySelector('#weather-form'),
$btn = document.querySelector('#get-forecast'),
cityInput = document.querySelector('#city-name');

let apiKey = '2ed7674ecb2c4f47bf9bd1406ecbd2a3'

$form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    $btn.textContent = '...';

    var xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKey}&lang=pt&city=${cityInput.value}`)

    xhr.addEventListener('load', function() {
        $form.reset()
        if(xhr.status == 200) {
            console.log(JSON.parse(xhr.responseText).data);
            var data = JSON.parse(xhr.responseText).data;
            appendData(data[0], 'today');
            appendData(data[1], 'tomorrow');
            $btn.textContent = 'Prever de novo!'
        } else {
            $btn.textContent = 'Deu ruim! :('
            setTimeout(() => {
                $btn.textContent = 'Prever!'
            }, 1000 );
        }
    })

    xhr.send()
})

let appendData = (data, day) => {
    var temp = `${data.temp}º`,
    maxTemp = `max ${data.max_temp}º`,
    minTemp = `min ${data.min_temp}º`,
    weatherStatus = data.weather.description,
    weatherIcon = `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`;
   
    var $div = document.querySelector(`#${day}`),
    $img = $div.querySelector('img'),
    $status = $div.querySelector('.weather-status'),
    $currentTemp = $div.querySelector('.current-temp'),
    $minTemp = $div.querySelector('.min-temp'),
    $maxTemp = $div.querySelector('.max-temp');

    $img.src = weatherIcon;
    $status.textContent = weatherStatus;
    $currentTemp.textContent = temp;
    $minTemp.textContent = minTemp;
    $maxTemp.textContent = maxTemp

    var $responseDiv = document.querySelector('.forecast-response');

    $responseDiv.classList.value.indexOf('is--visible') ? $responseDiv.classList.add('is--visible') : null;
    
    return
}