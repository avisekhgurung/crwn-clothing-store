const USER_ACTION_TYPES = {
    SET_CURRENT_USER : 'SET_CURRENT_USER'
}

//instead of using useState we are using useReducer
export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default :
       return  state;
    }
}

const INITIAL_STATE = {
    currentUser: null
}