// import { createStore } from "redux";
// import {startreducer} from './reducer/reducer'

//  export const store = createStore(startreducer)

//  import { configureStore } from "@reduxjs/toolkit";
//  import todosReducer from "../store/todoSlice";
 
//  export const store = configureStore({
// 	 reducer: {
// 		 todos: todosReducer,
// 	 },
//  });
 
import { createStore } from "redux";
import {TodoTask} from "./reducer/reducer";


export const store = createStore(TodoTask);