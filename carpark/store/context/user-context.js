import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  display_name: "",
  email: "",
  authenticate: (token) => {},
  setAuth: () => {},
  logout: () => {},
  handleDisplayName: (name) => {},
  handleEmail: (email) => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");
  const [isAutheticated, setisAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

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

  function handleEmail(email) {
    setEmail(email);
  }
  const value = {
    token: authToken,
    isAuthenticated: isAutheticated,
    display_name: displayName,
    email: email,
    authenticate: authenticate,
    setAuth: setAuth,
    logout: logout,
    handleDisplayName: handleDisplayName,
    handleEmail: handleEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
