// Template pattern
abstract class CakeRecipe {
  bakeCake(): void {
    this.preHeatOven();
    this.mixIngredients();
    this.bake();
    this.colingCake();
    this.decorate();
  }

  protected preHeatOven(): void {
    console.log("Preheating oven to 175 Degree C");
  }

  protected bake(): void {
    console.log(`Baking cake ...`);
  }

  protected colingCake(): void {
    console.log("Cooling down the cake ...");
  }

  protected decorate(): void {
    console.log("Decorating cake ...");
  }

  protected abstract mixIngredients(): void;
}

class ChocolateCake extends CakeRecipe {
  protected mixIngredients(): void {
    console.log("Mixng the ingridients");
  }

  protected decorate() {
    console.log("Decorating cake with chocolate");
  }
}

// Client code
const cholcoateCake = new ChocolateCake();
cholcoateCake.bakeCake();

// Real world

// client code
