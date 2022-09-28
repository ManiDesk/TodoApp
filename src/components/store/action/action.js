export const ADD_USERS = "ADD_USERS"
export const ADD_TASKS = "ADD_TASKS"
export const addtotask = (payload) => {
    return {
        type: ADD_TASKS,
        payload: payload,
    };
};
export const addUsers = (payload) =>{
    return{
        type: ADD_USERS,
        payload:payload
    }
}