const path = require('path');

const express = require('express');
const hbs = require('hbs'); // object needed for setting patials location
const request = require('request');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // default process.cwd() + '/views
const partialsPath = path.join(__dirname, '../templates/partials');
const utilsPath= path.join(__dirname, '../utils');

const geocode = require(path.join(utilsPath, '/geocode'));
const weather = require(path.join(utilsPath, '/weather'));

const app = express();

const builtBy = 'Sunil Girdhar';

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // telling express which templating engine to use.
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
// Serves similar to Apache document root directory when views engine was not used
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    //res.send('<h1>Weather!</h1>');
    res.render('index', {
        title: 'Weather',
        builtBy
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        builtBy,
        creatorPictureUrl: '/images/person1.png',
        creatorPictureAltText: 'App creator\'s picture'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        builtBy,
        helpText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.place) {
        return res.send({
            error: 'No place specified'
        });
    }

    geocode(req.query.place, (error, {latitude, longitude, place} = {}) => {
        if (error) {
            return res.send({error});
        }
    
        weather({
            latitude,
            longitude
        }, (error, weatherData) => {
            if (error) {
                return res.send({error});
            }
        
            weatherData.place = place;
            res.send(weatherData);   
        });
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Error',
        builtBy,
        notFoundMsg: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Error',
        builtBy,
        notFoundMsg: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});