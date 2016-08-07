/**
 * Created by sasha on 18/07/16.
 */

var querystring = require("querystring");

function start(response , postDate) {
    console.log("Request handler 'start' was called.");

    // Читаем файл
    fs = require('fs');
    fs.readFile('./main.html', function(err, info){
        if (err) throw err;
        response.end(info);
    })
}

/**
 * Created by sasha on 18/07/16.
 */
function upload(response , postData) {

    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent: " + querystring.parse(postData).text);
    response.end();
}

exports.start = start;
exports.upload = upload;