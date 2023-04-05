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
  }, async (error) => {
    if (error.response.data.code === "token_not_valid" && error.config.url != JSON.parse(window.localStorage.getItem("api_endpoints"))["token_refresh"]) {
        const response = await api.post(JSON.parse(window.localStorage.getItem("api_endpoints"))["token_refresh"], {
            "refresh": window.localStorage.getItem("refresh_token")
        })
        console.log(response);
        if (response.data.access) {
            window.localStorage.setItem("access_token", response.data.access);
            var request = error.config;
            request._retry = true;
            return api.request(request);;
        }
    
    // if refresh token is expired, just log out
    } else if (error.config.url === JSON.parse(window.localStorage.getItem("api_endpoints"))["token_refresh"]) {
        window.localStorage.removeItem("access_token");
        window.location.reload();
    }
    return Promise.reject(error);
  });

export default api