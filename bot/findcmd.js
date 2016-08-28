/**
 * Created by sasha on 08/08/16.
 */

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
var optionReload = ["перезагрузка","перезагрузись","рестарт","рестартанись"]

var lastAnswer = ["последнее сообщение","повтори","что","что ты сказала","еще раз"];

var lastCmd = ["повтори команду","повтори последний запрос","еще раз команду","заново запрос","еще раз послднее действие","повторить запрос"];


var lastMessage = "Это первое сообщение";

var findIndex;
var tabs;
function Random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getcmd = function(cmd)
{
    cmd = cmd.toLowerCase();
    var findcmd = false;

    optionGoogleSerch.forEach(function (item) {
        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            lastMessage = "answer:"+answerSerch[Random(0,3)];
            findcmd = lastMessage+"***"+openGoogle(cmd,findIndex += item.length);
        }
    });

    optionGoogleOpen.forEach(function (item) {
        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            lastMessage = "answer:"+answerOk[Random(0,2)];
            findcmd = lastMessage+"***"+"openPage:google.com";
        }
    });


    optionWikiSerch.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            lastMessage = "answer:"+answerSerch[Random(0,3)];
            findcmd =  lastMessage+"***"+openWiki(cmd,findIndex += item.length);
        }
    });

    optionWikiOpen.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            lastMessage = "answer:"+answerOk[Random(0,2)];
            findcmd =  lastMessage+"***"+"openPage:ru.wikipedia.org/";
        }
    });

    optionGoogleMapSerch.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            lastMessage = "answer:"+answerSerch[Random(0,3)];
            findcmd =  lastMessage+"***"+openGoogleMap(cmd,findIndex += item.length);;
        }
    });

    optionGoogleMapOpen.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            lastMessage = "answer:"+answerOk[Random(0,2)];
            findcmd =  lastMessage+"***"+"openPage:google.ru/maps";
        }
    });

    optionReload.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            findcmd = "restart";
        }
    });

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
            console.log("min:" + min + " max:" + max + " lenth:" + lenthRandom) ;
            findcmd = "answer:"
            for(var i = 0 ; i < lenthRandom-1 ; i++)
            {
                findcmd+=Random(min,max)+" ";
            }
            findcmd+=Random(min,max);
            lastMessage = findcmd;
        }
    });

    lastAnswer.forEach(function (item) {
        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            findcmd = lastMessage;
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
