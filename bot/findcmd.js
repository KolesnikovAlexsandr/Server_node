/**
 * Created by sasha on 08/08/16.
 */

var optionsGoogle = ["найди в гугле" , "загугли" , "поиск в гугл" ,"открой гугл" ,"открой google" , "найди в google" ,"найди мне информацию о" ];
var optionsWiki = ["найди в википедии" , "открой википедию" ,"открой wiki" , "открой вики"];
var findIndex;

function getcmd(cmd)
{
    cmd = cmd.toLowerCase();
    console.log(cmd + ' !!');
    optionsGoogle.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            openGoogle(cmd,findIndex += item.length);
            return true;
        }
    });

    optionsWiki.forEach(function (item) {

        findIndex = cmd.indexOf(item);
        if(findIndex != -1)
        {
            openWiki(cmd,findIndex += item.length);
            return true;
        }
    });

    return false;
}


function  openGoogle(cmd , index) {
    window.open("https://www.google.by/search?q=" + cmd.substring(index), '_blank');
    console.log(index);
}

function  openWiki(cmd , index) {
    window.open("https://ru.wikipedia.org/wiki/" + cmd.substring(index), '_blank');
    console.log(index);
}
