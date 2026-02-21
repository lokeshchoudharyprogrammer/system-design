
class Command {
    execute() { }
}

class Fan {

    on() {
        console.log("Fan On")
    }
    off() {
        console.log("Fan Off")
    }
}

class FanOnCommand {
    constructor(fan) {
        this.fan = fan
    }
    execute() {
        this.fan.on()
    }
}
class FanOffCommand {
    constructor(fan) {
        this.fan = fan
    }
    execute() {
        this.fan.off()
    }
}


class RemoteControl {
    setCommand(command) {
        this.command = command;
    }
    inVoke() {
        this.command.execute()
    }
}

const fanCalling = new Fan();

const fanOn = new FanOnCommand(fanCalling);
const fanOff = new FanOffCommand(fanCalling);

const remote=new RemoteControl();
remote.setCommand(fanOn);
remote.inVoke();

remote.setCommand(fanOff);
remote.inVoke()