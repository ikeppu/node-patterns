// Facade pattern

class Grinder {
  grindBeans(): void {
    console.log("Grinding beans ...");
  }
}

class Boiler {
  boilWater(): void {
    console.log("Boiling water ...");
  }
}

class Brewer {
  brewCoffee(): void {
    console.log("Brewing Coffee ...");
  }
}

class CoffeeMakerFacade {
  constructor(
    private grinder: Grinder,
    private boiler: Boiler,
    private brewer: Brewer
  ) {}

  makeCoffee() {
    this.grinder.grindBeans();
    this.boiler.boilWater();
    this.brewer.brewCoffee();

    console.log("Coffee is ready");
  }
}

// Client Code
let grinder = new Grinder();
let boiler = new Boiler();
let brewer = new Brewer();

let coffeeMaker = new CoffeeMakerFacade(grinder, boiler, brewer);

coffeeMaker.makeCoffee();

// Real world
