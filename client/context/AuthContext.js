import {useEffect, useState, createContext } from 'react';
import {useRouter} from 'next/router';
import {NEXT_URL} from '../config/index'


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const login = async({email, password}) => {
        setLoading(true);
        console.log(email, password);
    }

    const logout = () => {
        console.log('logout');
    }

    const checkedUserLoggedIn = async (user) => {
        console.log('Checked')
    }

    return ( 
        <AuthContext.Provider value={{login, logout, user, error}}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthContext;