class TokenService {
    validateToken(token: string): boolean {
        console.log("Validating token");
        return token === "valid-token";
    }
}

interface User {
    name: string;
    age: number;
    role: string;
}

class UserService {
    getUser(id: number): User {
        console.log("User fetching...");
        return {
            name: "kit kat",
            age: 99,
            role: "admin"
        };
    }
}

class PermissionService {
    checkPermission(user: User): boolean {
        console.log("Checking permissions...");
        return user.role === "admin";
    }
}

class AuthFacade {
    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private permissionService: PermissionService
    ) { }

    login(token: string, userId: number): void {
        const isValid = this.tokenService.validateToken(token);

        if (!isValid) {
            console.log("Invalid token");
            return;
        }

        const user = this.userService.getUser(userId);

        const hasAccess = this.permissionService.checkPermission(user);

        if (!hasAccess) {
            console.log("Access denied");
            return;
        }

        console.log("Login successful for", user.name);
    }
}

const auth = new AuthFacade(
    new UserService(),
    new TokenService(),
    new PermissionService()
);

auth.login("valid-token", 1);