/**
 * Created by sasha on 07/08/16.
 */
// Создаем распознаватель
var respond = '{"id":"*","answer":"*"}';
var optionControlStop = ["закончить разговор","завершить работу","стоп запись","останавить запись","стоп","закончить"];
var optionControlStart = ["начать работу","пятница","начать запись","эй пятница","работай","старт"];
var answerBy = ["Пока","конец работы","By by"];
var answerHello = ["Здравствуйте сэр", "привет","Добрый день","начало работы"];

function Random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var recognizer = new webkitSpeechRecognition();
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
var messegeField ;document.getElementById("monitor");
var BotMessageId = 0;
var UserMessageId = 0;
var callProgram = true;
var work = false;
var transcription = 0;
var hiSpeeck = false;

function start() {
    recognizer.start();
}
function setWork(bool) {
    work = bool;
}

function StartWork(cmd)
{
    if(!work)
    {
        optionControlStart.forEach(function (item) {
            if(cmd.indexOf(item)!=-1) {
                setWork(true);
                PrintMessage("bot",answerHello[Random(0,3)]);
                return 0;
            }
        });
    }
}

function StopWork(cmd) {
    if(work) {
        optionControlStop.forEach(function (item) {
            if (cmd.indexOf(item) != -1) {
                setWork(false);
                PrintMessage("bot", answerBy[Random(0, 2)]);
                return 0;
            }
        });
    }
}


// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;
recognizer.continuous = true;

// Какой язык будем распознавать?
recognizer.lang = 'ru-RU';
msg.onend = function (event) {
    hiSpeeck = false;
}

function speech(text) {
    // Create a new instance of SpeechSynthesisUtterance.

    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[38]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 2; //0 to 2
    msg.text = text;
    msg.lang = 'ru-Ru';
    speechSynthesis.speak(msg);
}

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
    var result = event.results[event.resultIndex];
    if (result.isFinal) {
        document.getElementById("userConsoleText").value ="";
        var cmd = result[0].transcript.toLowerCase();
        StopWork(cmd);

        if(work) {
                UserMessageId++;
                PrintMessage("user", cmd);
                var request = new XMLHttpRequest();
                request.open("POST", 'index', true);
                request.send("user:" + cmd);
                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        BotMessageId++;
                        PrintMessage("bot", request.responseText);
                    }
                }
        }

        StartWork(cmd);
        
    } else {
        console.log('Промежуточный результат: ', result[0].transcript);
        document.getElementById("userConsoleText").value = result[0].transcript;
        document.getElementById("userConsoleText").setAttribute('style',"color:#DCDCDC;")
    }
};

recognizer.onerror = function(event) {
    console.log(event.error);

};


var PrintMessage = function(person , message)
{
    messegeField = document.getElementById("monitor");
    var messageElement = document.createElement("p");
    messageElement.setAttribute("style","border-radius: 20px;");
    if(person == "bot")
    {
        recognizer.stop();
        hiSpeeck = true;
        speech(message);
        messageElement.id = BotMessageId;
        messageElement.className = "lead bg-info text-left center-block";
        messageElement.appendChild(document.createTextNode("  "+message+"  "));
    }
    else
    {
        messageElement.id = UserMessageId;
        messageElement.className = "lead bg-danger text-right ";
        messageElement.appendChild(document.createTextNode("  " + message + "  "));
    }
    messegeField.appendChild(messageElement);
}
// Начинаем слушать микрофон и распознавать голос

function restart() {
    try
    {
        if(!hiSpeeck) {
            start();
            console.log("not work - restart");
        }
    }catch(e){
        console.log("work");
    }
}
setInterval(restart, 1000);