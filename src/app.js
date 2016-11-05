var sharedMethods = require('./sharedMethods');

var app = new Vue({
    el: '#app',
    data: {
        wage: 0,
        pension: 0,
        hasToPayStudentLoan: true,
        courseBefore2012: false,
        showResults: false,
        results: []
    },
    computed: {
        validation: function() {
            return {
                wage: !!(this.wage >= 0),
                pension: !!(this.pension >= 0 && this.pension <= 100)
            };
        },
        isValid: function() {
            var validation = this.validation;
            return Object.keys(validation).every(function(key) {
                return validation[key];
            });
        }
    },
    methods: {
        calcMonthWeekDay: function() {
            this.updateNetIncome();

            for (var i = 0; i < this.results.length; i++) {
                if (this.results[i].year == 0.00 && this.results[i].prefix == '-£') {
                    this.results[i].prefix = '£';
                    this.results[i].style = '';

                    this.results[i].year = '0.00';
                    this.results[i].month = '0.00';
                    this.results[i].week = '0.00';
                    this.results[i].day = '0.00';
                } else {
                    this.results[i].month = (this.results[i].year / 12).toFixed(2);
                    this.results[i].week = (this.results[i].month / 4).toFixed(2);
                    this.results[i].day = (this.results[i].week / 5).toFixed(2);
                }
            }
        },
        getStudentLoanPaymentPlan: function() {
            if (this.hasToPayStudentLoan) {
                return sharedMethods.calcStudentLoan(this.courseBefore2012, this.wage);
            } else {
                return 0.00;
            }
        },
        updateNetIncome: function() {
            var totalTax = 0,
                resultsArray = this.results;

            for (var i = 1; i < (resultsArray.length - 1); i++) {
                totalTax += Number(resultsArray[i].year);
            }

            this.results[resultsArray.length - 1].year = (this.wage - totalTax).toFixed(2);
        },
        calculateWage: function() {
            if (this.isValid) {
                this.results = [{
                    name: 'Gross Income',
                    prefix: '£',
                    style: 'success',
                    year: (Number(this.wage)).toFixed(2)
                }, {
                    name: 'Income Tax',
                    prefix: '-£',
                    style: 'danger',
                    year: sharedMethods.calcIncomeTax(this.wage)
                }, {
                    name: 'National Insurance',
                    prefix: '-£',
                    style: 'danger',
                    year: sharedMethods.calcNationalInsurance(this.wage)
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
    }
})
