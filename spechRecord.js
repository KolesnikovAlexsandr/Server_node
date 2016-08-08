/**
 * Created by sasha on 07/08/16.
 */
// Создаем распознаватель
var recognizer = new webkitSpeechRecognition();
var voices = speechSynthesis.getVoices();

var callProgram = false;
function start() {
    recognizer.start();
}

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;
recognizer.continuous = true;

// Какой язык будем распознавать?
recognizer.lang = 'en-US';

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
    if (result.isFinal) {
        var cmd = result[0].transcript;
        cmd.toString();
        cmd.toLowerCase();
        console.log('Финальный результат:'+cmd);
        if( cmd == "Friday" && !callProgram)
        {
            recognizer.stop();
            callProgram == true;
            console.log("call program");
            speech("Hi! How are you today?");
        }
        else if(callProgram == true)
        {
            console.log("call program2");
            speech("spech something");
        }
    } else {
        console.log('Промежуточный результат: ', result[0].transcript);
    }
    recognizer.stop();
};

recognizer.onerror = function(event) {
    console.log(event.error);

};
// Начинаем слушать микрофон и распознавать голос


