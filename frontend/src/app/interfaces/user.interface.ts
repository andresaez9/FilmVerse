export interface User {
    name?: string;
    surname?: string;
    email: string;
    password: string;
}

export interface UserResponse { 
    token: string;
    user: User;
}