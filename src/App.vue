<template>
    <v-app>
        <v-main>
            <div scoped class="application-container">
                <the-header />
                <router-view />
            </div>
        </v-main>
    </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";

export default {
    name: "App",
    components: { TheHeader },

    data: () => ({
        //
    }),
};
</script>

<style scoped lang="css">
.application-container {
    width: 100%;
    min-height: calc(100vh - 61px);
    position: relative;

}
</style>
