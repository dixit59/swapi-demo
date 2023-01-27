import { UPDATE_LOAD_USER, LOGOUT_USER } from '../constants/ActionTypes';

const INIT_STATE = {
    loadUser: false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
    case UPDATE_LOAD_USER: {
        return {
            ...state,
            loadUser: action.payload,
        };
    }
    case LOGOUT_USER: {
        return INIT_STATE;
    }
    default:
        return state;
    }
};
