/**
 * Created by sasha on 08/08/16.
 */

var optionsGoogle = ["найди в гугле" , "загугли" , "поиск в гугл" ,"открой гугл" ,"открой google" , "найди в google" ,"найди мне информацию о" ,"найди в гугле про" ,"кто такой" ,"найди в гугле o" , "что такое" ];
var optionsWiki = ["найди в википедии" , "открой википедию" ,"открой wiki" , "открой вики" , "найди в вики" , "найди в википедии о" ,"найди в вики о"];
var optionMath ={}
    optionMath [ "умножить" ] ="*";
    optionMath [ "разделить" ] ="/";

var findIndex;

function getcmd(cmd)
{
    cmd = cmd.toLowerCase();
    var findcmd = false;
    optionsGoogle.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            openGoogle(cmd,findIndex += item.length);
            console.log("true");
            findcmd =  true;
        }
    });

    optionsWiki.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            openWiki(cmd,findIndex += item.length);
            console.log("true");
            findcmd =  true;
        }
    });
    return findcmd;
}


function  openGoogle(cmd , index) {
    window.open("https://www.google.by/search?q=" + cmd.substring(index), '_blank');
    console.log(index);
}

function  openWiki(cmd , index) {
    window.open("https://ru.wikipedia.org/wiki/" + cmd.substring(index), '_blank');
    console.log(index);
}


function findMath(cmd) {
    cmd = cmd.toLowerCase();


    return cmd;
}
