/**
 * Created by sasha on 17/07/16.
 */
var http = require("http");
var url = request("url");
var counter_of_clients = 0;

function start() {

    function onRequest(reguest, response) {
        counter_of_clients++;
        console.log("Request received " + i);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Start Server");
}
