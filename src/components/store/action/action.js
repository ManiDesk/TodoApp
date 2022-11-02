import { collection, query, orderBy, onSnapshot, addDoc, where, Timestamp } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from '../../FireBase'
import React, { useState, useRef, useEffect } from "react";
export const ADD_TASKS = 'ADD_TASKS';
export const GET_TASKS = 'GET_TASKS';
export const DELETE_ALL = 'DELETE_ALL';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASKS = 'UPDATE_TASKS';


export const gettasks = () => async (dispatch) => {
    try {
    const [user, loading, error] = useAuthState(auth);
    const [cardlistsP, setcardlistP] = useState([]);
    if (user) {
        const taskColRef = query(collection(db, 'nirtodoapp' + user.uid), where("taskcompleted", "==", false))
        if(taskColRef.docs.length > 0){
            onSnapshot(taskColRef, (snapshot) => {
                setcardlistP(snapshot.docs.map(doc => ({
                    id: doc.id,
                   data: doc.data()
                 }))
                 )
       
               })
            dispatch({
                type: GET_TASKS,
                payload: cardlistsP
            })
        }
        


}
    }
    catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
  
}