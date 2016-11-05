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
