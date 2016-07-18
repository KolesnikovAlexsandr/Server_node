/**
 * Created by sasha on 17/07/16.
 */

var server = request("./server.js");
var router =request("./route.js");

server.start(router.route);



