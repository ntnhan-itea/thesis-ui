import {
    getAllEntries,
    login,
    getAllUsers,
} from '../services/ThesisService';

import { SET_USER, SET_ALL_USERS, SET_DIALOG_MESSAGE } from './mutation-types';

function showErrorMessage(commit, error) {
    console.error({ error });
    const message = error?.response?.data?.message || 'Unknown error message';
    console.error({ message });
  
    showDialogMessage(commit, message, true);
}

function showDialogMessage(commit, message, isError) {
    const dialogMessage = {
        message: message,
        isError: isError,
    };

    commit(SET_DIALOG_MESSAGE, { dialogMessage });
}

export const actions = {
    async getAllEntriesAsync() {
        try {
            const responseAllEntities = await getAllEntries();

            console.table({ responseAllEntities });
        } catch (error) {
            showErrorMessage(error);
        }
    },

    async loginAsync({ commit }, payload) {
        try {
            const response = await login(payload.user);
            const userData = response?.data;
            const userJson = JSON.stringify(userData);
            const user = JSON.parse(userJson);

            commit(SET_USER, { user: user });
            localStorage.setItem('userLogin', userJson);
            showDialogMessage(commit, "Log in successfully", false);
        } catch (error) {
            showErrorMessage(commit, error);
        }
    },

    async getAllUsersAsync({ commit }) {
        try {
            const response = await getAllUsers();
            const users = response.data;
            commit(SET_ALL_USERS, { users: users });
        } catch (error) {
            showErrorMessage(commit, error);
            // console.error({ error });
            // const message =
            //     error?.response?.data?.message || 'Unknown error message';
            // console.log({ message });
            // alert(message);
        }
    },
};
