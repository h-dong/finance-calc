var CONFIG = {
    tax: {
        personalAllowance: {
            taxable: 11850,
            rate: 0
        },
        basic: {
            taxable: 46350,
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
            threshold: 8424,
            rate: 0
        },
        medium: {
            threshold: 46350,
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
            threshold: 18330
        },
        plan2: {
            rate: 0.09,
            threshold: 25000
        }
    }
}

module.exports = CONFIG;
