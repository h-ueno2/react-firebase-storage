import React, { useEffect, useState } from "react";
import { app } from "../base";
import * as H from "history";
import firebase from "firebase";

const defaultProp: AuthContextProps = {
  login: (email: string, password: string, history: H.History) => {},
  signup: (email: string, password: string, history: H.History) => {},
  currentUser: null,
};

// Contextを作成
export const AuthContext = React.createContext<AuthContextProps>(defaultProp);

// ContextのPropに使用する型
export type AuthContextProps = {
  login: (email: string, password: string, history: H.History) => void;
  signup: (email: string, password: string, history: H.History) => void;
  currentUser: firebase.User | null;
};

export const AuthProvider: React.FunctionComponent = (props) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  const login = async (email: string, password: string, history: H.History) => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const signup = async (
    email: string,
    password: string,
    history: H.History
  ) => {
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login: login,
        signup: signup,
        currentUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
