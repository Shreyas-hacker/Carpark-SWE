import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    display_name: '',
    email: '',
    photo: '',
    authenticate: (token)=>{},
    setAuth: () =>{},
    logout: ()=>{},
    handleDisplayName: (name)=>{},
    handleEmail: (email)=>{},
    handlePhotoURL: (url)=>{}
})

function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState('');
    const [isAutheticated, setisAuthenticated] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout() {
    setisAuthenticated(false);
  }

  function setAuth() {
    setisAuthenticated(true);
  }

  function handleDisplayName(name) {
    setDisplayName(name);
  }

    function handleEmail(email){
        setEmail(email);
    }

    function handlePhotoURL(url){
        setPhotoURL(url);
    }

    const value = {
        token: authToken,
        isAuthenticated: isAutheticated,
        display_name: displayName,
        email: email,
        photo: photoURL,
        authenticate: authenticate,
        setAuth: setAuth,
        logout: logout,
        handleDisplayName: handleDisplayName,
        handleEmail: handleEmail,
        handlePhotoURL: handlePhotoURL
    }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
