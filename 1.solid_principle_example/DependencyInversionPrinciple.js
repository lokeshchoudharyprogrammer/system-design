

// DependencyInversionPrinciple.js
// ==========================================
// In this example, we have a high-level module (PaymentProcessor) that depends on a low-level module (PaymentMethod).
// Instead of depending on a concrete implementation, we depend on an abstraction .
// This way, we can easily swap out the payment method without modifying the PaymentProcessor.



class Database {
    save(data) {
        throw new Error("save() not implemented");
    }
}

class MongoDB extends Database {
    save(data) {
        console.log(`Saving data to MongoDB: ${data}`);
    }
}

class MySQL extends Database {
    save(data) {
        console.log(`Saving data to MySQL: ${data}`);
    }
}


class UserService {
    constructor(database) {
        this.database = database;
    }

    saveUser(user) {
        this.database.save(user);
    }
}

const mongo = new MongoDB();
const userService1 = new UserService(mongo);
userService1.saveUser("user123");

const mysql = new MySQL();
const userService2 = new UserService(mysql);
userService2.saveUser("user456");




class Course {
    getCourseDetails() {
        console.log('Fetching course details...');
    }
}

class PaidCourse extends Course {
    constructor(courseId) {
        super();
        this.courseId = courseId;
    }
    getCourseDetails() {
        console.log('Fetching paid course details...');
    }
}

class FreeCourse extends Course {
    constructor(courseId) {
        super();
        this.courseId = courseId;
    }
    getCourseDetails() {
        console.log('Fetching free course details...');
    }
}


class CourseService {
    constructor(course) {
        this.course = course;
    }
    getCourseDetails() {
        this.course.getCourseDetails();
    }
}

const freeCourse=new FreeCourse("123");
const paidCourse=new PaidCourse("456");


const freeCourseService=new CourseService(freeCourse);
freeCourseService.getCourseDetails();

const paidCourseService=new CourseService(paidCourse);
paidCourseService.getCourseDetails();