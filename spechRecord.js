/**
 * Created by sasha on 07/08/16.
 */
// Создаем распознаватель
var respond = '{"id":"*","answer":"*"}';

var recognizer = new webkitSpeechRecognition();
var voices = speechSynthesis.getVoices();
var messegeField ;document.getElementById("monitor");
var BotMessageId = 0;
var UserMessageId = 0;

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

        if( !getcmd(cmd) )
        {
            cmd = findMath(cmd);
            UserMessageId ++;
            PrintMessage("user" , cmd);
            var request = new XMLHttpRequest();
            request.open("POST",'index',true);
            request.send("user:"+cmd);
            request.onreadystatechange = function()
            {
                if(request.readyState == 4)
                {
                    BotMessageId ++;
                    PrintMessage("bot",request.responseText);
                }
            }

        }
        else{

        }

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


