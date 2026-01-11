

/*

Strategy Pattern allows dynamic switching of behavior by delegating algorithms to interchangeable
strategy objects using composition instead of inheritance, improving scalability and adhering to
the Open–Closed Principle.

*/

class Payment {
    pay() {
        throw new Error("Not Implimented")
    }
}


class Upi extends Payment {
    pay() {
        console.log("upi")
    }
}
class Card extends Payment {
    pay() {
        console.log("Card")
    }
}
class Bank extends Payment {
    pay() {
        console.log("Bank")
    }
}

class PaymentService {

    constructor(payment) {
        this.payment = payment;
    }

    paymentMethod() {
        return this.payment.pay()
    }


}

const paymentManger = new PaymentService(new Card())

paymentManger.paymentMethod()






