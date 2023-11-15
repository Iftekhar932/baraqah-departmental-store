import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../Firebase/firebase.init";

const auth = getAuth(app);

const useFirebase = () => {
  const [user, setUser] = useState(null);

  const signUpWithEmailFunc = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("❌❌❌line19 emailSignup", errorCode, errorMessage);
      });
  };

  const signInWithEmailFunc = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("❌❌❌line33 emailSignIn", errorCode, errorMessage);
      });
  };

  return { signUpWithEmailFunc, signInWithEmailFunc };
};

export default useFirebase;
