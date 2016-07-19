/**
 * Created by sasha on 18/07/16.
 */


//redirect requests
function route(handle , pathname) {
    console.log("About for route a request for " + pathname);
    if(typeof handle[pathname] === 'function' )
    {
        handle[pathname]();
    }
    else {
        console.log("No request handler found for " + pathname);
    }


}

exports.route = route;