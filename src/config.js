var CONFIG = {
    tax: {
        personalAllowance: {
            taxable: 11500,
            rate: 0
        },
        basic: {
            taxable: 45000,
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
    nationalInsurance: {
        basic: {
            threshold: 8160,
            rate: 0
        },
        medium: {
            threshold: 45000,
            rate: 0.12
        },
        high: {
            threshold: Infinity,
            rate: 0.02
        }
    },
    studentLoan: {
        plan1: {
            rate: 0.09,
            threshold: 17775
        },
        plan2: {
            rate: 0.09,
            threshold: 21000
        }
    }
}

module.exports = CONFIG;
