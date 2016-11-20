/**
 * Created by sasha on 20/11/2016.
 */
var fx = require("./money.js");
var optionMoney = [["доллар","USD"],["российские рубли","RU"],["евро","EUR"]];
exports.MoneyConverter = function( message)
{
    var from = false;
    var to = false;
    var n = Number(message.replace(/\D+/g,""));
    fx.base = "USD";
    fx.rates = {
        "EUR" : 0.745101, // eg. 1 USD === 0.745101 EUR
        "GBP" : 0.647710, // etc...
        "HKD" : 7.781919,
        "USD" : 1,        // always include the base rate (1:1)
        /* etc */
    }
    optionMoney.forEach(function (item) {
        if(message.indexOf("в " + item[0]) != -1)
        {
            to = item;
        }
        else if(message.indexOf(item[0]) != -1 && message.indexOf("в " + item[0] == -1))
        {
            from = item;
        }
    });
    if(!from || !to)
        return false;
    else {
        console.log(from);
        console.log(to);
        console.log(n);
        return fx.convert(n, {from: from[1], to: to[1]});
    }


}