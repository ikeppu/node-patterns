// Observer pattern
interface Observer {
  update(subject: Subject): void;
}

class ConcreteObserver implements Observer {
  constructor(private id: number) {}

  update(subject: Subject): void {
    console.log(`Update method with id ${this.id}...`, subject);
  }
}

interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
  getState(): number;
  setState(state: number): void;
}

class ConcreteSubject implements Subject {
  private observers: Observer[] = [];
  private state: number = 0;

  addObserver(observer: Observer): void {
    const isExists = this.observers.includes(observer);

    if (isExists) {
      return console.log(`Observer already exists`);
    }

    this.observers.push(observer);
    console.log(`Observer Added Successfully`);
  }

  removeObserver(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex > -1) {
      this.observers.splice(observerIndex, 1);
    } else {
      return console.log(`Observer Does not exists`);
    }
  }

  notifyObservers(): void {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }

  getState(): number {
    return this.state;
  }

  setState(state: number): void {
    this.state = state;
    console.log(`Setting State...`);
    this.notifyObservers();
  }
}

// client code
const subject = new ConcreteSubject();
const observer = new ConcreteObserver(1);
const observer2 = new ConcreteObserver(2);

subject.addObserver(observer);
subject.addObserver(observer2);
subject.notifyObservers();

// Real world
interface ObserverSecond {
  update(temp: number, humidity: number, pressure: number): void;
}

interface SubjectSecond {
  registerObserver(observer: ObserverSecond): void;
  removeObserver(observer: ObserverSecond): void;
  notifyObserver(): void;
}

class WeatherData implements SubjectSecond {
  private observers: ObserverSecond[] = [];
  private temperature: number | undefined;
  private humidity: number | undefined;
  private pressure: number | undefined;

  registerObserver(observer: ObserverSecond): void {
    this.observers.push(observer);
  }
  removeObserver(observer: ObserverSecond): void {
    let index = this.observers.indexOf(observer);

    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }
  notifyObserver(): void {
    // check
    if (
      this.temperature !== undefined &&
      this.humidity !== undefined &&
      this.pressure !== undefined
    ) {
      this.observers.forEach((x) =>
        x.update(
          this.temperature as number,
          this.humidity as number,
          this.pressure as number
        )
      );
    }
  }

  setMeasurement(temp: number, humidity: number, pressure: number): void {
    this.temperature = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyObserver();
  }

  // Additional methods
}

class CurrentCondition implements ObserverSecond {
  private temperature: number | undefined;
  private humidity: number | undefined;
  private pressure: number | undefined;

  constructor(private weatherData: SubjectSecond) {
    this.weatherData.registerObserver(this);
  }

  update(temp: number, humidity: number, pressure: number): void {
    console.log(`Updated...... ${temp} ${humidity} ${pressure}`);
    this.temperature = temp;
    this.humidity = humidity;
    this.pressure = pressure;
  }
}

let subjectSecond = new WeatherData();
let currentCondition = new CurrentCondition(subjectSecond);

subjectSecond.setMeasurement(10, 20, 30);
