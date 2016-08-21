/**
 * Created by sasha on 08/08/16.
 */

var optionsGoogle = ["найди в гугле" , "загугли" , "поиск в гугл" ,"открой гугл" ,"открой google" , "найди в google" ,"найди мне информацию о" ,"найди в гугле про" ,"кто такой" ,"найди в гугле o" , "что такое" ];
var optionsWiki = ["найди в википедии" , "открой википедию" ,"открой wiki" , "открой вики" , "найди в вики" , "найди в википедии о" ,"найди в вики о"];
var optionsGoogleMap = ["найди на карте","где находится","открой карты","открой карты google","открой карты google","открой на карте"];
var optionMath =[ ["минус","-"],["и минус","-"],["отнять","-"],["и отнять" , "-"],["плюс","+"],["и плюс","+"],["и прибавить","+"],["прибавить","+"],["умножить на" , "*"],["и умножить на" , "*"],["разделить на","/"],["и разделить на","/"]];
var optionControlStop = ["закончить разговор","стоп запись","останавить запись","стоп","закончить"];
var optionControlStart = ["начать работу","пятница","начать запись","эй пятница","работай","старт"];
var optionClose = ["закрой страницу","закрыть страницу","закрыть вкладку" ,"закрой текущую вкладку"];
var answerBy = ["Пока","конец работы","By by"];
var answerOk = ["Хорошо","Сделано","Окей","Вот что я нашла"];
var answerHello = ["Здравствуйте сэр", "привет","Добрый день","начало работы"];

var findIndex;
var tabs;
function Random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getcmd(cmd)
{
    cmd = cmd.toLowerCase();
    var findcmd = false;
    optionsGoogle.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            openGoogle(cmd,findIndex += item.length);
            findcmd =  true;
        }
    });

    optionsWiki.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            openWiki(cmd,findIndex += item.length);
            findcmd =  true;
        }
    });

    optionsGoogleMap.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            openGoogleMap(cmd,findIndex += item.length);
            findcmd =  true;
        }
    });
    if(findcmd)
    {
        PrintMessage("user",cmd);
        PrintMessage("bot",answerOk[Random(0,3)]);
    }

    optionClose.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            tabs.close();
            findcmd =  true;
        }
    });


    return findcmd;
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

function  openGoogle(cmd , index) {
   tabs = window.open("https://www.google.by/search?q=" + cmd.substring(index), '_blank');
}

function  openWiki(cmd , index) {
    tabs = window.open("https://ru.wikipedia.org/wiki/" + cmd.substring(index), '_blank');
}

function openGoogleMap(cmd , index)
{
    tabs = window.open("https://www.google.ru/maps/place/" + cmd.substring(index), '_blank');
}

function findMath(cmd) {
    
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
