const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');
const { title } = require('process');
const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);
//Setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Savindu Harith'
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Savindu Harith',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra rhoncus venenatis. Duis suscipit ligula non imperdiet vehicula. Proin tellus diam, dapibus sed augue eget, vulputate tempor tortor. Etiam vitae est efficitur, tempus augue ac, venenatis tellus. Curabitur velit dui, lacinia eu nibh eget, accumsan iaculis lectus. Nunc at ultricies purus, vel porta urna. Nulla luctus efficitur nunc nec vestibulum. Donec malesuada dignissim orci id scelerisque. Praesent lobortis, sapien et aliquam iaculis, lectus dolor aliquet urna, at dictum nibh lectus sed nibh. Mauris ac augue risus. Etiam pretium purus ante, vitae bibendum diam porttitor sit amet. Quisque nec scelerisque mauris, sed porta arcu.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Savindu Harith',
        title: 'About'
    })
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "You must provide an address" })
    }
    geocode(req.query.address.toString(), (error, data) => {
        if (error) {
            return res.send({error:error});
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {

            if (error) { return res.send({error : error}); }
            res.send({
                forecast: forecastData.weather_descriptions[0],
                location: data.location,
                address: req.query.address,
            })
        });

    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: "You must provide an search term" })
    }
    res.send({
        products: [],
    })
});
app.get('/help/*', (req, res) => {
    res.render('errorHelp', {
        name: 'Savindu Harith',
        title: 'Help/...'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        name: 'Savindu',
        title: '404',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
