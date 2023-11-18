import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import { app } from "../Firebase/firebase.init";
import { useNavigate } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [user, setUser] = useState([]);

  /* 🔽⏬🔽⏬ SIGN IN WITH GOOGLE 🔽⏬🔽⏬ */
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        user.role = "user";
        console.log(user, "GOOGLE");
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(
          "❌❌❌❌❌ ~ file: useFirebase.js:32 ~ .then ~ errorCode:",
          errorCode
        );
        const errorMessage = error.message;
        console.log(
          "❌❌❌❌❌ ~ file: useFirebase.js:34 ~ .then ~ errorMessage:",
          errorMessage
        );
      });
  };

  /* 🔽⏬🔽⏬ SIGN OUT WITH EMAIL 🔽⏬🔽⏬ */
  const logOut = () => {
    signOut(auth)
      .then((d) => {
        // Sign-out successful.
        console.log(d, "signed Out");
      })
      .catch((error) => {
        console.log("🚀 ~ file: useFirebase.js:54 ~ logOut ~ error:", error);
        // An error happened.
      });
  };

  /* 🔽⏬🔽⏬ SIGN UP WITH EMAIL 🔽⏬🔽⏬ */
  const signUpWithEmailFunc = (email, password) => {
    console.log("EMAIL");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // console.log(user, "emailUp");
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("❌❌❌line19 emailSignup", errorCode, errorMessage);
      });
  };

  /* 🔽⏬🔽⏬ SIGN IN WITH EMAIL 🔽⏬🔽⏬ */
  const signInWithEmailFunc = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user, "emailIn");
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("❌❌❌line33 emailSignIn", errorCode, errorMessage);
      });
  };

  /* 🔽⏬🔽⏬ USER STATE OBSERVER 🔽⏬🔽⏬ */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user);
        console.log(user, auth.currentUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  /* 🔽⏬🔽⏬ PROFILE UPDATE FUNCTION 🔽⏬🔽⏬ */
  const profileUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: "",
    })
      .then((d) => {
        console.log(d, "profile updated");
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: useFirebase.js:115 ~ profileUpdate ~ error:",
          error
        );
      });
  };

  return {
    user,
    setUser,
    signUpWithEmailFunc,
    signInWithEmailFunc,
    signInWithGoogle,
    logOut,
    profileUpdate,
  };
};

export default useFirebase;
