
try {
    throw new MyError('This is an error'); //this stops your code right here. Like a return statement.
} catch (e) {
    if (e.code === 'MYERR') {
        console.log('Oops');
    } else {
        throw e;
    }
} finally {
    //runs the code to the very end
}

function MyError(message) {
    this.name = 'MyError';
    this.code = 'MYERR';
    This.message = message;
    this.stack = (new Error()).stack;
}

MyError.prototype = Object.create(Error.prototype); //this creates an object that inherits from the Error.prototype object
MyError.prototype.constructor = MyError; //this overwrites the constructor function in the original object with the one we wrote.






