import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

import { app } from "../Firebase/firebase.init";
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const [user, setUser] = useState(null);

  /* 🔽⏬🔽⏬ SIGN IN WITH GOOGLE 🔽⏬🔽⏬ */
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(
          "🚀 ~ file: useFirebase.js:32 ~ .then ~ errorCode:",
          errorCode
        );
        const errorMessage = error.message;
        console.log(
          "🚀 ~ file: useFirebase.js:34 ~ .then ~ errorMessage:",
          errorMessage
        );
        // The email of the user's account used.
        const email = error.customData.email;
        console.log("🚀 ~ file: useFirebase.js:37 ~ .then ~ email:", email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(
          "🚀 ~ file: useFirebase.js:40 ~ .then ~ credential:",
          credential
        );
      });
  };

  /* 🔽⏬🔽⏬ SIGN OUT WITH EMAIL 🔽⏬🔽⏬ */
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  /* 🔽⏬🔽⏬ SIGN UP WITH EMAIL 🔽⏬🔽⏬ */
  const signUpWithEmailFunc = (email, password) => {
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

  /* 🔽⏬🔽⏬ SIGN IN WITH EMAIL 🔽⏬🔽⏬ */
  const signInWithEmailFunc = (email, password) => {
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

  /* 🔽⏬🔽⏬ USER STATE OBSERVER 🔽⏬🔽⏬ */
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setUser(user);
    } else {
      // User is signed out
      setUser(null);
    }
  });

  /* 🔽⏬🔽⏬ PROFILE UPDATE FUNCTION 🔽⏬🔽⏬ */
  const profileUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User",
    })
      .then((d) => {
        console.log(data, "profile updated");
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: useFirebase.js:115 ~ profileUpdate ~ error:",
          error
        );
      });
  };

  return {
    signUpWithEmailFunc,
    signInWithEmailFunc,
    signInWithGoogle,
    logOut,
    profileUpdate,
  };
};

export default useFirebase;
