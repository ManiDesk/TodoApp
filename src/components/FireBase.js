import React, { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//login auth
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import SuceessMessage from "./auth/SuccessMessage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ggPsbmLIF_UGpvpTmJlKLulQ3UGPaq8",
  authDomain: "manitodoapp.firebaseapp.com",
  projectId: "manitodoapp",
  storageBucket: "manitodoapp.appspot.com",
  messagingSenderId: "836377853703",
  appId: "1:836377853703:web:eefc6614be3e8915668fa2",
  measurementId: "G-J6QL3B2C7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async (e) => {
  e.preventDefault();
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    switch(err.code) {
      case 'auth/email-already-in-use': alert('Email already in use !') 
      break;
      case 'auth/user-not-found': alert('User not found !') 
      break;
   }
    console.error(err);
    
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  let validationmessage ='';
 
  try {
    await signInWithEmailAndPassword(auth, email, password)
    //alert('dgjkdhgjjd')
    validationmessage={status : "success", message : "Successfully logined" }; 
    return validationmessage;
  } catch (err) {
  //  console.error('code' + err.code);
    switch(err.code) {
      case 'auth/email-already-in-use':  validationmessage={status : "error", message : "The email address is already in use" };
      
      break;
      case 'auth/user-not-found':  
      validationmessage={status : "error", message : "The user not found" };
      break;
      case 'auth/invalid-email':   validationmessage={status : "error", message : "Invalid email" }; 
      break;
      case 'auth/network-request-failed':   validationmessage={status : "error", message : "Your network request failed" }; 
      break;
      case 'auth/wrong-password':   validationmessage={status : "error", message : "Wrong Password" }; 
      break;
      default: alert(err.message)
   }
   return validationmessage
  }
};

const registerWithEmailAndPassword = async (name, email, password,phone) => {
  let validationmessage ='';
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      phone
      
    });
    //alert('dgdg')
    validationmessage={status : "success", message : "Successfully Registerd" }; 
    return validationmessage;
  } catch (err) {
    switch(err.code) {
      case 'auth/email-already-in-use':  validationmessage={status : "error", message : "The email address is already in use" };
      
      break;
      case 'auth/user-not-found':  
      validationmessage={status : "error", message : "The user not found" };
      break;
      case 'auth/invalid-email':   validationmessage={status : "error", message : "Invalid email" }; 
      break;
      break;
      case 'auth/weak-password':   validationmessage={status : "error", message : "Password should be at least 6 characters" }; 
      break;
      default: alert(err.message)
   }
   return validationmessage
  }
};

const sendPasswordReset = async (email) => {
  let validationmessage ='';
  try {
    await sendPasswordResetEmail(auth, email);
    
   // alert("Password reset link sent!");
    validationmessage={status : "success", message : "Password reset link sent!" }; 
    return validationmessage;
  } catch (err) {
    switch(err.code) {
      case 'auth/email-already-in-use':  validationmessage={status : "error", message : "The email address is already in use" };
      
      break;
      case 'auth/user-not-found':  
      validationmessage={status : "error", message : "The user not found" };
      break;
      case 'auth/invalid-email':   validationmessage={status : "error", message : "Invalid email" }; 
      break;
      break;
      case 'auth/weak-password':   validationmessage={status : "error", message : "Password should be at least 6 characters" }; 
      break;
      default: alert(err.message)
   }
   return validationmessage
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  
};
