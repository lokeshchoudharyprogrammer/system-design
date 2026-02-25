# Singleton Design Pattern

The Singleton pattern is a creational design pattern that ensures a class has only one instance and provides a global point of access to it.

## Use Cases

The Singleton pattern is useful in scenarios where you need to have a single instance of a class managing a shared resource. Some common use cases include:

- **Logging:** A single logger instance can be used throughout an application to write logs to a file or console.
- **Database Connections:** A single database connection object can be used to manage the connection pool and ensure that the number of connections does not exceed the limit.
- **Configuration Management:** A single configuration object can be used to store and provide access to application-level settings.
- **Caching:** A single cache instance can be used to store frequently accessed data in memory.

## Advantages

- **Guaranteed Single Instance:** Ensures that a class has only one instance, which can be crucial for managing shared resources.
- **Global Access:** Provides a global point of access to the instance, making it easy to use from anywhere in the codebase.
- **Lazy Initialization:** The instance is created only when it is first requested, which can improve performance if the instance is not always needed.

## Disadvantages

- **Global State:** The Singleton pattern introduces a global state into the application, which can make it difficult to test and reason about the code.
- **Tight Coupling:** Code that uses the Singleton pattern becomes tightly coupled to the Singleton class, which can make it difficult to switch to a different implementation later.
- **Violates Single Responsibility Principle:** The Singleton class is responsible for both creating its instance and performing its business logic.
- **Concurrency Issues:** In a multi-threaded environment, special care must be taken to ensure that only one instance of the Singleton is created. The provided example is not thread-safe.

## Memory Management (Heap vs. Stack)

The Singleton pattern's memory management is a key aspect of how it ensures a single instance. Here's a breakdown of how it works with respect to the heap and stack:

- **Heap:** The Singleton instance itself, being an object, is stored on the **heap**. The heap is a region of memory used for dynamic memory allocation, and it's where all objects in a program reside. Since the Singleton instance is created only once, it will occupy a single, fixed location on the heap for the lifetime of the application.

- **Stack:** The variables that hold a reference to the Singleton instance (like `s1` and `s2` in the example) are stored on the **stack**. The stack is a region of memory used for static memory allocation, and it's where local variables and function call information are stored. These variables on the stack are essentially pointers or references to the Singleton object's address on the heap.

So, when you call `Singleton.getInstance()`, the code checks if the static `instance` variable (which is also not on the stack, but in a special static/global memory area) has a reference to an object on the heap. If not, it creates a new object on the heap and stores the reference. Any subsequent calls will return the same reference to the same object on the heap. This is how the Singleton pattern ensures that you're always working with the exact same object in memory.

## Code Example Explanation

The `singleton.ts` file provides a basic implementation of the Singleton pattern.

```typescript
class Singleton {
  private static instance: Singleton;

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance
  }

}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();

console.log(s1 === s2);

```

- The `Singleton` class has a `private static` property `instance` that holds the single instance of the class.
- The `getInstance()` method is a `static` method that returns the single instance of the class. If the instance does not exist, it is created.
- The constructor of the `Singleton` class is not explicitly defined as `private`. In TypeScript, if a constructor is not defined, a public constructor is provided by default. To strictly enforce the singleton pattern, the constructor should be made `private`.
- The code creates two instances of the `Singleton` class, `s1` and `s2`, by calling the `getInstance()` method.
- The `console.log(s1 === s2)` statement will print `true` to the console, which demonstrates that both `s1` and `s2` are the same instance.
