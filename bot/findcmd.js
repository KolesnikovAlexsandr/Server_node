/**
 * Created by sasha on 08/08/16.
 */


var CreateTxtFileByName = require("./WorkWithFile.js").CreateTxtFileByName;
var WriteTxtFile = require("./WorkWithFile.js").WriteTxtFile;
var СheckDevice = require("./CheckDevice.js").checkDevice;
//var child_process = require('child_process');

var optionGoogleSerch = ["-----","найди в гугле" , "загугли" , "поиск в гугл" , "найди в google" ,"найди мне информацию о" ,"найди в гугле про" ,"кто такой" ,"найди в гугле o" , "что такое" ];
var optionGoogleOpen = ["открой google","открой гугл"];

var optionWikiSerch = ["найди в википедии", "найти в википедии"];
var optionWikiOpen = ["открой википедию" ,"открой wiki" , "открой вики","открой wikipedia"];

var optionGoogleMapSerch = ["найди на карте","где находится","открой на карте","покажи на карте"];
var optionGoogleMapOpen = ["открой карты","открой карты google"];

var optionMath =[ ["минус","-"],["и минус","-"],["отнять","-"],["и отнять" , "-"],["плюс","+"],["и плюс","+"],["и прибавить","+"],["прибавить","+"],["умножить на" , "*"],["и умножить на" , "*"],["разделить на","/"],["и разделить на","/"]];

var answerOk = ["Хорошо","Сделано","Окей","Выполнено"];
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

var AppOption = [["skype","skype"],["скайп","skype"],["itunes","itunes"],["музык","itunes"],["айтюнс","itunes"],["xcode","xcode"],["twitter","twitter"],["твитер","twitter"],["твиттер","twitter"],["терминал","terminal"],["terminal","terminal"],["календарь","celendar"],["найстройки компьютера","prefernces"],["браузер","safari"],["сафари","safari"],["safari","safari"]];
var ResultMass = [false,false,false,false,false,false,false,false,false,false,false,false]
var rate = ["покажи курс","открой курс"];

var OpenProgOptins =["открой ","запусти "];
var CloseProgOptins =["закрой","заверши","убей процесс"];
var andOption =["а "];
var lastMessage = "Это первое сообщение";

var ListOfFileTxt =[];

var flagOfComandContinue = [false,false,false,false];
var endOfRequest = 0;
var mysql = require('mysql');
var PythonShell = require('python-shell');
var lastComand = "";
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
                        result = "answer:"+answerOk[Random(0,3)];
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

exports.getcmd = function( cmd , device)
{
    cmd = cmd.toLowerCase();
    var comandCaunter = ResultMass.length;
    var findcmd = false;
    
    andOption.forEach(function (item) {
       findIndex = cmd.indexOf(item);
       if(findIndex != -1)
       {
           cmd = lastComand.substring(0,endOfRequest) + " " + cmd.substring(item.length,cmd.length);
           console.log(cmd);
       }
    });

    optionGoogleSerch.forEach(function (item) {
        findIndex = cmd.indexOf(item);
            if(findIndex != -1 && !findcmd  )
            {

                endOfRequest = findIndex + item.length;
                lastMessage = "answer:"+answerSerch[Random(0,3)];
                findcmd = lastMessage+"***"+openGoogle(cmd,findIndex += item.length);

            }
    });


        if(!findcmd)
        optionGoogleOpen.forEach(function (item) {
            findIndex = cmd.indexOf(item);
            if(findIndex != -1 )
            {
                endOfRequest = findIndex + item.length;
                lastMessage = "answer:"+answerOk[Random(0,3)];
                findcmd = lastMessage+"***"+"openPage:google.com";
            }
        });

        if(!findcmd)
        optionWikiSerch.forEach(function (item) {

            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                endOfRequest = findIndex + item.length;
                lastMessage = "answer:"+answerSerch[Random(0,3)];
                findcmd =  lastMessage+"***"+openWiki(cmd,findIndex += item.length);
            }
        });

    if(!findcmd)
        optionWikiOpen.forEach(function (item) {

            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                endOfRequest = findIndex + item.length;
                lastMessage = "answer:"+answerOk[Random(0,3)];
                findcmd =  lastMessage+"***"+"openPage:ru.wikipedia.org/";
            }
        });


    if(!findcmd)
        optionGoogleMapSerch.forEach(function (item) {

            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                endOfRequest = findIndex + item.length;
                lastMessage = "answer:"+answerSerch[Random(0,3)];
                findcmd =  lastMessage+"***"+openGoogleMap(cmd,findIndex += item.length);
            }
        });

    if(!findcmd)
        optionGoogleMapOpen.forEach(function (item) {

            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                endOfRequest = findIndex + item.length;
                lastMessage = "answer:"+answerOk[Random(0,3)];
                findcmd =  lastMessage+"***"+"openPage:google.ru/maps";
            }
        });
    if(!findcmd)
        optionReload.forEach(function (item) {

            findIndex = cmd.indexOf(item);
            if(findIndex != -1 && cmd.length == item.length)
            {
                endOfRequest = findIndex + item.length;
                findcmd = "restart";
            }
        });

    if(!findcmd)
        randomSequence.forEach(function (item) {
            findIndex = cmd.indexOf(item[0])
            if(findIndex != -1)
            {
                endOfRequest = findIndex + item.length;
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
        if(cmd.indexOf(OpenProgOptins[0]) != -1 || cmd.indexOf(OpenProgOptins[1]) != -1)
            AppOption.forEach(function (item) {
            findIndex = cmd.indexOf(item[0]);
            if( findIndex != -1)
            {
                endOfRequest = findIndex + item.length;
                var options = {
                    args: [""]
                };
                options.args = item[1];
                PythonShell.run('PythonScript/LaunchApp.py', options, function (err, results) {if (err) throw err;});
                findcmd = "answer:" + answerOk[Random(0, 3)];
            }
        });

    if(!findcmd)
        if(cmd.indexOf(CloseProgOptins[0]) != -1 || cmd.indexOf(CloseProgOptins[1]) != -1 || cmd.indexOf(CloseProgOptins[2]) != -1)
            AppOption.forEach(function (item) {
                findIndex = cmd.indexOf(item[0]);
                if( findIndex != -1)
                {
                    endOfRequest = findIndex + item.length;
                    var options = {
                        args: [""]
                    };
                    options.args = item[1];
                    PythonShell.run('PythonScript/CloseApp.py', options, function (err, results) {if (err) throw err;});
                    findcmd = "answer:" + answerOk[Random(0, 3)];
                }
            });

    if(!findcmd)
    VolumeControlOption.forEach(function (item) {
        findIndex = cmd.indexOf(item[0]);
        if( findIndex != -1)
        {
            endOfRequest = findIndex + item.length;
            var options = {
                args: [""]
            };
            options.args = item[1];
            PythonShell.run('PythonScript/VolumeControl.py', options, function (err, results) {if (err) throw err;});
            findcmd = "answer:" + answerOk[Random(0, 3)];
        }
    });


    if(!findcmd)
        if(cmd.indexOf("перезапусти") != -1 || cmd.indexOf("перезагрузи") != -1 )
            AppOption.forEach(function (item) {
                findIndex = cmd.indexOf(item[0]);
                if( findIndex != -1)
                {
                    endOfRequest = findIndex + item.length;
                    var options = {
                        args: [""]
                    };
                    options.args = item[1];
                    PythonShell.run('PythonScript/RestartApp.py', options, function (err, results) {if (err) throw err;});
                    findcmd = "answer:" + answerOk[Random(0, 3)];
                }
            });

    if(!findcmd)
        rate.forEach(function (item) {

            findIndex = cmd.indexOf(item);
            if(findIndex != -1)
            {
                endOfRequest = findIndex + item.length;
                lastMessage = "answer:"+answerOk[Random(0,3)];
                findcmd =  lastMessage+"***"+"insert_element:"+"<script src="+"'http://informers.forexpf.ru/php/cbrf.php?id=01'" + "></script>";
            }
        });
    lastComand = cmd;
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

exports.setLastComand = function (cmd) {
  lastComand = cmd;  
};

exports.setLastComandendRequest = function (index) {
    endOfRequest = index;
};