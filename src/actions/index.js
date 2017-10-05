export const GET_TASK = "GET_TASK";
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const EDIT_TASK = "EDIT_TASK";

export function getTask(task) {
    const action = {
        type: GET_TASK,
        payload: [
            {
                id: 1,
                name: 'Adding Zip Code Field to Form',
                type: 'general',
                description: 'bar',
                created_at: 'Created 4:59 PM on October 01 2017'
            }
        ]
    }
    return action;
}

export function addTask(task) {
    const action = {
        type: ADD_TASK,
        payload: task    
    }
    return action;
}


export function removeTask(id) {
    const action = {
        type: REMOVE_TASK,
        payload: id   
    }
    return action;
}

export function editTask(task, index) {
    const action = {
        type: EDIT_TASK,
        payload: task,
        pos: index   
    }
    return action;
}
