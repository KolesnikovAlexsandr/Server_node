/**
 * Created by sasha on 08/08/16.
 */

var optionGoogleSerch = ["найди в гугле" , "загугли" , "поиск в гугл" , "найди в google" ,"найди мне информацию о" ,"найди в гугле про" ,"кто такой" ,"найди в гугле o" , "что такое" ];
var optionGoogleOpen = ["открой google","открой гугл"];

var optionWikiSerch = ["найди в википедии" , "найди в вики" , "найди в википедии о" ,"найди в вики о"];
var optionWikiOpen = ["открой википедию" ,"открой wiki" , "открой вики","открой wikipedia"];

var optionGoogleMapSerch = ["найди на карте","где находится","открой на карте","покажи на карте"];
var optionGoogleMapOpen = ["открой карты","открой карты google"];

var optionMath =[ ["минус","-"],["и минус","-"],["отнять","-"],["и отнять" , "-"],["плюс","+"],["и плюс","+"],["и прибавить","+"],["прибавить","+"],["умножить на" , "*"],["и умножить на" , "*"],["разделить на","/"],["и разделить на","/"]];

var answerOk = ["Хорошо","Сделано","Окей"];
var answerSerch = ["Вот что я нашла","Поиск выполнен","Вот ответ на ваш запрос"];

var findIndex;
var tabs;
function Random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getcmd(cmd)
{
    cmd = cmd.toLowerCase();
    var findcmd;

    optionGoogleSerch.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            findcmd = "answer:"+answerSerch[Random(0,2)]+" "+openGoogle(cmd,findIndex += item.length);
            return findcmd;
        }
    });

    optionGoogleOpen.forEach(function (item) {


        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            findcmd = "answer:"+answerOk[Random(0,2)]+" "+"openPage:google.com";
            return findcmd;
        }
    });


    optionWikiSerch.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            findcmd =  "answer:"+answerSerch[Random(0,2)]+" "+"openPage:"+openWiki(cmd,findIndex += item.length);
            return findcmd;
        }
    });

    optionWikiOpen.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            findcmd =  "answer:"+answerOk[Random(0,2)]+" "+"openPage:ru.wikipedia.org/";
            return findcmd;
        }
    });

    optionGoogleMapSerch.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            openGoogleMap(cmd,findIndex += item.length);
            findcmd =  "answer:"+answerOk[Random(0,2)]+" "+openGoogleMap(cmd,findIndex += item.length);;
            return findcmd;
        }
    });
    return false;
}


function  openGoogle(cmd , index) {
   return " openPage:https://www.google.by/search?q=" + cmd.substring(index);
}

function  openWiki(cmd , index) {
    return "openPage:https://ru.wikipedia.org/wiki/" + cmd.substring(index);
}

function openGoogleMap(cmd , index)
{
    return "openPage:https://www.google.ru/maps/place/" + cmd.substring(index);
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
