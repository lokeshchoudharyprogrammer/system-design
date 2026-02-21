class Device {
    constructor() { };
    turnOn() { };
    turnOff() { }
}

class Light extends Device {
    turnOn() {
        console.log("Light is ON");
    }

    turnOff() {
        console.log("Light is OFF");
    }
}

class Fan extends Device {
    turnOn() {
        console.log("Fan is ON");
    }

    turnOff() {
        console.log("Fan is OFF");
    }
}

class Command {
    execute() { }
}


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

class FanOnCommand extends Command {
    constructor(fan) {
        super();
        this.fan = fan;
    }
    execute() {
        this.fan.turnOn();
    }
}
class FanOffCommand extends Command {
    constructor(fan) {
        super();
        this.fan = fan;
    }
    execute() {
        this.fan.turnOff();
    }
}

class RemoteControl {
    setCommand(command) {
        this.command = command;
    }

    pressButton() {
        this.command.execute();
    }
}

const light = new Light();
const fan = new Fan();

const turnOn = new TurnOnCommand(light);
const turnOff = new TurnOffCommand(light);

const FanturnOn = new FanOnCommand(fan);
const FanturnOff = new FanOffCommand(fan);


const remote = new RemoteControl();

console.log("\n")
remote.setCommand(turnOn);
remote.pressButton();

remote.setCommand(turnOff);
remote.pressButton();

console.log("\n")

remote.setCommand(FanturnOn);
remote.pressButton()
remote.setCommand(FanturnOff);
remote.pressButton()

console.log("\n")

