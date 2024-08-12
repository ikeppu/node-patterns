// Prototype pattern

interface UserDetails {
  name: string;
  age: number;
  email: string;
}

interface Prototype {
  clone(): Prototype;
  getUserDetails(): UserDetails;
}

class ConcreetePrototype implements Prototype {
  constructor(private user: UserDetails) {}

  clone(): Prototype {
    const clone = Object.create(this);
    clone.user = { ...this.user };
    return clone;
  }

  getUserDetails(): UserDetails {
    return this.user;
  }
}

let user1 = new ConcreetePrototype({
  name: "John",
  age: 32,
  email: "john@example.com",
});

let user2 = user1.clone();

// Real world implementation

interface ShapeProperties {
  color: string;
  x: number;
  y: number;
}

abstract class Shape {
  constructor(public properties: ShapeProperties) {}
  abstract clone(): Shape;
}

class Rectangle extends Shape {
  constructor(
    properties: ShapeProperties,
    public width: number,
    public height: number
  ) {
    super(properties);
  }

  clone(): Shape {
    let clonedProperties: ShapeProperties = {
      color: this.properties.color,
      x: this.properties.x,
      y: this.properties.y,
    };

    return new Rectangle(clonedProperties, this.width, this.height);
  }
}

let redRectangle: Shape = new Rectangle(
  {
    color: "red",
    x: 20,
    y: 100,
  },
  10,
  20
);

let anotherRectangle: Shape = redRectangle.clone();
anotherRectangle.properties.color = "blue";

// Advantages for prototype pattern

// 1) One and more popolura why we should add this
// 2) Clone like this using less memory than create new one object
// 3) This is using as deep Clone

// deepCopy pattern JSON.parse(JSON.stringify(original))

// Where to use

// https://cloudaffle.com/series/creational-design-patterns/where-to-use-prototype-pattern/
