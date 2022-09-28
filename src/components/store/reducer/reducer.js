
import { ADD_TASKS, ADD_USERS } from '../action/action'
const initialize = {
    tasks: [],
    users: []
}

export const TodoTask = (state = initialize, action) => {
    switch (action.type) {
        // case Add_to_important:
        //     return {
        //         ...state,
        //         importanttaskItem: [...state.importanttaskItem, action.payload],
        //     }
            case ADD_TASKS:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            }
            case ADD_USERS:
            return {
                ...state,
                users: [...state.users, action.payload],
            }
        default:
            return state;
    }
}

// export const usersReducer = (state = initialize, action) => {
//     switch (action.type) {
        
//         default:
//             return state;
//     }

// }
// export default importanttaskreducer;