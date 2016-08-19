/**
 * Created by sasha on 18/07/16.
 */

var http = require("http");
var url = require("url");
var counter_of_clients = 0;

//function(nodejs module) start server and get response and request
function start(route , handle) {

    function onRequest(request, response) {

        var postData = "";
        var pathname = url.parse(request.url).pathname;

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {

            postData += postDataChunk;
            postData.toJSON();
            console.log("!!" +postData)
            
        });

        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });
        
    }

    http.createServer(onRequest).listen(8888);
    console.log("Start Server");
}

exports.start = start;