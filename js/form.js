let $btn = document.querySelector('#search-player');

$btn.addEventListener('click', function(event) {
    event.preventDefault();
    var summonerName = document.querySelector('#summoner-name').value,
    xhr = new XMLHttpRequest();

    xhr.open('GET', `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=RGAPI-c9390dbe-764a-4a1c-b3db-13adf5ecd4d6`);

    xhr.addEventListener('load', function() {
        if (xhr.status == 200) {
            var res = JSON.parse(xhr.responseText);
            console.log(res);
        } else {
            alert()
        }
    });

    xhr.send();
});