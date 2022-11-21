<template>
    <v-container fill-height>
        <div id="mapContainer" class="basemap"></div>
    </v-container>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapGetters } from "vuex";
import {
    PLUS_ONE_COUNT_SHOW_LOADING_ICON,
    MINUS_ONE_COUNT_SHOW_LOADING_ICON,
    SET_ZERO_SHOW_LOADING_ICON,
} from "../store/mutation-types";

export default {
    name: "Mapbox",
    data() {
        return {
            accessToken:
                "pk.eyJ1IjoibnRuaGFuIiwiYSI6ImNsYXAyeWQyMjBvZGgzbm9heHU4cWYxdmkifQ.IxgCYC6GbP5CvHcOqDWyng",
            coordinates: [],
            coordinates2: [],
            mapPolygons: [],
            mapBox: null,
        };
    },

    created() {
        // mapboxgl.accessToken = this.accessToken;
        // this.mapBox = new mapboxgl.Map({
        //     container: "mapContainer",
        //     style: "mapbox://styles/mapbox/streets-v12",
        //     center: center,
        //     zoom: 14,
        // });

    },

    mounted() {
        this.$store.dispatch("getAoNuoiByIdAsync", {
            aoNuoiId: 1,
            user: this.getUser,
        });

        this.$store.dispatch("getVungNuoiByIdAsync", {
            vungNuoiId: 1,
            user: this.getUser,
        });

        this.plusOneToShowIconLoading();
        setTimeout(() => {
            this.minusOneToShowIconLoading()
        }, "5000");
    },

    watch: {
        getAoNuoi() {
            try {
                if (this.getAoNuoi) {
                    const coordinates = this.getAoNuoi.listOfPoint.map(
                        (e) => e.coordinates,
                    );
                    this.mapPolygons.push(coordinates);
                    this.renderMapboxPolygon();
                }
            } finally {
                // setTimeout( this.minusOneToShowIconLoading(), 5000);
                // this.minusOneToShowIconLoading();
            }
        },

        getVungNuoi() {
            if (this.getVungNuoi) {
                const coordinates = this.getVungNuoi.listOfPoint.map(
                    (e) => e.coordinates,
                );
                this.mapPolygons.push(coordinates);
                this.renderMapboxPolygon();
            }
        },
    },

    computed: {
        ...mapGetters({
            getUser: "getUser",
            isOpenDialogSignup: "isOpenDialogSignup",
            getAoNuoi: "getAoNuoi",
            getVungNuoi: "getVungNuoi",
        }),
    },

    methods: {
        renderMapboxPolygon() {
            mapboxgl.accessToken = this.accessToken;
            const map = new mapboxgl.Map({
                container: "mapContainer",
                style: "mapbox://styles/mapbox/streets-v12",
                center: this.mapPolygons?.[0]?.[0] || [0, 0],
                zoom: 14,
            });

            map.on("load", () => {
                // Add a data source containing GeoJSON data.
                map.addSource("maine", {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        geometry: {
                            // type: "Polyline",
                            type: "Polygon",
                            // These coordinates outline Maine.
                            coordinates: this.mapPolygons,
                            // coordinates: [this.coordinates,this.coordinates2],
                        },
                    },
                });

                // Add a new layer to visualize the polygon.
                map.addLayer({
                    id: "maine",
                    type: "fill",
                    source: "maine", // reference the data source
                    layout: {},
                    paint: {
                        "fill-color": "#0080ff", // blue color fill
                        "fill-opacity": 0.5,
                    },
                });
                // Add a black outline around the polygon.
                map.addLayer({
                    id: "outline",
                    type: "line",
                    source: "maine",
                    layout: {},
                    paint: {
                        "line-color": "#000",
                        "line-width": 3,
                    },
                });
            });
        },

        plusOneToShowIconLoading() {
            this.$store.commit(PLUS_ONE_COUNT_SHOW_LOADING_ICON);
            console.log("plusOneToShowIconLoading called");
        },

        minusOneToShowIconLoading() {
            this.$store.commit(MINUS_ONE_COUNT_SHOW_LOADING_ICON);
            console.log("minusOneToShowIconLoading called");
        },

        setZeroToHideIconLoading() {
            this.$store.commit(SET_ZERO_SHOW_LOADING_ICON);
        },
    },
};
</script>

<style lang="scss" scoped>
.basemap {
    width: 100%;
    height: 100vh;
}
</style>
