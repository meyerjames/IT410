var expect = require('chai').expect;
var files = require('../files');
var Promise = require('bluebird');

describe('myFiles', function() {
    describe('finding what the thing is', function() {

        it('returns a promise', function () {
            expect(files.getFileType('assignments/file-system-promises/textFile.txt')).to.be.instanceof(Promise);
        });

        it('is a file', function () {
            return files.getFileType('assignments/file-system-promises/textFile.txt')
                .then(function (result) {
                    expect(result).to.equal('File');
                });
        });

        it('is a directory', function () {
            return files.getFileType('assignments/file-system-promises')
                .then(function (result) {
                    expect(result).to.equal('Directory');
                });
        });

        it('is a directory', function () {
            return files.getFileType('trogdor')
                .then(function (result) {
                    expect(result).to.equal('Nothing');
                });
        });

    });
});

//files.getFileType('assignments/file-system-promises/textFile.txt');
//
//files.getFileType('assignments/file-system-promises');
//
//files.getFileType('trogdor')