/**
 * Created by sasha on 17/07/16.
 */

var server = require("./server.js");
var router =require("./route.js");
var requestHandlers = require("./requestHandlers");


var handle = {}

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route , handle);



