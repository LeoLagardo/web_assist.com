var commandList = document.getElementById("commands");





const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const bot_content = document.querySelector('bot-content');
const board = document.querySelector('.board');


const greetings = [
    'Hi, how are you doing today ?',
    'Hello !!'

];

const weather = [

];




const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function (event) {
    console.log('voice activated');
    document.getElementById('allow').style.display = "none";

};

recognition.onresult = function (event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);
};

//recognition.start();


//Listener

btn.addEventListener('click', () => {
    recognition.start();
    document.getElementById('press').style.display = "none";
});



function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = 'Sorry I couldn\'t understant you';

    //greetings
    if (message.includes('hi') || message.includes('hello')) {
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    }

    //open new tab
    if (message.includes('new tab')) {
        speech.text = 'opening . .';
        window.open();
    }

    //email
    if (message.includes('email') || message.includes('gmail')) {
        speech.text = 'showing email';
        window.open('http://mail.google.com');
    }

    //show commands
    if (message.includes('commands') || message.includes('command')) {

        speech.text = 'Here\'s the commands';
        document.getElementById('board').style.display = "block";

        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'script.json');
        ourRequest.onload = function () {
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        };

        ourRequest.send();

    }

    //weather

    if (message.includes('weather') || message.includes('temperature')) {

        //speech.text = 'Here\'s the commands';
        speech.text = 'the temperature is ';

        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&units=metric&appid=b3c25358b477401fc8b67083de1e063c');
        ourRequest.onload = function () {


            var ourData = JSON.parse(ourRequest.responseText);
            var temp = ourData.main.temp;
            content.innerHTML = ourData.main.temp + " C" + "<br>" + ourData.weather[0].description;



            //console.log(ourData);
            //const res_string = ourData.main.temp + " C"+ "\n" + ourData.weather[0].description;
            // content.textContent = res_string;

        };

        ourRequest.send();

    }

    //render command list form script.json
    function renderHTML(data) {
        var HTMLstring = " ";

        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].commandList.length; j++) {
                HTMLstring += "<li>" + data[i].commandList[j] + "</li>";
            }
        }

        commandList.insertAdjacentHTML('beforeend', HTMLstring);
    }


    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 5;

    window.speechSynthesis.speak(speech);
}
