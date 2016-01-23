var circle = {
    radius: 5,

    area: function() {
        return Math.PI * this.radius * this.radius;
    },

    circumference : function () {
        return 2 * Math.PI * this.radius;
    }
};

console.log(circle.area());
console.log(circle.circumference());

var circle2 = {
    radius: 10,

    area: circle.area,
    circumference: circle.circumference

};

console.log(circle2.area());
console.log(circle2.circumference());

var circle3 = Object.create(circle);
circle3.radius = 2; //overwrites the inherited radius. now circle3.hasOwnProperty will be true
//inheritance causes minute delays - so enough inheritance or huge chains will cause performance issues. use references like in circle2 instead.

//make circle2 populate dynamically with the attributes from circle1

Object.keys(circle).forEach(function(key, index, ar) {
    circle4[key] = circle[key];
});

var circle5 = Object.assign({}, circle); //Object.assign gives the first object all the properties of the other objects




