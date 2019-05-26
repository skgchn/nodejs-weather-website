const request = require('request');

const weather = ({latitude, longitude}, callback) => {
    const url = 'https://api.darksky.net/forecast/d8cbbe386e501eea0e660d04bba341bd/' +
                                encodeURIComponent(latitude + ',' + longitude) +
                                '?units=si&lang=en&exclude=minutely,hourly,alerts,flags';

    request({
        url: url,
        json: true
    }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined);
            return;
        }
    
        if (body.error) {
            callback('Unable to find the place. Try another search.', undefined);
            return;
        }

        callback(undefined, {
            summary: body.daily.data[0].summary,
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature,
            precipProbability: body.currently.precipProbability
        });
    });        
}

module.exports = weather;