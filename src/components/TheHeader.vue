<template>
    <div
        class="application-nav-bar header"
        v-if="this.getUser"
    >
        <div class="d-flex">
            <v-spacer></v-spacer>
            <div class="navbar-item">Hi {{ this.fullName }},</div>
            <div @click="logout" class="logout-btn">Log Out</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {SET_USER} from "../store/mutation-types.js";

export default {
    name: 'TheHeader',

    data() {
        return {
            fullName: 'UnKnown person',
            user: null,
        };
    },

    created() {
        // const userLocal = localStorage.getItem('userLogin');
        // this.user = userLocal ? JSON.parse(userLocal) : null;
        // this.fullName = this.user ? this.user.fullName : 'UnKnown person';
    },

    computed: {
        ...mapGetters({
            getUser: 'getUser',
        }),
    },

    watch: {
        getUser() {
            if (this.getUser && this.getUser.fullName) {
                this.fullName = this.getUser.fullName;
            } else {
                this.fullName = "Unknown person"
            }
        },

    },

    mounted() {
        if (this.getUser && this.getUser.fullName) {
            this.fullName = this.getUser.fullName;
        }
        // console.log(this.getUser);
    },

    methods: {
        handleRouting: function (e) {
            if (e.target.dataset.routing == this.$route.name) return;
            this.$router.push({ name: e.target.dataset.routing });
        },

        logout: function () {
            window.history.replaceState(null, '', '/');
            localStorage.setItem('userLogin', null);
            this.$store.commit(SET_USER, { user: null });

            if (this.$route.name != 'Login') {
                this.$router.push({ name: 'Login' });
            }
        },
        handleSwitchCalendar: function () {
            this.$root.$emit('ViewOption_Calendar');
        },
        handleSwitchPendinglist: function () {
            this.$root.$emit('ViewOption_PendingList');
        },
    },
};
</script>

<style lang="sass">

$fontSize: 0.875rem
$paddingHorizontal: 0.438rem
.application-nav-bar
  justify-content: flex-end
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important

  .navbar-item
    min-width: 200px
    display: flex
    align-items: center
    justify-content: flex-end
    line-height: 31px

.logout-btn
  display: flex
  align-items: center
  justify-content: flex-start
  min-width: 65px
  line-height: 31px
  &
    color: #0492d0
    cursor: pointer
    padding: 0 7px
</style>
