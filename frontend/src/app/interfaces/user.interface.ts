export interface User {
    id_user?: number;
    name?: string;
    surname?: string;
    email: string;
    user_type?: string;
}

export interface UserResponse { 
    token: string;
    user: User;
}