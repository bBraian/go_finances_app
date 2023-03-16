import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    async function signOut() {
        setUser({});
        await AsyncStorage.removeItem('@gofinances:user');
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const userStorage = await AsyncStorage.getItem('@gofinances:user');

            if(userStorage) {
                const userLogged = JSON.parse(userStorage);
                setUser(userLogged);
            }
            setUserStorageLoading(false);
        }

        loadUserStorageData();
    }, [])

    return (
        <AuthContext.Provider 
            value={{
                user,
                signOut,
                userStorageLoading
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }