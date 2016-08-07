/**
 * Created by sasha on 18/07/16.
 */


//redirect requests
function route(handle , pathname , response , postDate) {
    
    console.log("About for route a request for " + pathname);
    console.log(postDate);
    if(typeof handle[pathname] === 'function' )
    {
        handle[pathname](response,postDate);
    }
    else {
        handle["file"](response,pathname);
    }


}

exports.route = route;