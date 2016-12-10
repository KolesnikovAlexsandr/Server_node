/**
 * Created by sasha on 18/07/16.
 */

var querystring = require("querystring");
var bot = require("./bot/bot.js").getAnswer;
var time = require('time');
var now = new time.Date();


var respond = "";
var device = "";
var cmd_mass = "";
var user_cmd = "";



function index(response , postDate) {
    //console.log(postDate)
    if(postDate.indexOf("device") != -1 && postDate.indexOf("user") != -1)
    {
        cmd = postDate.split("***");
        cmd.forEach(function (item) {
           if(item.indexOf("user:") != -1)
           {
               user_cmd = item.substring(5);
           }
           if(item.indexOf("device:") != -1)
           {
               device = item.substring(7);
           }
        });

        console.log( "User:" + user_cmd + "   device:"+device  +  "   Time:" + now);
        respond = bot( user_cmd , device );
        console.log("Bot:" + respond);
        response.write(respond);
        response.end();
    }
    else {
        now.setTimezone('UTC');
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