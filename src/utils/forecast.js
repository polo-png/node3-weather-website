const request = require("request")

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=455e265321c51311c22fc18b6b68dfc8&query=" + latitude + "," + longitude
    
    request( {url:url, json: true}, (error, response) => {
        if(error){
            callback("Low level error")
        } else if(latitude== undefined || longitude == undefined){
            callback("Coordinate error")
        } else{
            callback( undefined, "The weather in " + response.body.location.name + " is " + response.body.current.weather_descriptions)
        }
    })
    
}

module.exports = forecast