/**
 * Created by sasha on 07/08/16.
 */
// Создаем распознаватель
var recognizer = new webkitSpeechRecognition();
var voices = speechSynthesis.getVoices();

function start() {
    recognizer.start();
}

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;
recognizer.continuous = true;

// Какой язык будем распознавать?
recognizer.lang = 'en-US';

function speech(string) {
    var utterance = new SpeechSynthesisUtterance(string);
    utterance.voice = voices[1];
    speechSynthesis.speak(utterance);

};

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
    console.log('sasha');
    var result = event.results[event.resultIndex];
    if (result.isFinal) {
        speech(result[0].transcript);
    } else {
        console.log('Промежуточный результат: ', result[0].transcript);
    }
};

recognizer.onerror = function(event) {
    console.log(event.error);
};
// Начинаем слушать микрофон и распознавать голос
//recognizer.start();

