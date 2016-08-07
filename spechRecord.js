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

function speech(string) {
    recognizer.stop();
    var utterance = new SpeechSynthesisUtterance(string);
    utterance.voice = voices[1];
    speechSynthesis.speak(utterance);
    recognizer.start();
};

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
    var result = event.results[event.resultIndex];
    if (result.isFinal) {

        if(result.isFinal == "friday" && !callProgram)
        {
            callProgram == true;
            console.log("call program");
            speech("Hi! How are you today?");
        }
        else {

            speech(result[0].transcript);
        }

    } else {
        console.log('Промежуточный результат: ', result[0].transcript);
    }
};

recognizer.onerror = function(event) {
    console.log(event.error);

};
// Начинаем слушать микрофон и распознавать голос


