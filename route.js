/**
 * Created by sasha on 18/07/16.
 */


//redirect requests
function route(handle , pathname , response , postDate) {
    console.log("About for route a request for " + pathname);
    if(typeof handle[pathname] === 'function' )
    {
        handle[pathname](response,postDate);
    }
    else {
        console.log("No request handler found for " + pathname);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("404 not found");
        response.end();
    }


}

exports.route = route;