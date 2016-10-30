
var chai = require('chai');
var expect = chai.expect;
var CONFIG = require('../../src/config');
var sharedMethods = require('../../src/sharedMethods');

describe('calcIncomeTax Function', function() {
    it('should return correct value when wage is less 11000', function () {
        expect(sharedMethods.calcIncomeTax(6000)).to.equal(0);
    });

    it('should return correct value when wage is between 11001 and 43000', function () {
        expect(sharedMethods.calcIncomeTax(30000)).to.equal(3800);
    });

    it('should return correct value when wage is between 43001 and 150000', function () {
        expect(sharedMethods.calcIncomeTax(110000)).to.equal(35200);
    });

    it('should return correct value when wage is more than 150001', function () {
        expect(sharedMethods.calcIncomeTax(160000)).to.equal(58650);
    });
});
