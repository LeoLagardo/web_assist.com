let commandList = document.getElementById("commands");


const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const bot_content = document.querySelector('.bot-content');
const board = document.querySelector('.board');
const exp = document.querySelector('.best-exp');


const greetings = [
    'Hi, how are you doing today ?',
    'Hello !!',
    'Hi, how can I help you?'

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

function hide(){
    exp.style.display="none";
}

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

    //close tab
    if (message.includes('close tab') || message.includes('Close tab')) {
        speech.text = 'closing . .';
        window.close();
    }

    //reload tab
    if (message.includes('reload') || message.includes('refresh')) {
        speech.text = 'reloading . .';
        window.location.reload();
    }

    //youtube
    if (message.includes('YouTube')) {
        speech.text = 'opening . . ';
        window.open('http://youtube.in');
    }

    //shopping
    if (message.includes('Shopping') || message.includes('shopping')) {
        speech.text = 'opening . . ';
        window.open('http://amazon.in');
    }


    //email
    if (message.includes('email') || message.includes('Gmail')) {
        speech.text = 'showing email';
        window.open('http://mail.google.com');
    }

    //calendar
    if (message.includes('calendar') || message.includes('Calendar')) {
        speech.text = 'showing calendar';
        window.open('https://calendar.google.com/');
    }

    //show commands
    if (message.includes('commands') || message.includes('command')) {

        speech.text = 'Here\'s the commands';
        document.getElementById('board').style.display = "block";
        document.getElementById('show-comm').style.display = "none";

        //ajax request
        let ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'script.json');
        ourRequest.onload = function () {
            let ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        };

        ourRequest.send();


    }

    //weather

    if (message.includes('weather') || message.includes('temperature')) {

       
        speech.text = 'the temperature is ';

        let ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&units=metric&appid=b3c25358b477401fc8b67083de1e063c');
        ourRequest.onload = function () {


            let ourData = JSON.parse(ourRequest.responseText);
            let temp = ourData.main.temp;
            content.innerHTML = ourData.main.temp + " C" + "<br>" + ourData.weather[0].description;



            //console.log(ourData);
            //const res_string = ourData.main.temp + " C"+ "\n" + ourData.weather[0].description;
            // content.textContent = res_string;

        };

        ourRequest.send();

    }

    //render command list form script.json
    function renderHTML(data) {
        let HTMLstring = " ";

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].commandList.length; j++) {
                HTMLstring += "<li>" + data[i].commandList[j] + "</li>";
            }
        }

        commandList.insertAdjacentHTML('beforeend', HTMLstring);
    }


    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}
