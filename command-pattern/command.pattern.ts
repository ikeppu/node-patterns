// Command pattern
interface ICommand {
  execute(): void;
  undo(): void;
}

class Light {
  public turnOn(): void {
    console.log("The light is on");
  }

  turnOff(): void {
    console.log("The light is off");
  }
}

class TurnOnCommand implements ICommand {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn();
  }

  undo(): void {
    this.light.turnOff();
  }
}
class TurnOffCommand implements ICommand {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }

  undo(): void {
    this.light.turnOn();
  }
}

class SimpleRemoteControl {
  private currentCommand!: ICommand;
  private undoCommand!: ICommand;
  private commandQueue: ICommand[] = [];

  public setCommand(command: ICommand): void {
    this.undoCommand = this.currentCommand;
    this.currentCommand = command;
    this.commandQueue.push(command);
  }

  buttonWasPressed(): void {
    if (this.commandQueue.length > 0) {
      const command = this.commandQueue.shift();

      command?.execute();
    }
  }

  undoButtonWasPressed(): void {
    this.undoCommand.execute();
  }

  hasCommands(): boolean {
    return this.commandQueue.length > 0;
  }
}

// client code
const remote: SimpleRemoteControl = new SimpleRemoteControl();
const light: Light = new Light();

remote.setCommand(new TurnOnCommand(light));
remote.setCommand(new TurnOffCommand(light));

remote.buttonWasPressed();

// Real world
class DeleteFileCommand implements ICommand {
  execute(): void {
    console.log(`Executing delete file command`);
  }
  undo(): void {
    console.log(`Undo last command DeleteFileCommand class`);
  }
}

class UpdateFileCommand implements ICommand {
  constructor(
    private path: string,
    private newContent: string,
    private oldContent: string
  ) {}

  execute(): void {
    console.log(`Executing update file command`);
  }
  undo(): void {
    console.log(`Undo last command UpdateFileCommand class`);
  }
}
class ReadFileCommand implements ICommand {
  constructor(private path: string) {}

  execute(): void {
    console.log(`Executing read file command`);
  }
  undo(): void {
    console.log(`Undo last command ReadFileCommand class`);
  }
}

class MyFileSystem {
  private commandQueue: ICommand[] = [];
  addCommand(command: ICommand): void {
    this.addCommand(command);
  }

  executeCommand(): void {
    if (this.commandQueue.length > 0) {
      const command = this.commandQueue.shift();

      command?.execute();
    }
  }

  undoCommand(): void {}

  hasCommands(): boolean {
    return this.commandQueue.length > 0;
  }
}

// client code
