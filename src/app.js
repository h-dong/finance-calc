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
