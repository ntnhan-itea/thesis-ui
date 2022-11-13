import axios from "axios"

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URI;
// axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';
