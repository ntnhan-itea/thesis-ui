<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md8>
                <v-form>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="blue">
                            <v-toolbar-title>Login form</v-toolbar-title>
                        </v-toolbar>
                        <v-alert color="error" :value="error" icon="close">
                            The username or the password are incorrect.
                        </v-alert>
                        <v-card-text>
                            <v-text-field
                                v-model="user.username"
                                name="login"
                                label="Login"
                                type="text"
                            ></v-text-field>

                            <v-text-field
                                v-model="user.password"
                                name="password"
                                label="Password"
                                type="password"
                            ></v-text-field>
                        </v-card-text>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <v-btn
                                rounded
                                color="indigo"
                                dark
                                @click.prevent="signup()"
                            >
                                Sign up
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                rounded
                                color="primary"
                                dark
                                @click.prevent="login()"
                            >
                                Login
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import {
    SET_OPEN_DIALOG_CONFIRM_SIGN_UP,
    SET_DIALOG_MESSAGE,
} from "../store/mutation-types";

export default {
    name: "Login",

    data: () => ({
        user: {
            username: "",
            password: "",
        },
        error: false,
    }),

    computed: {
        ...mapGetters({
            getUser: "getUser",
            isOpenDialogSignup: "isOpenDialogSignup",
        }),
    },

    created() {},

    mounted() {
        // const routerName = this.$router?.name;
        // console.log({ routerName });
        // if (
        //     this.getUser &&
        //     (!routerName || (routerName !== 'Home' && routerName === 'Login'))
        // ) {
        //     this.$router.push({ name: 'Home' });
        // }
    },

    watch: {
        getUser() {
            // if (this.getUser && this.getUser.username) {
            //     if (this.$router.name === 'Login') {
            //         this.$router.push({ name: 'Home' });
            //     }
            // }
        },
    },

    methods: {
        login() {
            // console.log('click log-in button');
            // console.log('username: ', this.user.username);
            // console.log('password: ', this.user.password);

            this.$store
                .dispatch("loginAsync", {
                    user: this.user,
                })
                .then(() => {
                    const routerName = this.$router?.name;
                    if (this.getUser) {
                        if (routerName !== "Home")
                            this.$router.push({ name: "Home" });
                    }
                });
        },

        signup() {
            const user = this.getIsValidAccount(this.user);

            if (!user) {
                this.showDialogMessage("Invalid account to register", true);
                return;
            }

            this.$root.$emit("OpenSignupConfirm", user);

            this.$store.commit(SET_OPEN_DIALOG_CONFIRM_SIGN_UP, {
                isOpenDialogSignup: true,
            });
        },

        parseToObject(object) {
            try {
                return JSON.parse(JSON.stringify(object));
            } catch (error) {
                return null;
            }
        },

        getIsValidAccount(account) {
            const user = this.parseToObject(account);
            const isValidUsername = this.isNotBlankString(user.username);
            const isValidPassword = this.isNotBlankString(user.password);
            const isValidAccount = user && isValidUsername && isValidPassword;
            return isValidAccount ? user : null;
        },

        showDialogMessage(message, isError) {
            const msg = message || "Unknown error message";

            const dialogMessage = {
                message: msg,
                isError: isError,
            };

            this.$store.commit(SET_DIALOG_MESSAGE, { dialogMessage });
        },

        isNotBlankString(valueString) {
            try {
                return valueString && valueString.trim() !== "";
            } catch (error) {
                return false;
            }
        },
    },
};
</script>
