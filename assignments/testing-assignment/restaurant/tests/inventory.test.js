var expect = require('chai').expect;
var inventory = require('../inventory');

describe('inventory', function() {

   describe('add item to inventory', function() {

       afterEach(function() { //magic - runs after each "it" block
          inventory.list().forEach(function(item) {
              inventory.remove(item);
          });
       });

       it('throws an error if the name is in use', function() {
           var testAdd = function() {
             inventory.add('apple', 5);
           };

           inventory.add('apple', 10);
           expect(testAdd).to.throw(Error);

       });

       it('throws an error if the quantity is not a number', function() {
           try {
               inventory.add('apple', 'offending string');
               expect(true).to.be.false;
           } catch (e) {
               expect(e.code).to.be.equal('EQTY');
           }

       });

   });


});