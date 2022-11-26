<template>
    <div>
        <v-container fill-height class="map-box-container">
            <div id="mapContainer" class="basemap"></div>
        </v-container>
        <thesis-filter @renderMapOfTraiNuoi="renderMapOfTraiNuoi" />
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapGetters } from "vuex";
import ThesisFilter from "./ThesisFilter.vue";
import {
    PLUS_ONE_COUNT_SHOW_LOADING_ICON,
    MINUS_ONE_COUNT_SHOW_LOADING_ICON,
    SET_ZERO_SHOW_LOADING_ICON,
} from "../store/mutation-types";

export default {
    name: "Mapbox",

    components: {
        ThesisFilter,
    },

    data() {
        return {
            accessToken:
                "pk.eyJ1IjoibnRuaGFuIiwiYSI6ImNsYXAyeWQyMjBvZGgzbm9heHU4cWYxdmkifQ.IxgCYC6GbP5CvHcOqDWyng",
            coordinates: [],
            coordinates2: [],
            mapPolygons: [],
            mapBox: null,
            latestCenter: [105.76907878712353, 10.028333731381522],
            count: 0,
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
        this.renderMapboxPolygon();

        // this.plusOneToShowIconLoading();
        // setTimeout(() => {
        //     this.minusOneToShowIconLoading();
        // }, "1000");
    },

    watch: {
        getAoNuoi() {
            // if (this.getAoNuoi) {
            //     const coordinates = this.getAoNuoi.listOfPoint.map(
            //         (e) => e.coordinates,
            //     );
            //     this.mapPolygons.push(coordinates);
            //     this.renderMapboxPolygon();
            // }
        },

        getVungNuoi() {
            // if (this.getVungNuoi) {
            //     const coordinates = this.getVungNuoi.listOfPoint.map(
            //         (e) => e.coordinates,
            //     );
            //     this.mapPolygons.push(coordinates);
            //     this.renderMapboxPolygon();
            // }
        },

        getListTraiNuois() {
            // if(this.getListTraiNuois && this.getListTraiNuois.length > 0) {
            // }
        },
    },

    computed: {
        ...mapGetters({
            getUser: "getUser",
            isOpenDialogSignup: "isOpenDialogSignup",
            getAoNuoi: "getAoNuoi",
            getVungNuoi: "getVungNuoi",
            getListTraiNuois: "getListTraiNuois",
        }),
    },

    methods: {
        renderMapboxPolygon() {
            mapboxgl.accessToken = this.accessToken;
            this.latestCenter = this.mapPolygons?.[0]?.[0] || this.latestCenter;
            const center = this.mapPolygons?.[0]?.[0] || this.latestCenter;

            const coordinates = this.mapPolygons;

            const map = new mapboxgl.Map({
                container: "mapContainer",
                style: "mapbox://styles/mapbox/streets-v12",
                center: center,
                zoom: 12,
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
                            coordinates: coordinates,
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

        renderMapOfTraiNuoi(traiNuoi) {
            if (!traiNuoi) {
                return;
            }

            this.mapPolygons = [];
            const vungNuoiPoints = traiNuoi.vungNuois
                .filter((e) => e?.listOfPoint)
                .map((e) => e.listOfPoint.map((e) => e.coordinates));

            this.mapPolygons = [...vungNuoiPoints];

            const aoNuoiPoints = traiNuoi.vungNuois
                .filter((vungNuoi) => vungNuoi?.aoNuois)
                .map((vungNuoi) =>
                    vungNuoi.aoNuois
                        .filter((aoNuoi) => aoNuoi?.listOfPoint)
                        .map((aoNuoi) =>
                            aoNuoi.listOfPoint.map(
                                (point) => point.coordinates,
                            ),
                        ),
                );

            aoNuoiPoints.forEach(
                (e) => (this.mapPolygons = [...this.mapPolygons, ...e]),
            );

            this.renderMapboxPolygon();
        },

        // squareOfArea(coordinates) {
        //     const linestring = {
        //         type: "Feature",
        //         geometry: {
        //             type: "LineString",
        //             coordinates: coordinates,
        //         },
        //     };
        //     const square = turf.length(linestring);
        //     console.log("SIZE:", turf.length(linestring));
        //     return square;
        // },
    },
};
</script>

<style lang="scss" scoped>
.map-box-container {
    margin-left: 0%;
}

.basemap {
    width: 100%;
    height: 100vh;
}
</style>
