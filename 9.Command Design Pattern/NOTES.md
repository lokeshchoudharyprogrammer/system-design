# Command Design Pattern Notes

## 1. Introduction
The **Command Design Pattern** is a behavioral design pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as a method arguments, delay or queue a request's execution, and support undoable operations.

### Intent
- Encapsulate a request as an object.
- Decouple the object that invokes the operation from the one that knows how to perform it.
- Support "Undo/Redo" functionality.
- Support logging and queuing of requests.

---

## 2. Core Components

| Component | Responsibility |
| :--- | :--- |
| **Command (Interface/Abstract)** | Declares an interface for executing an operation (usually a single `execute()` method). |
| **ConcreteCommand** | Defines a binding between a Receiver object and an action. Implements `execute()` by invoking the corresponding operation(s) on the Receiver. |
| **Receiver** | Knows how to perform the actual work needed to carry out the request. Any class can serve as a Receiver. |
| **Invoker** | Asks the command to carry out the request. It holds the command and triggers it (e.g., a button, a remote control). |
| **Client** | Creates a ConcreteCommand object and sets its Receiver. |

---

## 3. Real-World Analogy: The Restaurant
1. **Client (You):** You give an order to the waiter.
2. **Command (Order Slip):** The paper where the waiter writes your order. It contains all the info needed to cook the meal.
3. **Invoker (Waiter):** Takes the order and places it in the kitchen queue. The waiter doesn't know *how* to cook; they just trigger the process.
4. **Receiver (Chef):** The person who actually prepares the food based on the order slip.

---

## 4. Implementation Analysis (Basic)
Based on our `pattern.js` implementation:

- **Receiver:** `Light`, `Fan` (Classes that have the actual logic like `turnOn()`).
- **Command Interface:** `Command` class with `execute()`.
- **Concrete Commands:** `TurnOnCommand`, `FanOffCommand`, etc.
- **Invoker:** `RemoteControl` (It has `setCommand()` and `pressButton()`).

```javascript
// Example Flow
const light = new Light(); // Receiver
const onCommand = new TurnOnCommand(light); // Command
const remote = new RemoteControl(); // Invoker

remote.setCommand(onCommand);
remote.pressButton(); // Executes light.turnOn()
```

---

## 5. Advanced Concepts

### A. Undo / Redo Operations
To support undo, the Command interface must include an `undo()` method. The ConcreteCommand must store the previous state of the Receiver.

```javascript
class Command {
    execute() {}
    undo() {}
}

class LightDimCommand extends Command {
    constructor(light, newLevel) {
        super();
        this.light = light;
        this.newLevel = newLevel;
        this.oldLevel = light.brightness;
    }
    execute() {
        this.light.setBrightness(this.newLevel);
    }
    undo() {
        this.light.setBrightness(this.oldLevel);
    }
}
```

### B. Macro Commands (Batching)
A Macro Command is a command that executes a sequence of other commands. This is useful for "One-tap Scenes" (e.g., "Good Night" mode that turns off all lights and locks doors).

```javascript
class MacroCommand extends Command {
    constructor(commands) {
        super();
        this.commands = commands; // Array of Command objects
    }
    execute() {
        this.commands.forEach(cmd => cmd.execute());
    }
    undo() {
        this.commands.reverse().forEach(cmd => cmd.undo());
    }
}
```

### C. Command History (Stack)
By maintaining a stack of executed commands, we can implement multi-level Undo.
1. `push` command to stack after `execute()`.
2. `pop` from stack and call `undo()` when user hits Ctrl+Z.

---

## 6. Pros and Cons

### Pros
- **Decoupling:** The class that invokes the operation is separated from the one that performs it.
- **Extensibility:** You can add new commands without changing existing code (Open/Closed Principle).
- **Complexity:** You can assemble simple commands into complex ones (Macro Commands).
- **Functionality:** Easy to implement Undo/Redo and Queuing.

### Cons
- **Code Volume:** The code can become more complicated since you're introducing a whole new layer of classes.
- **Memory:** Storing command history for undo can consume memory if not managed.

---

## 7. Comparison with Other Patterns

- **vs. Strategy:** Both use objects to encapsulate logic. However, **Strategy** describes *how* to do something (different algorithms), while **Command** describes *what* to do (a specific request).
- **vs. Memento:** Often used together for Undo. Command stores the operation, while Memento can store the state of the object if the state is too complex to reverse manually.
- **vs. Factory:** You can use a Factory to create commands based on parameters.

---

## 8. When to Use?
1. When you want to parameterize objects by an action to perform.
2. When you need to queue operations or execute them at different times.
3. When you need to support Undo/Redo.
4. When you want to keep a log of changes.



Alright Lokesh 🚀
Let’s make **proper notes** on Command Design Pattern — from **basic → advanced (LLD interview level)**.

I’ll keep it structured and clean so you can revise fast before interviews 💪

---


# 🟢 1️⃣ What is Command Design Pattern? (Basic)

Command Pattern:

> Encapsulates a request as an object.

Instead of calling a method directly, we wrap that action inside a **Command object**.

---

### 🧠 Normal Way (Without Command Pattern)

```javascript
light.turnOn();
```

Caller directly knows the receiver.

Problem:

* Tight coupling
* No undo
* No queue
* No logging
* Hard to extend

---

# 🟢 2️⃣ Core Idea

Instead of:

> “Call this method”

We say:

> “Create an object that knows how to execute this action.”

That object = **Command**

---

# 🟢 3️⃣ Structure of Command Pattern

There are 5 parts:

1. **Command (Interface / Abstract Class)**
2. **Concrete Command**
3. **Receiver**
4. **Invoker**
5. **Client**

---

# 🟢 4️⃣ Real World Example – Remote Control 📺

Let’s build from scratch.

---

## 1️⃣ Receiver (Actual Logic Holder)

```javascript
class Light {
  turnOn() {
    console.log("Light ON");
  }

  turnOff() {
    console.log("Light OFF");
  }
}
```

Receiver knows how to perform action.

---

## 2️⃣ Command Interface

```javascript
class Command {
  execute() {}
}
```

Defines common method.

---

## 3️⃣ Concrete Commands

```javascript
class TurnOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }
}

class TurnOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOff();
  }
}
```

Each command wraps a specific action.

---

## 4️⃣ Invoker (Remote)

```javascript
class Remote {
  setCommand(command) {
    this.command = command;
  }

  pressButton() {
    this.command.execute();
  }
}
```

Invoker only knows `execute()`.

---

## 5️⃣ Client Code

```javascript
const light = new Light();

const on = new TurnOnCommand(light);
const off = new TurnOffCommand(light);

const remote = new Remote();

remote.setCommand(on);
remote.pressButton();

remote.setCommand(off);
remote.pressButton();
```

---

# 🟢 5️⃣ Why Do We Need It?

Command pattern solves:

| Problem        | Solution                    |
| -------------- | --------------------------- |
| Tight coupling | Decouples sender & receiver |
| No undo        | Add undo() method           |
| No queue       | Store commands in queue     |
| No logging     | Log command objects         |
| No retry       | Retry failed commands       |

---

# 🟢 6️⃣ Benefits

✅ Decoupling
✅ Undo/Redo
✅ Queue support
✅ Macro commands
✅ Logging
✅ Retry mechanism
✅ Extensible

---

# 🟢 7️⃣ Undo / Redo (Intermediate Level)

We add `undo()` method.

```javascript
class TurnOnCommand {
  constructor(light) {
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff();
  }
}
```

Store executed commands:

```javascript
const history = [];

remote.pressButton();
history.push(command);
```

Undo:

```javascript
const lastCommand = history.pop();
lastCommand.undo();
```

Boom 💥 Undo system ready.

---

# 🟢 8️⃣ Macro Command (Advanced)

Execute multiple commands together.

```javascript
class MacroCommand {
  constructor(commands) {
    this.commands = commands;
  }

  execute() {
    this.commands.forEach(cmd => cmd.execute());
  }
}
```

Use case:

* Turn off all devices
* Deploy all services
* Bulk payment processing

---

# 🟢 9️⃣ Real Backend Use Case (Important for You 🚀)

### Example: Payment Queue System

Instead of:

```javascript
processPayment(userId, amount);
```

We create:

```javascript
class PaymentCommand {
  constructor(userId, amount) {
    this.userId = userId;
    this.amount = amount;
  }

  execute() {
    paymentService.process(this.userId, this.amount);
  }
}
```

Now we can:

* Push into Redis queue
* Retry if fails
* Log it
* Delay execution
* Move to dead-letter queue

This is how:

* BullMQ
* Kafka consumers
* AWS SQS workers

Work internally 🔥

---

# 🟢 1️⃣0️⃣ Interview Definition (Strong Version)

If interviewer asks:

“What is Command Pattern?”

Answer:

> Command pattern encapsulates a request as an object, allowing parameterization of clients, queuing of requests, logging, and support for undoable operations. It decouples the sender from the receiver.

That’s clean and powerful 💪

---

# 🟢 1️⃣1️⃣ Command vs Strategy

| Command              | Strategy                       |
| -------------------- | ------------------------------ |
| Encapsulates request | Encapsulates algorithm         |
| Supports undo        | No undo concept                |
| Often uses execute() | Often uses run()/calculate()   |
| Used for actions     | Used for interchangeable logic |

---

# 🟢 1️⃣2️⃣ When To Use

Use Command Pattern when:

* You need undo/redo
* You need job queue
* You need event logging
* You want loose coupling
* You want delayed execution
* You need transaction rollback

---

# 🟢 1️⃣3️⃣ When NOT To Use

❌ Very simple systems
❌ No need for decoupling
❌ No undo/queue required
❌ Over-engineering small app

---

# 🟢 1️⃣4️⃣ Advanced Architecture Insight (Senior Level Thinking)

Command Pattern is base for:

* Event-driven systems
* CQRS architecture
* Task schedulers
* Message queues
* Workflow engines
* Microservices async communication

Even in React:

```javascript
onClick={() => dispatch(new AddToCartCommand(product))}
```

Conceptually similar.

---

# 🧠 Final Understanding (Big Picture)

Command Pattern is about:

👉 Turning behavior into objects
👉 Decoupling execution from request
👉 Making actions first-class citizens


---

# ✅ Steps to Implement Command Design Pattern

---

## 🔹 Step 1: Identify the Action

Ask:

> What operation needs to be executed?

Example:

* Turn on light
* Process payment
* Delete user
* Send email

This action will become a **Command**.

---

## 🔹 Step 2: Create Command Interface (Abstraction)

Define a common method.

```javascript
class Command {
  execute() {}
}
```

Why?
So all commands follow same structure.

---

## 🔹 Step 3: Create Receiver

Receiver contains actual business logic.

```javascript
class Light {
  turnOn() {
    console.log("Light ON");
  }
}
```

Receiver knows **how** to do it.

---

## 🔹 Step 4: Create Concrete Command

This wraps the request.

```javascript
class TurnOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }
}
```

Command knows:

* What to call
* On which object

---

## 🔹 Step 5: Create Invoker

Invoker triggers execution.

```javascript
class Remote {
  setCommand(command) {
    this.command = command;
  }

  pressButton() {
    this.command.execute();
  }
}
```

Invoker does NOT know:

* Light
* Payment
* Email
* Anything internal

It only knows `execute()`.

---

## 🔹 Step 6: Client Wiring

Client connects everything.

```javascript
const light = new Light();
const command = new TurnOnCommand(light);
const remote = new Remote();

remote.setCommand(command);
remote.pressButton();
```

---

# 🧠 Simple Memory Trick

Remember this flow:

Client → Command → Receiver
Invoker → execute() → Receiver

---

# 🎯 Interview 6-Step Summary (One Line Each)

1. Identify request
2. Create Command interface
3. Create Receiver
4. Create ConcreteCommand
5. Create Invoker
6. Wire everything in Client

Done ✅

---

If interviewer asks:

“Why we need this?”

You say:

> To decouple sender from receiver and support undo, queue, logging, and delayed execution.

Simple. Clean. Powerful 💪🔥

---

