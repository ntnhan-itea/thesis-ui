<template>
    <div class="application-nav-bar header" v-show="this.user">
        <v-tabs align-with-title>
            <v-tab
                ref="btnHome"
                @click="(e) => handleRouting(e)"
                data-routing="Home"
                style="text-transform: capitalize !important"
                >Trang chủ</v-tab
            >
            <v-tab
                ref="btnMapbox"
                @click="(e) => handleRouting(e)"
                data-routing="Mapbox"
                style="text-transform: capitalize !important"
                >Bản đồ</v-tab
            >
        </v-tabs>
        <div class="d-flex">
            <v-spacer></v-spacer>
            <div class="navbar-item">Hi {{ this.fullName }},</div>
            <div @click="logout" class="logout-btn">Log Out</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_USER } from "../store/mutation-types.js";

export default {
    name: "TheHeader",

    data() {
        return {
            fullName: "UnKnown person",
            user: null,
        };
    },

    computed: {
        ...mapGetters({
            getUser: "getUser",
        }),
    },

    created() {
        // const userLocal = localStorage.getItem('userLogin');
        // this.user = userLocal ? JSON.parse(userLocal) : null;
        // this.fullName = this.user ? this.user.fullName : 'UnKnown person';
    },

    watch: {
        getUser() {
            this.user = this.getUser;
            if (this.user && this.user.fullName) {
                this.fullName = this.user.fullName;
            } else {
                this.fullName = "Unknown person";
            }
        },
    },

    mounted() {
        this.user = this.getUser;
        if (this.user && this.user.fullName) {
            this.fullName = this.user.fullName;
        }

        this.handleClickMenuHeader();

        this.$root.$on("handleClickMenuHeader", () => {
            this.handleClickMenuHeader();
        });
    },

    methods: {
        handleRouting: function (e) {
            if (e.target.dataset.routing == this.$route.name) return;
            this.$router.push({ name: e.target.dataset.routing });
        },

        handleClickMenuHeader() {
            // if (this.user) {
            if (this.$route.name == "Home") {
                this.$refs.btnHome.$el.click();
            } else if (this.$route.name == "Mapbox") {
                this.$refs.btnMapbox.$el.click();
            }
            // }
        },

        logout: function () {
            window.history.replaceState(null, "", "/");
            localStorage.setItem("userLogin", null);
            this.$store.commit(SET_USER, { user: null });
            this.user = null;

            if (this.$route.name !== "Login") {
                this.$router.push({ name: "Login" });
            }
        },
    },
};
</script>

<style lang="sass">

$fontSize: 0.875rem
$paddingHorizontal: 0.438rem
.application-nav-bar
    display: flex
    justify-content: flex-end
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important
    .navbar-item
        min-width: 200px
        display: flex
        align-items: center
        justify-content: flex-end
        line-height: 31px

.logout-btn
    display: flex !important
    align-items: center
    justify-content: flex-start
    min-width: 100px
    line-height: 31px
    &
        color: #0492d0
        cursor: pointer
        padding: 0 7px
</style>
