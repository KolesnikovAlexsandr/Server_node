/**
 * Created by sasha on 18/07/16.
 */

var http = require("http");
var url = require("url");
var counter_of_clients = 0;


function start(router) {

    function onRequest(reguest, response) {
        counter_of_clients++;
        var pathname = url.parse(reguest.url).pathname;
        //console.log("Request for " + pathname + " received.");
        console.log("Request received " + counter_of_clients);
        router(pathname);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Start Server");
}

exports.start = start;