import { Root } from 'react-markdown/lib/rehype-filter';
import { RootState } from '../../store';

export const isAuthSelector = (state: RootState) => {
    return !!state.auth.data;
};

export const getUserDataSelector = (state: RootState) => {
    return state.auth.data;
};

export const getUserNameSelector = (state: RootState) => {
    return state.auth.data?.fullName;
};

export const getUserIdSelector = (state: RootState) => {
    return state.auth.data?._id;
};

export const getThemeSelector = (state: RootState) => {
    return state.auth.theme;
};
