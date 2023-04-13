import { RootState } from '../../store';

export const getMessagesSelector = (state: RootState) => {
    return state.messages.messages;
};
