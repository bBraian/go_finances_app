import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    console.log(user);

    async function signOut() {
        setUser({});
        await AsyncStorage.removeItem('@gofinances:user');
    }

    async function createUser(data) {
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(data))
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const userStorage = await AsyncStorage.getItem('@gofinances:user');
            console.log(userStorage);
            if(userStorage) {
                const userLogged = JSON.parse(userStorage);
                setUser(userLogged);
            }
        }

        loadUserStorageData();
        signOut();
    }, [])

    return (
        <AuthContext.Provider 
            value={{
                user,
                signOut,
                setUser,
                createUser
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