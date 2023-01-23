import axios from "axios";

var api = axios.create({
    baseURL: "http://localhost:8000",
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: "X-CSRFTOKEN",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

// Add a request interceptor
api.interceptors.request.use(function (config) {
    const access_token = window.localStorage.getItem("access_token");
    if (access_token) {
        config.headers["authorization"] = "Bearer " + access_token;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// Add a response interceptor
api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.data.code === "token_not_valid" && error.config.url === JSON.parse(window.localStorage.getItem("api_endpoints"))["watchlists"]) {
        api.post(JSON.parse(window.localStorage.getItem("api_endpoints"))["token_refresh"], {
            "refresh": window.localStorage.getItem("refresh_token")
        }).then(response => {
            if (response.data.access) {
                window.localStorage.setItem("access_token", response.data.access);
                var request = error.config;
                request._retry = true;
                return api(request);
            }
        });
    }
    return Promise.reject(error);
  });

export default api