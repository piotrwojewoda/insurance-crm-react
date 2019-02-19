import {SHOW_MESSAGE} from "../actions/constants";

export const growlmessages = (state = {messages: []}, action) => {
    switch (action.type) {
        case SHOW_MESSAGE:
            console.log('message-reducer action', action);
            let messages = [];
            messages.push(action.message);
            return {messages: messages};
        default:
            return state;
    }
};
