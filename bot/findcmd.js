/**
 * Created by sasha on 08/08/16.
 */


var CreateTxtFileByName = require("./WorkWithFile.js").CreateTxtFileByName;
var WriteTxtFile = require("./WorkWithFile.js").WriteTxtFile;

var optionGoogleSerch = ["-----","найди в гугле" , "загугли" , "поиск в гугл" , "найди в google" ,"найди мне информацию о" ,"найди в гугле про" ,"кто такой" ,"найди в гугле o" , "что такое" ];
var optionGoogleOpen = ["открой google","открой гугл"];

var optionWikiSerch = ["найди в википедии", "найти в википедии"];
var optionWikiOpen = ["открой википедию" ,"открой wiki" , "открой вики","открой wikipedia"];

var optionGoogleMapSerch = ["найди на карте","где находится","открой на карте","покажи на карте"];
var optionGoogleMapOpen = ["открой карты","открой карты google"];

var optionMath =[ ["минус","-"],["и минус","-"],["отнять","-"],["и отнять" , "-"],["плюс","+"],["и плюс","+"],["и прибавить","+"],["прибавить","+"],["умножить на" , "*"],["и умножить на" , "*"],["разделить на","/"],["и разделить на","/"]];

var answerOk = ["Хорошо","Сделано","Окей"];
var answerSerch = ["Вот что я нашла","Поиск выполнен","Вот ответ на ваш запрос"];

var randomSequence = [["выведи случайное число",1],["вывести случайное число",1],["вывести случайное число",1],["сгенерируй случайное число",1],["генерируй случайное число",1],["выведи случайную последовательность",-1],["вывести случайную последовательность",-1],["сгенерируй случайную последовательность",-1],["генерируй случайную последоватьльность",-1]];
var lenthSequence = [" от "," c "," до "]
var lenths = ["длинной ","размером "];

var TestBot = ["начать тестирование","запусти тесты","проведи тесты","запустить тесты"];
var optionReload = ["перезагрузка","перезагрузись","рестарт","рестартанись","перезагрузить"]

var lastAnswer = ["последнее сообщение","повтори","что ты сказала","еще раз"];

var lastCmd = ["повтори команду","повтори последний запрос","еще раз команду","заново запрос","еще раз послднее действие","повторить запрос"];
var byText = ["с текстом","c таким текстом","текстом"]
var make = ["создай файл","запиши","новый файл","создать файл"];
var fileNamequestion = ["Как назвать файл?","Назовите Файл","Имя файла"];

var VolumeControlOption =[["выключи звук","off"],["off звук","off"],["убери звук","off"],["включи звук","on"],["сделай громче","more"],["оффни звук","more"],["погромче","more"],["больше звука","more"],["громче","more"],["тише","less"],["слишком громко","less"],["выключить звук","off"]];

var ResultMass = [false,false,false,false,false,false,false,false,false,false,false,false]

var OpenProgOptins =["открой ","запусти "];

var lastMessage = "Это первое сообщение";

var ListOfFileTxt =[];

var flagOfComandContinue = [false,false,false,false];

var mysql = require('mysql');
var PythonShell = require('python-shell');

//var DataBaseConnect = mysql.createClient();

var findIndex;
var tabs;
function Random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


exports.ContinueComand = function (cmd) {
    var result = false;
    var writeLastFile = false;
    flagOfComandContinue.forEach(function (item ,index) {
        if( item ) {
            flagOfComandContinue[index] = false;
            switch (index)
            {
                case 0:
                    ListOfFileTxt[ListOfFileTxt.length] = cmd;
                    result = CreateTxtFileByName(cmd);
                break;
                case 1:
                    console.log(cmd + " !!");
                    if(cmd.indexOf("да ") !=  -1)
                    {
                        writeLastFile = true;
                        byText.forEach(function (item) {
                            console.log(item +"  " +cmd.indexOf(item) );
                            if(cmd.indexOf(item) != -1 && !result)
                            {
                                console.log( ListOfFileTxt[ListOfFileTxt.length] + "  " + cmd.substring(cmd.indexOf(item))+item.length);
                                writeLastFile = false;
                                WriteTxtFile(ListOfFileTxt[ListOfFileTxt.length-1],cmd.substring(cmd.indexOf(item )+item.length));
                                result = "answer:"+answerOk[Random(0,2)];
                            }
                        });
                    }
                    else if(cmd.indexOf("нет") !=  -1){
                        result = "answer:"+answerOk[Random(0,2)];
                    }
                    else {
                        result = "answer:Записать файл?"
                    }
                break;
                case 2:

                break;
                case 3:

                break;
            }
        }
    });
    if(result == "answer:Записать файл?")
    {
        flagOfComandContinue[1] = true;
    }
    if(writeLastFile)
    {
        flagOfComandContinue[2] = true;
    }
    return result;
}

exports.getcmd = function(cmd)
{
    cmd = cmd.toLowerCase();
    var comandCaunter = ResultMass.length;
    var findcmd = false;
    optionGoogleSerch.forEach(function (item) {
        findIndex = cmd.indexOf(item);
            if(findIndex != -1 && !findcmd)
            {
                lastMessage = "answer:"+answerSerch[Random(0,3)];
                findcmd = lastMessage+"***"+openGoogle(cmd,findIndex += item.length);
            }
    });


        if(!findcmd)
        optionGoogleOpen.forEach(function (item) {
            findIndex = cmd.indexOf(item);
            if(findIndex != -1 )
            {
                lastMessage = "answer:"+answerOk[Random(0,2)];
                findcmd = lastMessage+"***"+"openPage:google.com";
            }
        });

        if(!findcmd)
        optionWikiSerch.forEach(function (item) {

            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                lastMessage = "answer:"+answerSerch[Random(0,3)];
                findcmd =  lastMessage+"***"+openWiki(cmd,findIndex += item.length);
            }
        });

    if(!findcmd)
        optionWikiOpen.forEach(function (item) {

            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                lastMessage = "answer:"+answerOk[Random(0,2)];
                findcmd =  lastMessage+"***"+"openPage:ru.wikipedia.org/";
            }
        });


    if(!findcmd)
        optionGoogleMapSerch.forEach(function (item) {

            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                lastMessage = "answer:"+answerSerch[Random(0,3)];
                findcmd =  lastMessage+"***"+openGoogleMap(cmd,findIndex += item.length);
            }
        });

    if(!findcmd)
        optionGoogleMapOpen.forEach(function (item) {

            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                lastMessage = "answer:"+answerOk[Random(0,2)];
                findcmd =  lastMessage+"***"+"openPage:google.ru/maps";
            }
        });
    if(!findcmd)
        optionReload.forEach(function (item) {

            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                findcmd = "restart";
            }
        });

    if(!findcmd)
        randomSequence.forEach(function (item) {
            findIndex = cmd.indexOf(item[0])
            if(findIndex != -1)
            {
                var lenthRandom = item[1];
                var min = 0;
                var max = 1;
                var stringforRandom = cmd.substring(findIndex += item[0].length+1);
                stringforRandom = stringforRandom.split(" ");
                for(var i = 0 ; i < stringforRandom.length ; i++)
                {
                    if(stringforRandom[i] == "от" || stringforRandom[i] == "c")
                    {
                        min = Math.floor(stringforRandom[i+1]);
                    }
                    if(stringforRandom[i] == "до")
                    {
                        max = Math.floor(stringforRandom[i+1]);
                    }
                    if(stringforRandom[i] == "длиной" || stringforRandom[i] == "размером")
                    {
                        lenthRandom = Math.floor(stringforRandom[i+1]);
                    }
                }
                var buf;
                console.log("min:" + min + " max:" + max + " lenth:" + lenthRandom) ;
                buf = "answer:"
                for(var i = 0 ; i < lenthRandom-1 ; i++)
                {
                    buf+=Random(min,max)+" ";
                }
                buf+=Random(min,max);
                findcmd = buf;
                lastMessage = buf;
            }
        });

    if(!findcmd)
        lastAnswer.forEach(function (item) {
            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                findcmd = lastMessage;
            }
        });

    if(!findcmd)
    TestBot.forEach(function (item) {
        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            findcmd = "test";
        }
    });

    if(!findcmd)
    make.forEach(function (item) {
        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            flagOfComandContinue[0] = true;
            findcmd =  "answer:"+fileNamequestion[Random(0,2)];
        }
    });

    if(!findcmd)
    OpenProgOptins.forEach(function (item) {
        var flagOpen = false;
        var options = {
            args: [""]
        };

        findIndex = cmd.indexOf(item);

        if(findIndex != -1)
        {
            if(cmd.indexOf("skype") != -1 || cmd.indexOf("скайп") != -1)
            {
                options.args = "skype";
                flagOpen = true;
            }
            else if(cmd.indexOf("twitter") != -1 || cmd.indexOf("твитер") != -1 || cmd.indexOf("твиттер") != -1)
            {
                options.args = "twitter";
                flagOpen = true;
            }
            else if(cmd.indexOf("xcode") != -1 )
            {
                options.args = "xcode";
                flagOpen = true;
            }
            else if(cmd.indexOf("айтюнс") != -1 || cmd.indexOf("itunes") != -1 || cmd.indexOf("музык") != -1 )
            {
                options.args = "itunes";
                flagOpen = true;
            }
            console.log(options.args);
            if( flagOpen )
            {
                flagOpen = false

                findcmd = "answer:" + answerOk[Random(0, 2)];

                PythonShell.run('PythonScript/LaunchProg.py', options, function (err, results) {if (err) throw err;});

            }

        }

    });

    if(!findcmd)
    VolumeControlOption.forEach(function (item) {
        var options = {
            args: [""]
        };
        findIndex = cmd.indexOf(item[0]);
        if( findIndex != -1)
        {
            options.args = item[1];
            PythonShell.run('PythonScript/VolumeControl.py', options, function (err, results) {if (err) throw err;});
            findcmd = "answer:" + answerOk[Random(0, 2)];
        }
    });
    return findcmd;
}


function  openGoogle(cmd , index) {
   return "openPage:google.by/search?q=" + cmd.substring(index);
}

function  openWiki(cmd , index) {
    return "openPage:ru.wikipedia.org/wiki/" + cmd.substring(index);
}

function openGoogleMap(cmd , index)
{
    return "openPage:google.ru/maps/place/" + cmd.substring(index);
}

exports.findMath = function(cmd) {
    
    optionMath.forEach(function (item) {
        if(cmd.indexOf(item[0]) != -1)
        {
            while(cmd.indexOf(item[0]) != -1) {
                cmd = cmd.replace(item[0], item[1]);
            }
        }
    });
    return cmd;
}

exports.useLastCmd = function (cmd) {
    var flag = false;
    lastCmd.forEach(function (item) {
        if(cmd.indexOf(item) != -1)
            flag = true;
    });
    return flag;
}
