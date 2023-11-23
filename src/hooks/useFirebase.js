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

        //* ▶️👉handle response for cookie
        /* response.status === 200
        / ? console.log(response.data, "login Successful")
        : console.log(response.data, "login failed");
      return response; */

        //* ▶️👉for localStorage
        response.status === 200
          ? console.log(
              localStorage.setItem("access_token", response.data),
              response.data,
              "login Successful"
            )
          : console.log(response.data, "login failed");
        console.log(localStorage.getItem(response.data));
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
      })
      .catch((error) => {
        // An error happened.
      });
  };
  /* 🔽⏬🔽⏬ SIGN OUT  🔽⏬🔽⏬ */

  const getCookie = () => {
    const cookieAccessToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("access_token="));
    if (cookieAccessToken) {
      const accessToken = cookieAccessToken.split("=")[1];
      return accessToken;
    } else {
      return null;
    }
  };

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
    getCookie,
  };
};

export default useFirebase;
