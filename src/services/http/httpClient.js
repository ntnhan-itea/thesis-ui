import axios from "axios"

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URI;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
