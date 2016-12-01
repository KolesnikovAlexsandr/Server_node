/**
 * Created by sasha on 18/07/16.
 */

var querystring = require("querystring");
var bot = require("./bot/bot.js").getAnswer;

var respond = "";
function index(response , postDate) {
    console.log(postDate)
    console.log("User:" + postDate.substring(5));
    // Читаем файл
    if(postDate.indexOf("user:") != -1)
    {
        respond = bot(postDate.substring(5));
        console.log("Bot:" + respond);
        response.write(respond);
        response.end();
    }
    else {
        fs = require('fs');
        fs.readFile('./index.html', function (err, info) {
            if (err) throw err;
            response.write(info);
            response.end();
        })
    }


}

/**
 * Created by sasha on 18/07/16.
 */
function error(response , postData) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("404 not found: " + querystring.parse(postData).text);
    response.end();
}

function file(response , postData) {
    // Читаем файл
    console.log(postData);
    fs = require('fs');
    fs.readFile('.'+postData, function(err, info){
        if (err) error(response,postData);
        else 
        {
            response.write(info);
            response.end();
        }
    })
}

exports.file = file;
exports.index = index;
exports.error = error;