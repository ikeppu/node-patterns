// Factory pattern one of most popular pattern.

abstract class Car {
  constructor(public model: string, public productionYear: number) {}
  abstract displayCarInfor(): void;
}

class Sedan extends Car {
  displayCarInfor(): void {
    console.log(
      `This is a Sedan. Model: ${this.model}, Production year: ${this.productionYear}`
    );
  }
}

class SUV extends Car {
  displayCarInfor(): void {
    console.log(
      `This is a SUV. Model: ${this.model}, Production year: ${this.productionYear}`
    );
  }
}

class Hatchback extends Car {
  displayCarInfor(): void {
    console.log(
      `This is a Hatchback. Model: ${this.model}, Production year: ${this.productionYear}`
    );
  }
}

class CarFactory {
  public createCar(
    type: "sedan" | "suv" | "hatchback",
    model: string,
    productionYear: number
  ): Car {
    switch (type) {
      case "sedan":
        return new Sedan(model, productionYear);
      case "suv":
        return new SUV(model, productionYear);
      case "hatchback":
        return new Hatchback(model, productionYear);
      default:
        throw new Error("Invalid car type");
    }
  }
}

let car = new CarFactory().createCar("sedan", "t", 1980);
