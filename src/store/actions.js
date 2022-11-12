import {
    getAllEntries,
    login,
    getAllUsers,
} from '../services/registrationService';
import { SET_USER, SET_ALL_USERS } from './mutation-types';

function showErrorMessage(error) {
    console.error({ error });
    const message = error?.response?.data?.message || 'Unknown error message';
    console.log({ message });
    alert(message);
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
            const user = response.data;
            const userJson = JSON.stringify(user);
            commit(SET_USER, { user: JSON.parse(userJson) });
            localStorage.setItem('userLogin', userJson);
        } catch (error) {
            showErrorMessage(error);
        }
    },

    async getAllUsersAsync({ commit }) {
        try {
            const response = await getAllUsers();
            const users = response.data;
            commit(SET_ALL_USERS, { users: users });
        } catch (error) {
            showErrorMessage(error);
            // console.error({ error });
            // const message =
            //     error?.response?.data?.message || 'Unknown error message';
            // console.log({ message });
            // alert(message);
        }
    },
};
