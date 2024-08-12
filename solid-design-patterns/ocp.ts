// Open Close Principle

// regular - 10
// premium - 20
// gold - 30

interface Customer {
  giveDiscount(): number;
}

class RegularCustomer implements Customer {
  giveDiscount(): number {
    return 10;
  }
}

class PremiumCustomer implements Customer {
  giveDiscount(): number {
    return 20;
  }
}

class Discount {
  giveDiscount(customer: Customer): number {
    return customer.giveDiscount();
  }
}

let premiumCustomer = new PremiumCustomer();

let discount: Discount = new Discount();

discount.giveDiscount(premiumCustomer);
