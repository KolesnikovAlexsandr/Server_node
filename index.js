/**
 * Created by sasha on 17/07/16.
 */
var http = require("http");
var i = 0;

function onRequest(reguest,response) {
    i++;
    console.log("Request received "+ i);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Start Server");