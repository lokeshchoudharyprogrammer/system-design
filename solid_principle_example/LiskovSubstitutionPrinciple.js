



// LiskovSubstitutionPrinciple.js

// this principle states that objects of a superclass should be replaceable with objects of a subclass without 
// affecting the correctness of the program.

```

// ================================
// 🔵 Liskov Substitution Principle (LSP)
// Short Notes (JavaScript comments)
// ================================

// LSP definition:
// A child class should be usable wherever the parent class is expected
// without breaking the program.

// Core idea:
// LSP is about substitution, NOT about method overriding.

// Parent class role:
// Parent defines a contract (methods + expected behavior).

// Child class role:
// Child must respect the parent’s contract.

// Is overriding mandatory?
// ❌ No

// Is overriding allowed?
// ✅ Yes

// Can child ignore parent implementation?
// ✅ Yes

// Does ignoring parent logic break LSP?
// ❌ No, as long as behavior is compatible.

// What actually breaks LSP:
// ❌ Returning incompatible values
// ❌ Throwing new errors where parent doesn’t
// ❌ Removing parent methods
// ❌ Strengthening input rules (preconditions)

// Can child add new methods?
// ✅ Yes

// Do child-only methods need to exist in parent?
// ❌ No

// When do new methods cause LSP violation?
// ❌ When parent-typed code depends on child-only methods

// LSP vs overriding:
// Overriding is a tool, LSP is a rule.

// Code reuse required?
// ❌ No

// Behavior compatibility required?
// ✅ Yes

// One-line interview definition:
// LSP ensures subclasses can replace base classes without breaking behavior.

// Golden rule:
// Child may change HOW behavior is implemented,
// but must NOT change WHAT behavior means.


```

class OnlineCourse {
    constructor(title, duration) {
        this.title = title;
        this.duration = duration;
    }
    getCourseInfo() {
        return `${this.title} is a ${this.duration} hour course`;

    }

    getNotes() {
        return "Notes not available";
    }

    getShortNotes() {
        return "Short notes not available";
    }
}

class PremiumCourse extends OnlineCourse {
    constructor(title, duration, price) {
        super(title, duration);
        this.price = price;
    }

    getCourseInfo() {
        return `${super.getCourseInfo()} and costs ₹${this.price}`;
    }

    getNotes() {
        return "Premium notes available";
    }
}

class FreeCourse extends OnlineCourse {
    constructor(title, duration) {
        super(title, duration);
    }

    getCourseInfo() {
        return `${super.getCourseInfo()} and is free`;
    }

    getShortNotes() {
        return "Short notes available";
    }

    getStudentInfo() {
        return "Student info not available";
    }
}

const course = new PremiumCourse("JavaScript Mastery", 12, 99);
console.log(course.getCourseInfo()); // Output: "JavaScript Mastery is a 12 hour course and costs ₹99"
console.log(course.getNotes()); // Output: "Premium notes available"

console.log("\nFree Course:")

const freeCourse = new FreeCourse("Python Fundamentals", 8);
console.log(freeCourse.getCourseInfo()); // Output: "Python Fundamentals is a 8 hour course and is free"
console.log(freeCourse.getShortNotes()); // Output: "Short notes available"


class Payment {
    pay(amount) {
        return `Paying ₹${amount}`;
    }
}

class BrokenPayment extends Payment {
    upiPayment(amount) {
        return `"UPI payment processed ₹${amount}`;
    }
}

