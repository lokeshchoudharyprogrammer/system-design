/**
 * Abstract Factory – Definition (Interview Ready)
 *
 * Abstract Factory is a creational design pattern that provides an interface
 * for creating families of related or dependent objects
 * without specifying their concrete classes.
 *
 * Key phrase to remember:
 * "Creates families of related objects."
 *
 * It focuses on consistency between related objects
 * rather than creating a single object.
 */


class FrontendCourse {
    create() {
        throw new Error("Not implemented");
    }
}



class BackendCourse {
    create() {
        throw new Error("Not implemented");
    }
}


class ReactCourse extends FrontendCourse {
    create() {
        console.log("React Frontend Course");
    }
}

class NodeCourse extends BackendCourse {
    create() {
        console.log("Node Backend Course");
    }
}


class ReactNativeCourse extends FrontendCourse {
    create() {
        console.log("React Native Frontend Course");
    }
}

class FirebaseCourse extends BackendCourse {
    create() {
        console.log("Firebase Backend Course");
    }
}


class CourseFactory {
    createFrontend() {
        throw new Error("Not implemented");
    }
    createBackend() {
        throw new Error("Not implemented");
    }
}


class WebCourseFactory extends CourseFactory {
    createFrontend() {
        return new ReactCourse();
    }
    createBackend() {
        return new NodeCourse();
    }
}


class MobileCourseFactory extends CourseFactory {
    createFrontend() {
        return new ReactNativeCourse();
    }
    createBackend() {
        return new FirebaseCourse();
    }
}


function createPlatform(factory) {
    const frontend = factory.createFrontend();
    const backend = factory.createBackend();

    frontend.create();
    backend.create();
}

createPlatform(new WebCourseFactory());
createPlatform(new MobileCourseFactory());
