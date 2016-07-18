/**
 * Created by sasha on 17/07/16.
 */

var server = require("./server.js");
var router =require("./route.js");

server.start(router.route);



