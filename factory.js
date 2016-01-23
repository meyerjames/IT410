function circle(radius) {
    var factory = {};

    factory.radius = radius;

    factory.area = function() {
        return Math.PI * radius * this.radius;
    };

    return factory;
}

function counter(number) {
    var factory = {};

    factory.increment = function() {
        number++;
        return factory; //returning the factory object lets you chain functions as in the example below.
    };

    factory.decrement = function() {
        number--;
        return factory;
    };

    factory.get = function() {
        return number; //this is not returning an object so you can't chain off .get()
    };

    return factory;
}

var c1 = circle(5);

console.log(circle(5));
console.log(c1.area());

var c = counter(5);
var value = c.increment().increment().increment().get();

console.log(value);