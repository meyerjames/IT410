var fs = require('fs');
var Path = require('path');
var Promise = require('bluebird');

exports.getPathType = function(path) {
    if (typeof path !== 'string') return Promise.reject();
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(err, stats) {
            if (stats.isFile()) {
                resolve('file');
            }
            if (stats.isDirectory()) {
                resolve('directory');
            }
            else if (err) {
                resolve('nothing');
            } else {
                resolve('other')
            }
        })
    }).then(function(resolution) {
        return resolution;
    }).catch(function(problem) {
        console.warn(problem);
    })
};

exports.readdir = function(path) {
    return exports.getPathType(path)
        .then(function(type) {
            if (type !== 'directory') throw Error('Not a directory');
            return new Promise(function(resolve, reject) {
                fs.readdir(path, function(err, files) {
                    if (err) return reject(err);
                    return resolve(files);
                });
            });
        });
};

exports.getDirectoryTypes = function(path, depth, filter) {
    var result = {};

    if (arguments.length < 2) depth = -1;
    if (arguments.length < 3) filter = function() { return true };

    return exports.readdir(path)
        .then(function(files) {
            var promises = [];
            files.forEach(function(file) {
                var fullPath = Path.resolve(path, file);
                var promise = exports.getPathType(fullPath)
                    .then(function(type) {
                        if (filter(fullPath, type)) result[fullPath] = type;
                        if (type === 'directory' && depth !== 0) {
                            return exports.getDirectoryTypes(fullPath, depth - 1, filter)
                                .then(function(map) {
                                    Object.assign(result, map);
                                });
                        }
                    });
                promises.push(promise);
            });
            return Promise.all(promises)
                .then(function() {
                    return result;
                });
        });
};

exports.exists = function(path) {
    return exports.getPathType(path)
        .then(function(type) {
            return type === 'nothing';
        });
};

exports.getFilePaths = function(path) {
    var result = [];

    return exports.readdir(path)
        .then(function(files) {
            files.forEach(function(file) {
                var fullPath = Path.resolve(path, file);
                return exports.getPathType(fullPath)
                    .then(function(type) {
                        if (type === 'file') {
                            result.push(fullPath);
                        }
                        if (type === 'directory') {
                            fullPath = Path.resolve(path);
                            return exports.getFilePaths(fullPath)
                                .then(function() {
                                    if (type === 'file') {
                                        result.push(fullPath);
                                    }
                                })
                        }
                    });
            });
        })
};