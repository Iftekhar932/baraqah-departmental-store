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

import axios from "axios";

import { app } from "../Firebase/firebase.init";
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

        //* jwt
        const response = await axios.post(
          "http://localhost:3001/jsonWebAccessToken",
          {
            uid,
            email: user.email,
            role: user.role,
          }
        );

        //* handle response for cookie
        /* response.status === 200
        / ? console.log(response.data, "login Successful")
        : console.log(response.data, "login failed");
      return response; */

        //* for localStorage
        response.status === 200
          ? console.log(
              localStorage.setItem("access_token", response.data),
              response.data,
              "login Successful"
            )
          : console.log(response.data, "login failed");
        console.log(localStorage.getItem(response.data));
        return response;
        // navigate("/");
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
        // The AuthCredential type that was used.
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
        // An error happened.
      });
  };
  /* 🔽⏬🔽⏬ SIGN OUT WITH EMAIL 🔽⏬🔽⏬ */

  /* 🔽⏬🔽⏬ SIGN UP WITH EMAIL 🔽⏬🔽⏬ */
  const signUpWithEmailFunc = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user, "emailUp");
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("❌❌❌line19 emailSignup", errorCode, errorMessage);
      });
  };
  /* 🔽⏬🔽⏬ SIGN UP WITH EMAIL 🔽⏬🔽⏬ */

  /* 🔽⏬🔽⏬ SIGN IN WITH EMAIL 🔽⏬🔽⏬ */
  const signInWithEmailFunc = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user, "emailIn");
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("❌❌❌line33 emailSignIn", errorCode, errorMessage);
      });
  };
  /* 🔽⏬🔽⏬ SIGN IN WITH EMAIL 🔽⏬🔽⏬ */

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

  /* 🔽⏬🔽⏬ PROFILE UPDATE FUNCTION 🔽⏬🔽⏬ */
  const profileUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User",
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
  /* 🔽⏬🔽⏬ PROFILE UPDATE FUNCTION 🔽⏬🔽⏬ */

  return {
    user,
    setUser,
    signUpWithEmailFunc,
    signInWithEmailFunc,
    signInWithGoogle,
    logOut,
    profileUpdate,
    getCookie,
  };
};

export default useFirebase;
