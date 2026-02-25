# Facade Design Pattern: From Basic to Advanced

## 1. Definition
The **Facade Design Pattern** is a structural design pattern that provides a simplified interface to a complex set of classes, a framework, or a library. It acts as a "front-facing" interface that masks the complexity of the underlying system.

---

## 2. The Problem it Solves
Imagine you are working with a massive library that has dozens of features. To get a single task done, you need to:
1. Initialize multiple objects.
2. Keep track of dependencies.
3. Execute methods in a very specific order.

**Issues:**
- **High Coupling:** Your business logic becomes tightly coupled to the implementation details of a 3rd party library.
- **Complexity:** Every developer needs to understand the entire subsystem to use one feature.
- **Maintainability:** If the library updates its internal API, you have to fix code in multiple places.

---

## 3. Real-World Analogy: The Restaurant
When you go to a restaurant, you interact with a **Waiter** (The Facade).
- You don't go to the kitchen to talk to the Chef.
- You don't check the inventory with the Store Manager.
- You don't handle the billing with the Accountant yourself.

The Waiter provides a simple interface (`Order Food`, `Pay Bill`) while managing the complex interactions between the Kitchen, Bar, and Billing systems behind the scenes.

---

## 4. Basic Implementation
Based on your `pattern.ts` example, here is the fundamental structure:

### The Complex Subsystem
```typescript
class TokenService {
    validateToken(token: string) { /* ... */ }
}
class UserService {
    getUser(id: number) { /* ... */ }
}
class PermissionService {
    checkPermission(user: any) { /* ... */ }
}
```

### The Facade
```typescript
class AuthFacade {
    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private permissionService: PermissionService
    ) {}

    public login(token: string, userId: number): void {
        if (this.tokenService.validateToken(token)) {
            const user = this.userService.getUser(userId);
            if (this.permissionService.checkPermission(user)) {
                console.log("Success");
            }
        }
    }
}
```

---

## 5. Advanced Concepts

### A. The "Least Knowledge" Principle (Law of Demeter)
The Facade pattern is a primary implementation of the Law of Demeter. It suggests that a module should not know about the inner workings of the objects it manipulates. By using a Facade, the client only knows about one object (the Facade) rather than ten.

### B. Additional Facades
If a Facade becomes too "God-like" (too large), you can introduce **Additional Facades**.
- `MobileAuthFacade`: Specialized for mobile apps (e.g., Biometrics).
- `WebAuthFacade`: Specialized for web (e.g., Cookies/Sessions).

### C. Facade vs. Proxy
- **Facade** defines a **new** simplified interface.
- **Proxy** has the **same** interface as its service object and usually adds some behavior (like caching or logging).

### D. Facade vs. Mediator
- **Facade** abstracts a subsystem of objects to make it easier to use. The communication is **unidirectional** (Client -> Facade -> Subsystem).
- **Mediator** abstracts the communication **between** objects. Objects talk to the Mediator instead of each other.

---

## 6. Pros and Cons

| Pros | Cons |
| :--- | :--- |
| **Simplicity:** Isolates clients from subsystem components. | **God Object:** A facade can become a "God Object" coupled to all classes of an app. |
| **Decoupling:** Allows you to swap out the subsystem without changing client code. | **Layering:** Adds another layer of indirection which might slightly impact performance. |
| **Layering:** You can define a facade for each level of your architecture. | |

---

## 7. When to Use It?
1. **To provide a simple interface to a complex subsystem.**
2. **When there are many dependencies between clients and the implementation classes of an abstraction.**
3. **When you want to layer your subsystems.** Use a facade to define an entry point to each subsystem level.

---

## 8. Best Practices
1. **Do not make the Facade mandatory:** If a power user needs the complex features of the subsystem, let them access it directly. The Facade is a shortcut, not a cage.
2. **Keep it Thin:** A Facade should mostly delegate work. It shouldn't contain heavy business logic that doesn't belong to the subsystem coordination.
3. **Interface-based Facades:** For better testability, define an interface for your Facade. This allows you to mock the entire subsystem easily in unit tests.
