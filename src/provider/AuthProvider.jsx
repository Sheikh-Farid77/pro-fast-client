import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AuthContext } from "../context";
import auth from "../firebase/firebase.init";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  console.log(user)

  // register user
  const registerWithEmailAndPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //login user
  const loginWithEmailAndPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // login with google
  const loginWithGoogle = () => {
    setLoading(true);

    return signInWithPopup(auth, googleProvider)
  }

  // logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }
  // observer

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
  
      }else{
        setUser(null);
      
      }
      setLoading(false)
    });

    return () => unSubscribe();
  }, []);
  const state = {
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logOut,
    user,
    loading,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
