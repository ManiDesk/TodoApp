import { addDoc, collection, deleteDoc, doc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from '../../FireBase'
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
export const ADD_TASKS = 'ADD_TASKS';
export const GET_TASKS = 'GET_TASKS';
export const DELETE_ALL = 'DELETE_ALL';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASKS = 'UPDATE_TASKS';


export const gettasks = () => async (dispatch) => {

    onAuthStateChanged(auth, async (user) => {
        if (user) {

            const q = query(collection(db, 'nirtodoapp' + user.uid), where("taskcompleted", "==", false));

            const tasks = await getDocs(q);

            if (tasks.docs.length > 0) {
                const tasksArray = [];
                for (var snap of tasks.docs) {
                    const data = snap.data();
                    tasksArray.push(data);
                }
                console.log(tasksArray)
                dispatch({
                    type: GET_TASKS,
                    payload: tasksArray
                })
            }
        } else {
            // User is signed out
            // ...
        }
    });

}