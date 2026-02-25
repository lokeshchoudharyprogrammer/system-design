

/*

Strategy Pattern allows dynamic switching of behavior by delegating algorithms to interchangeable
strategy objects using composition instead of inheritance, improving scalability and adhering to
the Open–Closed Principle.


One Context
Multiple interchangeable behaviors
Behavior switch at runtime
No if-else

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


// One Context

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






