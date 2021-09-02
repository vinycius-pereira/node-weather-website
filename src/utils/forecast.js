const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=08612709c5449d8b910b632a062077f1&query=' + latitude +','+ longitude;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error){
            callback('Could not find location. Try another search', undefined)
        } else {
            const currentData = body.current;
            callback( undefined,
                'In '+ body.request.query + ' It\'s currently ' + currentData.weather_descriptions[0] + '. It\'s ' + currentData.temperature + 'C° out. It feels like ' + currentData.feelslike + 'C° degress out.')
        }
    })
}

module.exports = forecast;