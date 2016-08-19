/**
 * Created by sasha on 07/08/16.
 */
// Создаем распознаватель
var respond = '{"id":"*","answer":"*"}';

var recognizer = new webkitSpeechRecognition();
var voices = speechSynthesis.getVoices();



var callProgram = true;
var stopRecognizer = false;
function start() {
    recognizer.start();
}


// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;
recognizer.continuous = true;

// Какой язык будем распознавать?
recognizer.lang = 'ru-RU';

function speech(text) {
    // Create a new instance of SpeechSynthesisUtterance.
    var msg = new SpeechSynthesisUtterance();

    // Set the text.
    msg.text = text;

    // Set the attributes.
    msg.volume = parseFloat(100);
    msg.rate = parseFloat(5);
    msg.pitch = parseFloat(5);

    // If a voice has been selected, find the voice and set the
    // utterance instance's voice attribute.
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Veena"; })[0];


    // Queue this utterance.
    window.speechSynthesis.speak(msg);
}

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
    var result = event.results[event.resultIndex];
    console.log();
    if (result.isFinal) {
        var cmd = result[0].transcript.toLowerCase();
        //var request = new XMLHttpRequest();
        //respond = JSON.parse(respond);
        //respond.id = "user";
        //respond.answer = cmd;
        //request.open("POST",respond,true);
        //request.setRequestHeader("Content-type", "application/json; charset=utf-8");

        if( !getcmd(cmd) )
        {
            cmd = findMath(cmd);
            document.getElementById("userConsoleText").value = cmd;
            var event = new Event("click");
            userConsoleSendButton.dispatchEvent(event);

        }
    } else {
        console.log('Промежуточный результат: ', result[0].transcript);
        document.getElementById("userConsoleText").value = result[0].transcript;
        document.getElementById("userConsoleText").setAttribute('style',"color:red;")
    }
};

recognizer.onerror = function(event) {
    console.log(event.error);

};
// Начинаем слушать микрофон и распознавать голос

//http://google.com/images?q=крым&imgtype=photo

