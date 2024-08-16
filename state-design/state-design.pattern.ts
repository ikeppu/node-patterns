// State design pattern

interface LightState {
  switchState(lightSwitch: LightSwitch): void;
}

class OnState implements LightState {
  switchState(lightSwitch: LightSwitch): void {
    console.log("Light state is On. Turning off");
  }
}
class OffState implements LightState {
  switchState(lightSwitch: LightSwitch): void {
    console.log("Light state is Off. Turning on");
  }
}

class LightSwitch {
  constructor(private state: LightState) {}

  setState(state: LightState): void {
    this.state = state;
  }

  press(): void {
    this.state.switchState(this);
  }
}

// client code
const lightSwitch = new LightSwitch(new OffState());
lightSwitch.press();
lightSwitch.setState(new OnState());
lightSwitch.press();

// Real world
