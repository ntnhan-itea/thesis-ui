export const getters = {
    getUser: (state) => {
        return state.user;
    },
    getUsers: (state) => {
        return state.users;
    },
    // getUser: () => {
    //     return localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
    // },
};
