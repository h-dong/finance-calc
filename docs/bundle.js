(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var sharedMethods = require('./sharedMethods');

var app = new Vue({
    el: '#app',
    data: {
        wage: 160000,
        pension: 2,
        hasToPayStudentLoan: false,
        courseBefore2012: false,
        showResults: false,
        results: []
    },
    methods: {
        calcMonthWeekDay: function() {
            this.updateNetIncome();

            for (var i = 0; i < this.results.length; i++) {
                if (this.results[i].year === 0 && this.results[i].prefix == '-£') {
                    this.results[i].prefix = '£';
                    this.results[i].style = '';
                }
                this.results[i].month = (this.results[i].year / 12).toFixed(2);
                this.results[i].week = (this.results[i].month / 4).toFixed(2);
                this.results[i].day = (this.results[i].week / 5).toFixed(2);
            }
        },
        getStudentLoanPaymentPlan: function () {
            if (this.hasToPayStudentLoan) {
                return sharedMethods.calcStudentLoan(this.courseBefore2012, this.wage)
            } else {
                return 0;
            }
        },
        updateNetIncome: function () {
            var totalTax = 0,
                resultsArray = this.results;

            for (var i = 1; i < (resultsArray.length - 1); i++) {
                console.log(resultsArray[i].year);
                totalTax += Number(resultsArray[i].year);
            }

            this.results[resultsArray.length - 1].year = this.wage - totalTax;
        },
        calculateWage: function() {
            this.results = [{
                name: 'Gross Income',
                prefix: '£',
                style: 'success',
                year: this.wage
            }, {
                name: 'Income Tax',
                prefix: '-£',
                style: 'danger',
                year: sharedMethods.calcIncomeTax(this.wage)
            }, {
                name: 'National Insurance',
                prefix: '-£',
                style: 'danger',
                year: 0
            }, {
                name: 'Student Loan',
                prefix: '-£',
                style: 'danger',
                year: this.getStudentLoanPaymentPlan()
            }, {
                name: 'Pension',
                prefix: '-£',
                style: 'danger',
                year: (this.wage * this.pension / 100).toFixed(2)
            }, {
                name: 'Net Income',
                prefix: '£',
                style: 'info',
                year: 0
            }];
            this.calcMonthWeekDay();
            this.showResults = true;
        }
    }
})

},{"./sharedMethods":3}],2:[function(require,module,exports){
var CONFIG = {
    tax: {
        personalAllowance: {
            taxable: 11000,
            rate: 0
        },
        basic: {
            taxable: 43000,
            rate: 0.2
        },
        high: {
            taxable: 150000,
            rate: 0.4
        },
        additional: {
            taxable: Infinity,
            rate: 0.45
        },
        noPersonalAllowance: {
            startPoint: 100000,
            rateOfDecrease: 0.5
        }
    },
    studentLoan: {
        plan1: {
            rate: 0.09,
            threshold: 17495
        },
        plan2: {
            rate: 0.09,
            threshold: 21000
        }
    }
}

module.exports = CONFIG;

},{}],3:[function(require,module,exports){
var CONFIG = require('./config');

var sharedMethods = {
    calcIncomeTax:function(wage) {
        var remainingWage = wage,
            tax = 0,
            personalAllowance = CONFIG.tax.personalAllowance,
            basic = CONFIG.tax.basic,
            high = CONFIG.tax.high,
            additional = CONFIG.tax.additional,
            noPersonalAllowance = CONFIG.tax.noPersonalAllowance;

        if (remainingWage > high.taxable) {
            tax += this.calcTaxBands(high.taxable, remainingWage, additional.rate);
            remainingWage = high.taxable;
        }

        if (remainingWage > basic.taxable && remainingWage <= high.taxable) {
            tax += this.calcTaxBands(basic.taxable, remainingWage, high.rate);
            remainingWage = basic.taxable;
        }

        if (remainingWage > personalAllowance.taxable && remainingWage <= basic.taxable) {
            tax += this.calcTaxBands(personalAllowance.taxable, remainingWage, basic.rate);
        }

        if (wage > noPersonalAllowance.startPoint) {
            var allowance = ((noPersonalAllowance.startPoint - wage) / 2 + personalAllowance.taxable);

            if (allowance < 0) {
                tax += this.calcTaxBands(0, personalAllowance.taxable, additional.rate);
            } else {
                tax += this.calcTaxBands(0, personalAllowance.taxable - allowance, high.rate);
            }
        }
        return Math.abs(tax);
    },
    calcTaxBands: function(taxble, amount, rate) {
        return parseFloat(((taxble - amount) * rate).toFixed(2))
    },
    calcStudentLoan: function (courseBefore2012, wage) {
        var rate = CONFIG.studentLoan.plan1.rate,
            threshold = CONFIG.studentLoan.plan1.threshold;

        if (courseBefore2012 === false) {
            rate = CONFIG.studentLoan.plan2.rate;
            threshold = CONFIG.studentLoan.plan2.threshold;
        }

        return ((wage - threshold) * rate).toFixed(2);
    }
}

module.exports = sharedMethods;

},{"./config":2}]},{},[1]);
