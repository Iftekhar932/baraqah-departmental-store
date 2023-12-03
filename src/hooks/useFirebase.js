import React, { useEffect, useState } from "react";

// firebase imports
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../Firebase/firebase.init";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* 🔽⏬🔽⏬ SIGN IN WITH GOOGLE 🔽⏬🔽⏬ */
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;
        const uid = user.uid;
        user.role = "user";
        setUser(user);

        //* jwt for google sign in only
        const response = await axios.post(
          "http://localhost:3001/jsonWebAccessToken",
          {
            uid,
            email: user.email,
            role: user.role,
          }
        );

        // ▶️👉 handling response
        response.status === 200
          ? localStorage.setItem("access_token", response.data)
          : console.log(response.data, "login failed");

        navigate("/");
        return response;
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
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(
          "❌❌❌❌❌ ~ file: useFirebase.js:37 ~ .then ~ email:",
          email
        );
      });
  };

  /* 🔽⏬🔽⏬ SIGN OUT  🔽⏬🔽⏬ */
  const logOut = () => {
    signOut(auth)
      .then((d) => {
        // Sign-out successful.
        console.log(d, "signed Out");
        localStorage.removeItem("access_token");
      })
      .catch((error) => {
        // An error happened.
        console.log("✨ 🌟  logOut  error:", error);
      });
  };
  /* 🔽⏬🔽⏬ SIGN OUT  🔽⏬🔽⏬ */

  /* 🔽⏬🔽⏬ USER STATE OBSERVER 🔽⏬🔽⏬ */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);
  /* 🔽⏬🔽⏬ USER STATE OBSERVER 🔽⏬🔽⏬ */

  return {
    user,
    setUser,
    signInWithGoogle,
    logOut,
  };
};

export default useFirebase;
