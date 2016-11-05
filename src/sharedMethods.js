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
