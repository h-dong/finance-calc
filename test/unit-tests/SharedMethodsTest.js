
var chai = require('chai');
var expect = chai.expect;
var CONFIG = require('../../src/config');
var sharedMethods = require('../../src/sharedMethods');

describe('calcIncomeTax Function', function() {
    it('should return 0 when wage is less 11000', function () {
        expect(sharedMethods.calcIncomeTax(6000)).to.equal(0.00);
    });

    it('should return 3800 when wage is between 11001 and 43000', function () {
        expect(sharedMethods.calcIncomeTax(30000)).to.equal(3800.00);
    });

    it('should return 35200 when wage is between 43001 and 150000', function () {
        expect(sharedMethods.calcIncomeTax(110000)).to.equal(35200.00);
    });

    it('should return 58650 when wage is more than 150001', function () {
        expect(sharedMethods.calcIncomeTax(160000)).to.equal(58650.00);
    });
});

describe('calcNationalInsurance Function', function() {
    it('should return 0 if wage is less than 8060', function () {
        expect(sharedMethods.calcNationalInsurance(6000)).to.equal(0.00);
    });

    it('should return 3172.80 if wage is between 8060 and 43000', function () {
        expect(sharedMethods.calcNationalInsurance(33492)).to.equal(3051.84);
    });

    it('should return 6532.80 if wage is more than 43000', function () {
        expect(sharedMethods.calcNationalInsurance(160000)).to.equal(6532.80);
    });
});

describe('calcStudentLoan Function', function() {
    it('should return 0 if payment plan 1 is selected and wage is less than 17495', function () {
        expect(sharedMethods.calcStudentLoan(true, 6000)).to.equal(0.00);
    });

    it('should return  if payment plan 1 is selected and wage is in between 17495 and 21000', function () {
        expect(sharedMethods.calcStudentLoan(true, 17500)).to.equal(0.45);
    });

    it('should return x if payment plan 1 is selected and wage is more than 21000', function () {
        expect(sharedMethods.calcStudentLoan(true, 28000)).to.equal(945.45);
    });

    it('should return 0 if payment plan 2 is selected and wage is less than 17495', function () {
        expect(sharedMethods.calcStudentLoan(false, 6000)).to.equal(0.00);
    });

    it('should return 0 if payment plan 2 is selected and wage is in between 17495 and 21000', function () {
        expect(sharedMethods.calcStudentLoan(false, 17500)).to.equal(0.00);
    });

    it('should return x if payment plan 2 is selected and wage is more than 21000', function () {
        expect(sharedMethods.calcStudentLoan(false, 28000)).to.equal(630.00);
    })
});
