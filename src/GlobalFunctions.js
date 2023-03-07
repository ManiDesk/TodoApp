import React from "react";
import { auth, db, logout } from "./components/FireBase";
import { useAuthState } from "react-firebase-hooks/auth";

export const  GlobalFunctions = () =>{
    const user = useAuthState(auth);
    console.log(user)
}

