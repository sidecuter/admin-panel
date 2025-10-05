import { createContext, useContext, useState } from 'react';

interface AuthContextType {
    user: any; // можно заменить на User | null
    login: (data: any) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null); // можно заменить на тип User

    const login = (userData: any) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{user, login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
}