/**
 * Factory Method – Definition (Interview Ready)
 *
 * Factory Method is a creational design pattern that defines an interface
 * for creating an object, but lets subclasses decide which class to instantiate.
 *
 * Key phrase to remember:
 * "Delegates object creation to subclasses."
 *
 * This clearly separates Factory Method from Simple Factory,
 * because the creation logic is pushed to subclasses instead of a single factory.
 */


class Course {
    createCourse() {
        throw new Error("Not implemented");
    }
}

class JsCourse extends Course {
    createCourse() {
        console.log("This is Basic JS Course");
    }
}

class SqlCourse extends Course {
    createCourse() {
        console.log("This is Advanced SQL Course");
    }
}

class SystemDesignCourse extends Course {
    createCourse() {
        console.log("This is Advanced System Design Course");
    }
}


class CourseFactory {
    createCourse() {
        throw new Error("Not implemented");
    }
}


class JsCourseFactory extends CourseFactory {
    createCourse() {
        return new JsCourse();
    }
}

class SqlCourseFactory extends CourseFactory {
    createCourse() {
        return new SqlCourse();
    }
}

class SystemDesignCourseFactory extends CourseFactory {
    createCourse() {
        return new SystemDesignCourse();
    }
}


let factory = new JsCourseFactory();
let course = factory.createCourse();
course.createCourse();

