const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
                                encodeURIComponent(address) +
                                '.json?access_token=pk.eyJ1Ijoic2tnY2huIiwiYSI6ImNqdnVwNXliNTFneW8zeW54bjUzbTVua28ifQ.g1_ZvEVIUA-mBxCAnhck3Q&limit=1';

    request({
        url,
        json: true
    }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to the location services. Please try again later.', undefined);
            return;
        }

        if (body.features.length <= 0) {
            callback('Unable to find the place. Try another search.', undefined);
            return;
        }

        callback(undefined, {
            place: body.features[0].place_name,
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0]
        });
    });
};

module.exports = geocode;