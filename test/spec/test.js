(function () {
  'use strict';

    var calc = calculator();

  describe('The calculator object holds all of the app data and methods', function(){

  	beforeEach(function () {
  		calc.clear();
  	});

  	it('should have an initial input value of an empty string', function(){
  		expect(calc.inputVal).to.equal("");
  	});

  	it('should have a method to append a value to the input', function () {
  		calc.appendToInput("7");
  		expect(calc.inputVal).to.equal("7");
  	});

  	it('should not add values that are not numbers', function(){
  		calc.appendToInput("a");
  		expect(calc.inputVal).to.equal('');
  		calc.appendToInput("klohwaeflkjh");
  		expect(calc.inputVal).to.equal('');
  		calc.appendToInput("j547342");
  		expect(calc.inputVal).to.equal('');
  		calc.appendToInput("LJLSKDJLKJ");
  		expect(calc.inputVal).to.equal('');
  		calc.appendToInput("=");
  		expect(calc.inputVal).to.equal('');
  	});

  	it('should have a property to hold the most recent entry', function(){
  		calc.appendToInput("7");
  		expect(calc.latestEntry[0]).to.equal("7");
  	});

  	it('should have a method to remove the most recent entry from the input', function () {
  		calc.appendToInput("10 + 14");
  		expect(calc.inputVal).to.equal("10 + 14");
  		calc.appendToInput("-19");
  		expect(calc.inputVal).to.equal("10 + 14-19");
  		calc.undo();
  		expect(calc.inputVal).to.equal("10 + 14");
  	});

  	it('should have a method to clear the input', function(){
  		calc.appendToInput("7");
  		calc.clear();
  		expect(calc.inputVal).to.equal("");
  		expect(calc.latestEntry).to.be.emtpy;
  	});

  	it('should have a method to evaluate the input and output as a string', function(){
  		calc.appendToInput("24+36");
  		calc.equals();
  		expect(calc.inputVal).to.equal("60");
  	});


  });
})();
