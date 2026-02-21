class Pizza {
    constructor() { };
    cost() {
        return 200;
    }
    description() {
        return "Normal Pizza"
    }
}


class PizzaDecorator {
    constructor(pizza) {
        this.pizza = pizza;
    }

    cost() {
        return this.pizza.cost();
    }

    description() {
        return this.pizza.description();
    }
}

class Cheese extends PizzaDecorator {
    cost() {
        return this.pizza.cost() + 50;
    }

    description() {
        return this.pizza.description() + ", Extra Cheese";
    }
}
class Olive extends PizzaDecorator {
    cost() {
        return this.pizza.cost() + 40;
    }

    description() {
        return this.pizza.description() + ", Olives";
    }
}
class Mushroom extends PizzaDecorator {
    cost() {
        return this.pizza.cost() + 60;
    }

    description() {
        return this.pizza.description() + ", Mushroom";
    }
}


let myPizza = new Pizza();

myPizza = new Cheese(myPizza);
myPizza = new Olive(myPizza);
myPizza = new Mushroom(myPizza);

console.log(myPizza.description());
console.log("Total Cost: ₹", myPizza.cost());

