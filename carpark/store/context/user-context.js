import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    display_name: '',
    authenticate: (token)=>{},
    setAuth: () =>{},
    logout: ()=>{},
    handleDisplayName: (name)=>{}
})

function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState('');
    const [isAutheticated, setisAuthenticated] = useState(false);
    const [displayName, setDisplayName] = useState('');

    function authenticate(token){
        setAuthToken(token);
    }

    function logout(){
        setisAuthenticated(false);
    }

    function setAuth(){
        setisAuthenticated(true);
    }

    function handleDisplayName(name){
        setDisplayName(name);
    }

    const value = {
        token: authToken,
        isAuthenticated: isAutheticated,
        display_name: displayName,
        authenticate: authenticate,
        setAuth: setAuth,
        logout: logout,
        handleDisplayName: handleDisplayName
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;