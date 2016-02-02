var fs = require('fs');
var Promise = require('bluebird');

exports.getFileType = function(path) {
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(err, stats) {
            if (err) {
                resolve('Nothing');
            } else if (stats.isFile()) {
                resolve('File');
            } else if (stats.isDirectory()) {
                resolve('Directory')
            } else {
                resolve('Other')
            }
            if(typeof stats !== 'string') {
                reject('You must pass a string')
            }
        })
    }).then(function(resolution) {
        return resolution;
    }).catch(function(problem) {
        console.warn(problem);
    })
};

exports.getDirectoryTypes = function(path, depth, filter) {
    var fileType = getFileType(path).then(function(result) { return result });
    var dirArray = [];
    var result = {};


    return new Promise(function(resolve, reject) {
        fs.readdir(directory, function(err, fileArray) {
            for (var i; i<fileArray.length; i++)
            if (fileType === 'File') {
                result.push(fileArray[i])
            }

            if (fileType === 'Directory' && depth > 0) {
                result.push(fileArray);

            } else {
                resolve(result);

            }
        })
    })

};



//console.log(process.cwd());