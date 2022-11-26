<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md8>
                <v-form>
                    <!-- Login -->
                    <v-card class="elevation-12" v-if="this.isLoginMode">
                        <v-toolbar dark color="blue">
                            <v-toolbar-title>Login form</v-toolbar-title>
                        </v-toolbar>
                        <v-alert color="error" :value="error" icon="close">
                            The username or the password are incorrect.
                        </v-alert>
                        <v-card-text>
                            <v-text-field
                                v-model="user.username"
                                name="username"
                                label="Username"
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
                                color="grey"
                                dark
                                @click.prevent="changeToSignupMode()"
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
                    <!-- End Login -->

                    <!-- Sign up -->
                    <v-card class="elevation-12" v-if="!this.isLoginMode">
                        <v-toolbar dark color="blue">
                            <v-toolbar-title>Register form</v-toolbar-title>
                        </v-toolbar>
                        <v-alert color="error" :value="error" icon="close">
                            The username or the password are incorrect.
                        </v-alert>
                        <v-card-text>
                            <v-text-field
                                v-model="user.username"
                                name="username"
                                label="Username"
                                type="text"
                            ></v-text-field>

                            <v-text-field
                                v-model="user.password"
                                name="password"
                                label="Password"
                                type="password"
                            ></v-text-field>

                            <v-text-field
                                v-model="user.repeatPassword"
                                name="repeatPassword"
                                label="Repeat password"
                                type="password"
                            ></v-text-field>

                            <v-text-field
                                v-model="user.phoneNumber"
                                name="phoneNumber"
                                label="Phone number"
                                type="text"
                            ></v-text-field>

                            <v-text-field
                                v-model="user.fullName"
                                name="fullName"
                                label="Full Name"
                                type="text"
                            ></v-text-field>
                        </v-card-text>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <v-btn
                                rounded
                                color="grey"
                                dark
                                @click.prevent="changeToSignInMode()"
                            >
                                Login
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                rounded
                                color="primary"
                                dark
                                @click.prevent="signup()"
                            >
                                Sign up
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <!-- End sign up -->
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script scoped>
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
            repeatPassword: "",
            phoneNumber: "",
            fullName: "",
        },
        error: false,
        isLoginMode: true,
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
        handleRouting: function (e) {
            if (e.target.dataset.routing == this.$route.name) return;
            this.$router.push({ name: e.target.dataset.routing });
        },

        changeToSignupMode() {
            this.isLoginMode = false;
        },

        changeToSignInMode() {
            this.isLoginMode = true;
        },

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
                        if (routerName !== "Home") {
                            this.$router.push({ name: "Home" });

                            this.$root.$emit("handleClickMenuHeader");
                        }
                    }
                });
        },

        signup() {
            const user = this.getIsValidAccount(this.user);

            if (!user) {
                this.showDialogMessage("Invalid account to register", true);
                return;
            }

            if (user.password !== user.repeatPassword) {
                this.showDialogMessage("The repeat pass not match", true);
                return;
            }

            if (!this.validatePhoneNumber(user.phoneNumber)) {
                this.showDialogMessage("Invalid phone number", true);
                return;
            }

            this.$root.$emit("OpenSignupConfirm", user);

            this.$store.commit(SET_OPEN_DIALOG_CONFIRM_SIGN_UP, {
                isOpenDialogSignup: true,
            });
        },

        validatePhoneNumber(phoneNumber) {
            const phoneNumberPattern = "^\\d{10}$";
            if (phoneNumber.match(phoneNumberPattern)) {
                return true;
            } else {
                return false;
            }
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
