/**
 * Created by sasha on 18/07/16.
 */

var querystring = require("querystring");

function index(response , postDate) {

    console.log("Request handler 'index' was called.");
    console.log(response);
    // Читаем файл
    fs = require('fs');
    fs.readFile('./index.html', function(err, info){
        if (err) throw err;
        response.write(info);
        response.end();
    })


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
            console.log("load file:" + '.'+response);
            response.write(info);
            response.end();
        }
    })
}

exports.file = file;
exports.index = index;
exports.error = error;