import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token)=>{},
    setAuth: () =>{},
    logout: ()=>{}
})

function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState();
    const [isAutheticated, setisAuthenticated] = useState(false);

    function authenticate(token){
        setAuthToken(token);
    }

    function logout(){
        setisAuthenticated(false);
    }

    function setAuth(){
        setisAuthenticated(true);
    }

    const value = {
        token: authToken,
        isAuthenticated: isAutheticated,
        authenticate: authenticate,
        setAuth: setAuth,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;