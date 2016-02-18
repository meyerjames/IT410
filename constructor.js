//most javascript developers frown on constructor methods
//object composition is the preferred method. Use the factory.

function Circle(radius) {

    //if they forget the word new, do it like this
    //code

    this.radius = radius;
    this.area = function() {
        return Math.PI * this.radius * this.radius;
    };

}

var c = new Circle(5);
console.log(c.area());


