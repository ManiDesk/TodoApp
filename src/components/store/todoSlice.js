import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	todos: [{
        'name' : 'mani'
    },
    {
        'name' : 'fdg'
    },
    {
        'name' : 'dfg'
    },
    ],
};

export const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.todos.push(action.payload);
		},
		deleteTodo: (state, action) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},
		toggleReminder: (state, action) => {
			state.todos = state.todos.map((todo) =>
				todo.id === action.payload
					? { ...todo, reminder: !todo.reminder }
					: todo
			);
		},
        addtoimportance : (state,action) =>{
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        }
    
	},
});

export const { addTodo, deleteTodo, toggleReminder } = todoSlice.actions;
export default todoSlice.reducer;
