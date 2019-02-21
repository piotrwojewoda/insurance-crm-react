import {REMOVE_MESSAGE, SHOW_MESSAGE} from "../actions/constants";

export const growlmessages = (state = {messages: []}, action) => {
    switch (action.type) {
        case SHOW_MESSAGE:
            let messages = [];
            messages.push(action.message);
            return {messages: messages};
        case REMOVE_MESSAGE:
            return { messages: []};
        default:
            return state;
    }
};
