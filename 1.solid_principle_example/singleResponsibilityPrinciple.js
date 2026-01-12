// Single Responsibility Principle (SRP)
// A class should have only one reason to change, meaning it should have only one job or responsibility.
// In other words, a class should do one thing and do it well. 
//singleResponsibilityPrinciple.js

// Bad Example: A class that handles both user data and user validation

class User {
    constructor(name, email) {
        this.name = name
        this.email = email
    }

    getUserInfo() {

        if (!this.validateUser()) {
            return 'Invalid user data. Please provide a valid name and email.'
        }

        return {
            name: this.name,
            email: this.email
        }
    }

    validateUser() {
        if (!this.name || !this.email) {
            return false
        }
        return true
    }

    getOrderInfo() {

        if (!this.validateUser()) {
            return "User data is invalid. Please provide a valid name and email."
        }

        const orderInfo = [
            {
                orderId: 123,
                productName: 'iPhone',
                quantity: 2,
                price: 999
            },
            {
                orderId: 456,
                productName: 'MacBook',
                quantity: 1,
                price: 1999
            }
        ]

        return orderInfo

    }

}

const user = new User('johon@example.com')

// console.log(user.getUserInfo())
// console.log(user.getOrderInfo())



// good example: A class that handles user data and a separate class that handles user validation

class UserData {

    constructor(name, email) {
        this.name = name
        this.email = email
    }

    getUserInfo() {
        return {
            name: this.name,
            email: this.email
        }
    }


}

class UserValidation {

    constructor(userData) {
        this.userData = userData
    }

    validateUser() {
        if (!this.userData.name || !this.userData.email) {
            return false
        }
        return true
    }
}

class UserOrder {

    constructor(userData, userValidation) {
        this.userData = userData
        this.userValidation = userValidation
    }

    getOrderInfo() {

        if (!this.userValidation.validateUser()) {
            return "User data is invalid. Please provide a valid name and email."
        }

        const orderInfo = [
            {
                orderId: 123,
                productName: 'iPhone',
                quantity: 2,
                price: 999
            },
            {
                orderId: 456,
                productName: 'MacBook',
                quantity: 1,
                price: 1999
            }
        ]

        return orderInfo

    }

}

const userData = new UserData('johon', 'johon@example.com')
const userValidation = new UserValidation(userData)
const userOrder = new UserOrder(userData, userValidation)

console.log(userOrder.getOrderInfo())