



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



/***

Here are complete notes summarizing our entire discussion about the Liskov Substitution Principle (LSP), with definitions, rules, examples, violations, fixes, alternatives, and a checklist you can use to reason about subclasses.

# Liskov Substitution Principle (LSP) — Full Notes

## Short definition
A subclass should be replaceable anywhere its parent class is expected without changing the correctness of the program. In other words, objects of a superclass should be replaceable with objects of a subclass without affecting program behavior.

## Core idea
- LSP is about substitution (behavior), not about inheritance syntax.
- Subclasses may change implementation (how), but must preserve the expected behavior (what).
- Overriding is allowed, but any overrides must remain compatible with the parent contract.

## Parent vs Child responsibilities
- Parent defines a contract: method signatures, expected behavior, preconditions, postconditions, and error expectations.
- Child must respect that contract:
  - It can inherit parent methods as-is (no re-definition needed).
  - It can override parent methods but must remain compatible.
  - It may add new methods (allowed), but client code typed to the parent must not rely on child-only methods.

## What breaks LSP
- Removing parent methods in the subclass (i.e., not providing behavior expected by callers).
- Changing method signatures or return types incompatibly.
- Strengthening preconditions (requiring more than the parent required).
- Weakening postconditions (providing less than promised).
- Throwing new/unexpected errors where parent would not.
- Making parent-typed code depend on child-only methods.

## What does NOT break LSP
- Adding new methods in the subclass (fine).
- Overriding methods with compatible behavior (fine).
- Inheriting methods and not using them in the child itself (fine).

## Practical advice / design rules
- If a subclass cannot meaningfully support some parent behaviors, do not extend that parent.
- Prefer composition or an adapter when the relationship is not actual substitutability.
- Split large interfaces/classes (interface segregation) so implementers only depend on what they need.
- Document expected behaviors (pre/postconditions) in the base class.
- Write tests that exercise parent-typed usage to ensure substitutability.

## Quick checklist to validate LSP for a subclass
- [ ] Does the subclass preserve every public method the parent guarantees to callers?
- [ ] Do overridden methods keep the same signature and compatible return types?
- [ ] Do overridden methods avoid throwing new/unexpected errors?
- [ ] Are input preconditions not stricter than the parent’s?
- [ ] Are output postconditions at least as strong as the parent’s?
- [ ] Does parent-typed code work with the subclass without special-case checks?

## Examples

1) Safe inheritance (child inherits a method it doesn’t need — LSP preserved)
```javascript
class Parent {
  a() { return 'a'; }
  b() { return 'b'; }
  c() { return 'c'; } // child doesn't need it, but it's present
}

class Child extends Parent {
  a() { return 'child a'; }
  b() { return 'child b'; }
}

const p = new Parent();
const c = new Child();

p.c(); // 'c'
c.c(); // 'c' — substitution is safe
```

2) Violation: subclass removes/does not provide a parent contract method
```javascript
class Payment {
  pay(amount) {
    return `Paying ₹${amount}`;
  }
}

class BrokenPayment extends Payment {
  // only provides upiPayment, but no pay() — breaks callers expecting pay()
  upiPayment(amount) {
    return `UPI ₹${amount}`;
  }
}
```
Why this breaks LSP: code written to accept `Payment` will call `pay(...)`. If a `BrokenPayment` instance lacks `pay`, callers will fail at runtime.

3) Fix by preserving the parent's contract (delegate to new method)
```javascript
class BrokenPayment extends Payment {
  pay(amount) {
    return this.upiPayment(amount);
  }
  upiPayment(amount) {
    return `UPI payment processed ₹${amount}`;
  }
}
```
Now `BrokenPayment` can be used wherever `Payment` is expected.

4) Adapter / Composition alternative (if subclass shouldn't extend parent)
```javascript
class UpiProcessor {
  upiPayment(amount) {
    return `UPI payment processed ₹${amount}`;
  }
}

// Adapter that implements Payment's contract by delegating
class UpiPaymentAdapter extends Payment {
  constructor(upiProcessor) {
    super();
    this.upi = upiProcessor;
  }
  pay(amount) {
    return this.upi.upiPayment(amount);
  }
}
```
This preserves substitutability while keeping the original `UpiProcessor` separate.

5) Example from your file (course classes) — these are fine for LSP:
```javascript
class OnlineCourse {
  constructor(title, duration) {
    this.title = title;
    this.duration = duration;
  }
  getCourseInfo() {
    return `${this.title} is a ${this.duration} hour course`;
  }
  getNotes() { return "Notes not available"; }
  getShortNotes() { return "Short notes not available"; }
}

class PremiumCourse extends OnlineCourse {
  constructor(title, duration, price) { super(title, duration); this.price = price; }
  getCourseInfo() { return `${super.getCourseInfo()} and costs ₹${this.price}`; }
  getNotes() { return "Premium notes available"; }
}

class FreeCourse extends OnlineCourse {
  getCourseInfo() { return `${super.getCourseInfo()} and is free`; }
  getShortNotes() { return "Short notes available"; }
}


- These subclasses preserve the parent contract (they either inherit or override compatibly), so they do not break LSP.

## Common misunderstandings clarified
- "Do I have to re-define every parent method in child?" — No. You inherit methods; you only need to override if you want different behavior, but overrides must be compatible with the parent contract.
- "Can I add methods in child?" — Yes. But parent-typed code must not rely on those child-only methods.
- "If my child doesn't use a parent method, is LSP broken?" — No — as long as the method still exists and behaves properly for callers.

## Summary: Answer to your original code question
- Your original file did NOT follow LSP because `BrokenPayment` extended `Payment` but did not provide `pay(amount)`; instead it only had `upiPayment`. That breaks substitutability. Also there was a small string quoting bug in the original `upiPayment`.
- Fix: either implement `pay` (for substitution) or don't extend `Payment` and use composition/adapter instead.

## Ready-to-use fixes (copy-paste)
1) Implement pay() in BrokenPayment:
class BrokenPayment extends Payment {
  pay(amount) {
    return this.upiPayment(amount);
  }
  upiPayment(amount) {
    return `UPI payment processed ₹${amount}`;
  }
}
 

2) Use adapter/composition:
 
class UpiProcessor {
  upiPayment(amount) {
    return `UPI payment processed ₹${amount}`;
  }
}

class UpiPaymentAdapter extends Payment {
  constructor(proc) { super(); this.proc = proc; }
  pay(amount) { return this.proc.upiPayment(amount); }
}
 

## Final recommendation
- If you want instances of a subclass to be usable where the parent is expected, ensure the subclass implements or preserves the parent’s public contract exactly (or in a compatible way). If the subclass cannot or should not implement that contract, avoid inheritance and use composition/adapter instead.

 
 */