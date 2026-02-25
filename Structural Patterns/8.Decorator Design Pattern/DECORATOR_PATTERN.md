# Decorator Design Pattern: Comprehensive Guide

The **Decorator Design Pattern** is a structural design pattern that allows behavior to be added to an individual object, dynamically, without affecting the behavior of other objects from the same class. It is a flexible alternative to subclassing for extending functionality.

---

## 1. The Core Concept (The "Why?")

### The Problem: Class Explosion
Imagine you have a `Pizza` class. Now you want to add toppings like `Cheese`, `Olives`, `Mushrooms`, etc.
- If you use **inheritance**, you might end up with classes like `CheesePizza`, `OlivePizza`, `CheeseAndOlivePizza`, `MushroomAndCheesePizza`, etc.
- This leads to an exponential growth of classes, which is unmaintainable. This is known as **Class Explosion**.

### The Solution: Composition over Inheritance
Instead of creating new classes for every combination, we "wrap" the base object with decorator objects that add the desired behavior.
- The decorator **has a** reference to the component it is decorating.
- The decorator **implements the same interface** as the component.

---

## 2. Structural Breakdown

A standard Decorator implementation consists of:
1.  **Component (Interface/Abstract Class):** Defines the interface for objects that can have responsibilities added to them dynamically.
2.  **Concrete Component:** The original object to which additional responsibilities can be attached.
3.  **Decorator (Base Class):** Maintains a reference to a Component object and defines an interface that conforms to the Component's interface.
4.  **Concrete Decorators:** Add responsibilities to the component.

---

## 3. Basic Implementation (JavaScript)

Following your existing example in `2.Decorator.js`:

```javascript
// 1. Component (Base Class)
class Pizza {
    cost() { return 200; }
    description() { return "Normal Pizza"; }
}

// 2. Decorator Base (Wraps the Pizza)
class PizzaDecorator {
    constructor(pizza) {
        this.pizza = pizza;
    }
    cost() { return this.pizza.cost(); }
    description() { return this.pizza.description(); }
}

// 3. Concrete Decorators
class Cheese extends PizzaDecorator {
    cost() { return this.pizza.cost() + 50; }
    description() { return `${this.pizza.description()}, Extra Cheese`; }
}

class Olive extends PizzaDecorator {
    cost() { return this.pizza.cost() + 40; }
    description() { return `${this.pizza.description()}, Olives`; }
}

// Usage
let myPizza = new Pizza();
myPizza = new Cheese(myPizza); // Wrap with Cheese
myPizza = new Olive(myPizza);  // Wrap with Olives

console.log(myPizza.description()); // "Normal Pizza, Extra Cheese, Olives"
console.log(myPizza.cost());        // 290
```

---

## 4. Advanced Concepts

### A. Dynamic Composition
Decorators can be added or removed at **runtime**. You can build complex objects by stacking decorators like layers of an onion.

### B. Transparency
The client code doesn't need to know if it's working with the base component or a decorated one, because they both share the same interface. This follows the **Dependency Inversion Principle**.

### C. Modern JavaScript: TC39 Decorators
In modern JS/TS, the term "Decorator" also refers to a specific syntax (`@decorator`). While conceptually similar, these are usually used to modify class behavior at **definition time** rather than **runtime**.

```typescript
function Log(target, key, descriptor) {
    const original = descriptor.value;
    descriptor.value = function(...args) {
        console.log(`Calling ${key} with`, args);
        return original.apply(this, args);
    }
    return descriptor;
}

class Pizza {
    @Log
    cost() { return 200; }
}
```

### D. Function-Based Decorators (Functional Programming)
In FP, decorators are often implemented as Higher-Order Functions (HOFs).

```javascript
const withCheese = (pizza) => ({
    ...pizza,
    cost: () => pizza.cost() + 50,
    description: () => pizza.description() + ", Extra Cheese"
});

const myPizza = withCheese({ cost: () => 200, description: () => "Base" });
```

---

## 5. Real-World Examples

1.  **Java I/O Streams:** `BufferedInputStream(FileInputStream(file))` is a classic example. `FileInputStream` is the base, and `BufferedInputStream` decorates it with buffering logic.
2.  **Middleware (Express.js):** Each middleware function "decorates" the request/response objects or the execution flow.
3.  **React HOCs (Higher-Order Components):** A function that takes a component and returns a new component with added props/logic.
4.  **Logging & Validation:** Adding logging or validation to service methods without cluttering the business logic.

---

## 6. Comparison with Other Patterns

| Pattern | Difference |
| :--- | :--- |
| **Strategy** | Changes the *guts* of an object (how it does something). Decorator changes the *skin* (adds new things). |
| **Proxy** | Controls *access* to an object. Decorator adds *functionality*. |
| **Adapter** | Changes the *interface* of an object. Decorator keeps the *interface same*. |
| **Composite** | Treats a group of objects the same as a single object. Decorator adds responsibilities to a single object. |

---

## 7. Pros and Cons

### Pros:
- **Single Responsibility Principle:** You can divide functionality into classes that handle unique concerns.
- **Open-Closed Principle:** You can introduce new decorators without changing existing code.
- **Flexibility:** More flexible than static inheritance.

### Cons:
- **Small Objects:** Can result in many small objects that look similar, making debugging harder.
- **Complex Initialization:** Nesting `new D1(new D2(new D3(base)))` can be ugly.
- **Order Dependency:** Sometimes the order of decorators matters (e.g., encryption then compression vs compression then encryption).

---

## 8. Summary Checklist
- [x] Identify the common interface.
- [x] Create the base component.
- [x] Create a decorator base class that accepts the component in its constructor.
- [x] Delegate all methods to the wrapped component in the base decorator.
- [x] Create concrete decorators that override specific methods to add behavior.
