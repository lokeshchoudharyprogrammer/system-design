
class PaymentStrategy {
    pay(amount) {
        throw new Error("Not Impliment");
    }

}

class PaymentValidator {
    validate() {
        throw new Error("Not implemented");
    }
}

class PaymentReceipt {
    generate(amount) {
        throw new Error("Not implemented");
    }
}


class UpiPaymentStrategy extends PaymentStrategy {
    pay(amount) {
        return `pay ${amount}₹ via upi`
    }
}

class UpiValidator extends PaymentValidator {
    validate() {
        return "UPI validated successfully";
    }
}

class UpiReceipt extends PaymentReceipt {
    generate(amount) {
        return `UPI receipt generated for ₹${amount}`;
    }
}

class BankPaymentStrategy extends PaymentStrategy {
    pay(amount) {
        return `pay ${amount}₹ via bank`
    }
}

class BankValidator extends PaymentValidator {
    validate() {
        return "Bank validated successfully";
    }
}

class BankReceipt extends PaymentReceipt {
    generate(amount) {
        return `Bank receipt generated for ₹${amount}`;
    }
}

class CardPaymentStrategy extends PaymentStrategy {
    pay(amount) {
        return `pay ${amount}₹ via card`
    }
}

class CardValidator extends PaymentValidator {
    validate() {
        return "Card validated successfully";
    }
}

class CardReceipt extends PaymentReceipt {
    generate(amount) {
        return `Card receipt generated for ₹${amount}`;
    }
}


class PaymentFactory {
    createPaymentStrategy() {
        throw new Error("Not yet implemented")
    }
    createValidator() {
        throw new Error("Not implemented");
    }

    createReceipt() {
        throw new Error("Not implemented");
    }
}

class UpiFactoryMethod extends PaymentFactory {
    createPaymentStrategy() {
        return new UpiPaymentStrategy()
    }
    createValidator() {
        return new UpiValidator()
    }
    createReceipt() {
        return new UpiReceipt()
    }


}

class BankFactoryMethod extends PaymentFactory {
    createPaymentStrategy() {
        return new BankPaymentStrategy()
    }

    createValidator() {
        return new BankValidator()
    }
    createReceipt() {
        return new BankReceipt()
    }
}

class CardFactoryMethod extends PaymentFactory {
    createPaymentStrategy() {
        return new CardPaymentStrategy()
    }
    createValidator() {
        return new CardValidator()
    }
    createReceipt() {
        return new CardReceipt()
    }
}

class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy.createPaymentStrategy()
        this.validator = strategy.createValidator()
        this.receipt = strategy.createReceipt()
    }

    payMethod(amount) {

        console.log(this.validator.validate());
        console.log(this.strategy.pay(amount));
        console.log(this.receipt.generate(amount));

    }
}

const paymentFactoryMethod = new CardFactoryMethod()

const pay = new PaymentContext(paymentFactoryMethod)


pay.payMethod(100)


