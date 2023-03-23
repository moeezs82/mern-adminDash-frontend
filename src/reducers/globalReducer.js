import { DARK_MODE, LIGHT_MODE } from "constants/globalConstants";

export const modeReducer = ( state={mode: 'dark'}, action ) => {
    switch (action.type) {
        case LIGHT_MODE:
            return{
                mode: 'light'
            }
        case DARK_MODE:
            return{
                mode: 'dark'
            }
    
        default:
            return state;
    }
}

export const userIdReducer = (state={userId: '63701cc1f03239b7f700000e'}, action) => {
    return state
}