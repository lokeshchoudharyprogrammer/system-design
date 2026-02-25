
class PaymentStrategy {
    pay(amount) {
        throw new Error("Not Impliment");
    }

}

class UpiPaymentStrategy extends PaymentStrategy {
    pay(amount) {
        return `pay ${amount}₹ via upi`
    }
}

class BankPaymentStrategy extends PaymentStrategy {
    pay(amount) {
        return `pay ${amount}₹ via bank`
    }
}

class CardPaymentStrategy extends PaymentStrategy {
    pay(amount) {
        return `pay ${amount}₹ via card`
    }
}



class PaymentFactory {
    createPaymentStrategy() {
        throw new Error("Not yet implemented")
    }
}

class UpiFactoryMethod extends PaymentFactory {
    createPaymentStrategy() {
        return new UpiPaymentStrategy()
    }
}

class BankFactoryMethod extends PaymentFactory {
    createPaymentStrategy() {
        return new BankPaymentStrategy()
    }
}

class CardFactoryMethod extends PaymentFactory {
    createPaymentStrategy() {
        return new CardPaymentStrategy()
    }
}

class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy
    }
    payMethod(amount) {

        if (!this.strategy) throw new Error("Strategy required");

        return this.strategy.pay(amount)

    }
}

const paymentFactoryMethod = new CardFactoryMethod()

const pay = new PaymentContext(paymentFactoryMethod.createPaymentStrategy())


console.log(pay.payMethod(100))



