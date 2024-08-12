// Single Responsibility Principle

class User {
  constructor(name: string, email: string) {}
}

class UserAuth {
  constructor(user: User) {}

  auth(password: string) {
    // Implementation logic here
  }
}
