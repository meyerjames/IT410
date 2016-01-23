

/************* Class 1 *************/


//code to get into this room 42368

//blue bloods, and madame secretary are James' favorite tv series

console.log('hello');

// standard error output stream?
// standard data output stream?

console.info('hello');
console.warn('hello');
console.error('hello');

//non-primitive data types have properties like person.age
//immutable data type means it cannot be changed
//assignment means you're passing a value as opposed to a reference, reference means the same point in memory

console.log(typeof "hello");

console.log(5+5-"hello");
console.log(5+5+"hello");

var a = {};
var b = {};

//same as a = new Object();

//Exercise 1
a.name = "Bob";
b.person = a;

console.log(a.name);
a.name = "Robert";

console.log(b.person.name); //changes to Robert because its a reference

//Exercise 2
var o = {};
o.name = "Bob"; //or var o = { name: "Bob" };

a = [];

a.push(o);
a.push(o);

//console.log(a[0]); - wrong - outputs: { name: 'Bob' }
console.log(a[0].name);

//console.log(a[1]);
console.log(a[1].name);

o.name = "Robert";

console.log(a[0].name);
console.log(a[1].name);

//A property can either be a name or symbol

//Exercise 3
var object = {name: "James", age: 34};

var objectProperties = [];
var k;

for (k in object) {
    if (object.hasOwnProperty(k)) {
        objectProperties.push(k);
    }
}

//or instead of the loop, objectKey(o);

console.log(objectProperties);

//what does a "functional" programming language mean?

//use var to define variables within a closure

//Exercise 4

function learning(x, y) {
    var i;
    var a = [];

    for (i = 0; i <arguments.length; i++) {
        a.push(arguments[i]);
    }
    console.log(a);
    //return a;
}

//console.log(learning(1,2,3,4,5));

//Exercise 5
function forFun(x, y) {
    var i;

    for (i=0; i<arguments.length; i++) {
        y(1, 2, 3, 4, 5);
    }

}

forFun(1, learning, 1, 1, 1);


/************* Class 2 *************/


//Git
//2 parameters: array of items, callback function
//for each item in array, call the callback function with item from array

var arrayOfNumbers = [1, 2, 3, 4, 5, -4, -24, 753, -32];
var arrayOfFunctions = [
    function() {console.log('Im function 1')},
    2,
    3,
    function() {console.log('Im function 2')},
    4,
    5,
    function() {console.log('Im function 3')}
];

function forEach (array, callback) { //this generic function will go through each item in the array and do something to it, determined by the logic in callback
    var i;
    var item;

    for (i=0; i < array.length; i++) {
        item = array[i];
        callback(item, i);
    }
}

//with an array of numbers, if the number is positive then console.log the number
//if the number is negative then console.warn the number

function logNumber(item, index) { //this is a function that can process an element in an array
    if (item < 0) {
        console.warn(item);
    } else {
        console.log(item);
    }
}

function functionCheck (fn, index) { //this is a function that can process an element in an array - it will run a function if it finds it in an array
    if (typeof(fn) === 'function') {
        fn();
    }
}

function absolute(item, index) { //returns the absolute value of the number
    if (item < 0 ) {
        return (item * -1);
    }
    return item;
    //or just return Math.abs(item);
}

function transform(array, callback) { //callback will be the transformer - this function modifies the array
    var i;
    var item;

    for (i=0; i < array.length; i++) {
        item = array[i];
        array[i] = callback(item, i); //better to save this to a new array rather than write over this one
    }
    return array;
}

//used to filter - create a new array with only the things you want
function betterTransform(array, callback) { //callback will be the transformer - this function modifies the array.
    var i;
    var item;
    var result = []; //the new array

    for (i = 0; i < array.length; i++) {
        item = array[i];
        result.push(callback(item, i)); //this is saving to a new array
    }
    return result;
}

function filter(array, callback) { //array is the array you want to filter stuff out of, and callback is the filter criteria logic
    var i;
    var item;
    var result = []; //the new array
    var pass; //will be true or false depending on what the callback function returns

    for (i = 0; i < array.length; i++) {
        item = array[i];
        pass = callback(item, i);
        if (pass) result.push(item); //this is creating your new array based on only thing things you want
    }
    return result;
}

function square(item, index) {
    return item * index;
    //or just return Math.pow(items, 2);
}


// forEach(arrayOfNumbers, logNumber);
// forEach(arrayOfFunctions, functionCheck);
// forEach(arrayOfFunctions, logNumber);

/*
forEach(arrayOfNumbers, function(item, index) {
    console.log(absolute(item, index));
});
*/

console.log(betterTransform(arrayOfNumbers, absolute));

//the array object already has forEach, transform, and filter - but now we know how they work
//transform is called map

//arrayOfNumbers.forEach(logNumber);
//console.log(arrayOfNumbers.map(absolute));
//console.log(arrayOfNumbers.filter(function(item) {return item >= 0;}));
//console.log(arrayOfNumbers.reduce(function(prev, curr, index) {return prev + curr;})); //will sum all the values in my array

console.log(arrayOfNumbers.reduce(function(prev, curr, index) {
    //if (prev < curr) return curr;
    //return prev;
    return prev < curr ? curr : prev;
}, 0)); //will return the max value in the array

//function chaining
var result = arrayOfNumbers.map(absolute);
result = result.map(square);
console.log(result);

//can also be written as
var result2 = arrayOfNumbers.map(absolute).map(square).length;
console.log(result2);

//write a function that keeps even numbers and gets rid of odd numbers
function keepEven (item, callback) {
    var result = [];
    if(callback(item)) {
        result.push(item);
    }
    return result;
}

function isEven(item) {
    return item % 2 === 0;
}

console.log(betterTransform(arrayOfNumbers, isEven));

//event loop

console.log('Before A');

setTimeout(function() {
    console.log('A');
}, 0);

setTimeout(function() {
    console.log('B');
}, 500);

setTimeout(function() {
    console.log('C');
}, 1000);

console.log('After C');