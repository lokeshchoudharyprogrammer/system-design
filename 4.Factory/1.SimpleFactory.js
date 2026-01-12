/**
 * Simple Factory – Definition (Very Important | Interview Ready)
 *
 * Simple Factory is a creational pattern where a single factory class
 * is responsible for creating objects based on some input,
 * by encapsulating object creation logic and hiding concrete classes
 * from the client.
 *
 * ⚠️ Important Notes:
 * - Simple Factory is NOT an official GoF pattern
 * - It is a common design idiom used in practice
 *
 * Key phrase to remember:
 * "One factory, many condition-based object creations."
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
    contentType(type) {
        if (type === "Basic") {
            return new JsCourse();
        } else if (type === "Advanced") {
            return new SqlCourse();
        } else if (type === "Advanced System Design") {
            return new SystemDesignCourse();
        }
    }
}


const courseFactory = new CourseFactory();
const course = courseFactory.contentType("Basic");
course.createCourse();
