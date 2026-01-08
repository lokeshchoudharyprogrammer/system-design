//InterfaceSegregationPrinciple.js



// ✅ GOOD EXAMPLE: Following ISP
// ==========================================
// Here, we segregate the PaymentMethod interface into smaller, more specific interfaces.
// Each class implements only the methods it needs.
// This way, we avoid forcing clients to depend on methods they do not use.


// Bad Example: Violating ISP
// ==========================================
// In this example, we have a single PaymentMethod interface that includes methods for all payment types.
// This violates ISP because classes like CreditCardPayment and PayPalPayment are forced to implement methods they do not use.
// For example, CreditCardPayment is only interested in the 'pay' method, not the 'bankTransfer' method.




class Course {
    constructor(title, duration) {
        this.title = title;
        this.duration = duration;
    }
    getCourseInfo() {
        return `${this.title} is a ${this.duration} hour course`;
    }
}

class FreeCourse extends Course {
    constructor(title, duration) {
        super(title, duration);
    }
    getCourseInfo() {
        return `${super.getCourseInfo()} and is free`;
    }

    getStudentInfo() {
        return "55 students enrolled";
    }
}

class PremiumCourseWithNotes extends Course {
    constructor(title, duration, price) {
        super(title, duration);
        this.price = price;
    }

    getCourseInfo() {
        return `${super.getCourseInfo()} and costs ₹${this.price}`;
    }

    getNotes() {
        return "Notes available";
    }
}


const course = new PremiumCourseWithNotes("JavaScript Mastery", 12, 99);
const freeCourse = new FreeCourse("Python Fundamentals", 8);


