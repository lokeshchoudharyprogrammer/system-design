// open close principle
// classes should be open for extension but closed for modification


// bad example 
// openClosePrinciple.js
class PaymentProcessor {

    constructor() {
    }

    pay(method, amount) {

        if (method.name === 'creditCard') {
            return this.processPayment(amount, method)
        } else if (method.name === 'paypal') {
            return this.processPayment(amount, method)
        }
        else if (method.name === 'bankTransfer') {
            return this.processPayment(amount, method)
        }
        else if (method.name === 'googlePay') {
            return this.processPayment(amount, method)
        }
        else {
            throw new Error('Payment method not found')
        }
    }

    processPayment(amount, method) {
        console.log(`Processing payment of ${amount} using ${method.name}`)
    }

}

// const paymentProcessor = new PaymentProcessor()

// paymentProcessor.pay({ name: 'creditCard' }, 1000)
// paymentProcessor.pay({ name: 'paypal' }, 1000)
// paymentProcessor.pay({ name: 'bankTransfer' }, 1000)
// paymentProcessor.pay({ name: 'googlePay' }, 1000)


// Good example

class Payment {
    constructor() { }

    pay() {
        console.log("payment")
    }
}

class PayViaUpi extends Payment {
    pay() {
        console.log("paying via upi")
    }
}

class PayViaBank extends Payment {
    pay() {
        console.log("paying via bank")
    }
}

class PayViaCreditCard extends Payment {
    pay() {
        console.log("paying via credit card")
    }
}

const upi=new PayViaUpi();
const bank=new PayViaBank();
const card=new PayViaCreditCard();

upi.pay()
bank.pay()
card.pay()