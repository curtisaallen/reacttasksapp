import { GET_TASK, ADD_TASK, REMOVE_TASK, EDIT_TASK} from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
       case GET_TASK: 
          return { ...state, tasks: action.payload };   
       case ADD_TASK:
          let {tasks} = state;
          tasks.push(action.payload);
          return { ...state, tasks}; 
       case REMOVE_TASK:
           let newState = state.tasks.splice(action.payload, 1);
           return { ...state, newState }; 
       case EDIT_TASK:
          console.log(action);
          let editState = state.tasks[action.pos];
              editState.name = action.payload.name;
              editState.description = action.payload.description;
              editState.type = action.payload.type;
          return { ...state, editState };                              
       default:
          return state;   
    }
}