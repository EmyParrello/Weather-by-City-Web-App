var app = new Vue({
    el: "#app",

    data: {
        cityData: "",
        cityForecast: "",
        cityName: "Barcelona",
        notFound: false,
        cityInfo: true,
    },

    methods: {
        getWeatherUrl: function () {
            return "https://api.openweathermap.org/data/2.5/weather?q=" + this.cityName + "&units=metric&APPID=51ebd5448f40437daa008011b52f8971";
            //"q=" name of the city (we can use "id=" instead to get the city by id number), "units=metric" to get temperature in Celsius, "APPID=" this number is the API Key
        },

        getForecastUrl: function () { //called in the second promise of getWeatherData function
            return "https://api.openweathermap.org/data/2.5/forecast?q=" + this.cityName + "&units=metric&APPID=51ebd5448f40437daa008011b52f8971";
        },

        getWeatherData: function (url) {
            fetch(url)
                .then(function (data) {
                    if (data.ok) {
                        return data.json()
                    }
                    throw new Error(data.statusText)
                })
                .then(function (myData) {
                    console.log(myData);
                    app.getForecastData(app.getForecastUrl()); //calling getForecastData function to get 5 Days Forecast data
                    app.cityData = myData;
                    app.cityInfo = true;
                    app.notFound = false;
                })
                .catch(function (error) {
                    console.log("Request failed: " + error.message);
                    app.notFound = true;
                    app.cityInfo = false;

                })
        },

        getForecastData: function (url) { //called in the second promise of getWeatherData function
            fetch(url)
                .then(function (data) {
                    if (data.ok) {
                        return data.json()
                    }
                    throw new Error(data.statusText)
                })
                .then(function (myData) {
                    console.log(myData);
                    app.cityForecast = myData.list;
                    app.cityInfo = true;
                    app.notFound = false;
                })
                .catch(function (error) {
                    console.log("Request failed: " + error.message);
                    app.notFound = true;
                    app.cityInfo = false;

                })
        },

        getIcon: function (icon) {
            return "http://openweathermap.org/img/w/" + icon + ".png"
        }
    },

    created() {
        this.getWeatherData(this.getWeatherUrl());
    }
})
