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
                                v-model="username"
                                name="login"
                                label="Login"
                                type="text"
                            ></v-text-field>

                            <v-text-field
                                v-model="password"
                                name="password"
                                label="Password"
                                type="password"
                            ></v-text-field>
                        </v-card-text>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <v-btn to="/signup" rounded color="indigo" dark
                                >Sign up</v-btn
                            >
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
import { mapGetters } from 'vuex';

export default {
    name: 'Login',
    data: () => ({
        username: '',
        password: '',
        error: false,
    }),
    mounted() {},

    computed: {
        ...mapGetters({
            getUser: 'getUser',
        }),
    },
    watch: {
        getUser() {
            if (this.getUser && this.getUser.username) {
                // if (this.$router.name == 'Login') {
                this.$router.push({ name: 'Home' });
                // }
            }
        },
    },

    methods: {
        login() {
            console.log('click log-in button');
            console.log('username: ', this.username);
            console.log('password: ', this.password);

            this.$store.dispatch('loginAsync', {
                user: {
                    username: this.username,
                    password: this.password,
                },
            });
            // if (this.$router.name == 'Login') {
                // this.$router.push({ name: 'Home' });
            // }
        },
    },
};
</script>
