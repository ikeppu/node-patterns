// Iterator pattern
// Generic is very popular
class ArrayIterator<T> {
  private position: number = 0;
  constructor(private collection: T[]) {}

  next(): T {
    // Get the next element in the collection
    const result: T = this.collection[this.position];

    this.position++;

    return result;
  }

  hasNext(): boolean {
    return this.position < this.collection.length;
  }
}

// CLient code

const array: number[] = [1, 2, 3, 4, 5];
const iterator = new ArrayIterator(array);

while (iterator.hasNext()) {
  console.log(iterator.next());
}

// Real world Implementation
class User {
  constructor(public name: string) {}
}

interface MyIteratorResult<T> {
  value: T | null;
  done: boolean;
}

interface MyIterator<T> {
  next(): MyIteratorResult<T>;
  hasNext(): boolean;
}

interface Collection<T> {
  createIterator(): MyIterator<T>;
}

class UserCollection implements Collection<User> {
  constructor(private users: User[]) {}

  createIterator(): MyIterator<User> {
    return new UserIterator(this);
  }

  getItems(): User[] {
    return this.users;
  }
}

class UserIterator implements MyIterator<User> {
  private collection: UserCollection;
  private position: number = 0;

  constructor(collection: UserCollection) {
    this.collection = collection;
  }

  next(): MyIteratorResult<User> {
    if (this.hasNext()) {
      return {
        value: this.collection.getItems()[this.position++],
        done: false,
      };
    } else {
      return { value: null, done: true };
    }
  }

  hasNext(): boolean {
    return this.position < this.collection.getItems().length;
  }
}

// client code
const user = [new User("Alice"), new User("bob"), new User("Charlie")];

// Convert to the collection
const userCollection = new UserCollection(user);

const userIterator = userCollection.createIterator();

while (userIterator.hasNext()) {
  console.log(userIterator.next());
}
