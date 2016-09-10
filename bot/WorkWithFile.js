
exports.CreateTxtFileByName = function (filename) {
    var path = require('path');
    var fs = require('fs');
    fs.writeFile("TextNote/"+filename+'.txt', '', function (err) {
        if (err) throw err;
        console.log('It\'s saved! in same location.');
    });
}