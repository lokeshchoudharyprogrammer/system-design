// =================================
// 1️⃣ Notification Component
// =================================
class Notification {
    getContent() {
        throw new Error("Not Implemented");
    }
}

// =================================
// 2️⃣ Concrete Notification
// =================================
class SmsNotification extends Notification {
    constructor(text) {
        super();
        this.text = text;
    }

    getContent() {
        return this.text;
    }
}

// =================================
// 3️⃣ Decorator Base
// =================================
class NotificationDecorator extends Notification {
    constructor(notification) { 
        super();
        this.notification = notification;
    }

    getContent() {
        return this.notification.getContent();
    }
}

// =================================
// Decorators
// =================================
class TimestampDecorator extends NotificationDecorator {
    getContent() {
        return `${new Date().toISOString()} - ${super.getContent()}`;
    }
}

class SignatureDecorator extends NotificationDecorator {
    constructor(notification, signature) {
        super(notification);
        this.signature = signature;
    }

    getContent() {
        return `${super.getContent()}\n${this.signature}`;
    }
}

// =================================
// Observer
// =================================
class Observer {
    update() { }
}

// =================================
// Observable
// =================================
class NotificationObservable {
    constructor() {
        this.observers = [];
        this.notification = null;
    }

    add(observer) {
        this.observers.push(observer);
    }

    notify() {
        this.observers.forEach(o => o.update());
    }

    setNotification(notification) {
        this.notification = notification;
        this.notify();
    }

    getNotification() {
        return this.notification;
    }
}

// =================================
// Strategy Pattern
// =================================
class NotificationStrategy {
    send(message) {
        throw new Error("Not Implemented");
    }
}

class EmailStrategy extends NotificationStrategy {
    send(message) {
        console.log("📧 Email:", message);
    }
}

class SMSStrategy extends NotificationStrategy {
    send(message) {
        console.log("📱 SMS:", message);
    }
}

class WhatsAppStrategy extends NotificationStrategy {
    send(message) {
        console.log("🟢 WhatsApp:", message);
    }
}

// =================================
// Notification Engine (Observer)
// =================================
class NotificationEngine extends Observer {
    constructor(observable) {
        super();
        this.observable = observable;
        this.strategies = [];
    }

    addStrategy(strategy) {
        this.strategies.push(strategy);
    }

    update() {
        const message =
            this.observable
                .getNotification()
                .getContent();

        this.strategies.forEach(strategy =>
            strategy.send(message)
        );
    }
}

// =================================
// ⭐ Notification Service
// =================================
class NotificationService {
    constructor() {
        this.observable =
            new NotificationObservable();

        this.engine =
            new NotificationEngine(
                this.observable
            );

        this.observable.add(this.engine);
    }

    addChannel(strategy) {
        this.engine.addStrategy(strategy);
    }

    createNotification(message, options = {}) {

        let notification =
            new SmsNotification(message);

        // apply decorators
        if (options.timestamp) {
            notification =
                new TimestampDecorator(
                    notification
                );
        }

        if (options.signature) {
            notification =
                new SignatureDecorator(
                    notification,
                    options.signature
                );
        }

        return notification;
    }

    send(notification) {
        this.observable.setNotification(
            notification
        );
    }
}

// =================================
// 🚀 Usage
// =================================

const service = new NotificationService();

// channels
service.addChannel(new EmailStrategy());
service.addChannel(new SMSStrategy());
service.addChannel(new WhatsAppStrategy());

// create message
const notification =
    service.createNotification(
        "Hello Lokesh 🔥",
        {
            timestamp: true,
            signature: "-- System"
        }
    );

// send
service.send(notification);