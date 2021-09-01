const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoLocation = require('./utils/geoLocation');
const forecast = require('./utils/forecast');

const app = express()

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vinícius Nascimento'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        social: 'instagram',
        email: 'example@gmail.com',
        title: 'About',
        name: 'Vinícius Nascimento'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        url: 'www.help.com',
        title: 'Help',
        name: 'Vinícius Nascimento'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    console.log('before request')
    if (!req.query.address) {
        console.log('condition response')
        res.send({
            error: 'You must provide an address'
        })
    } else {
        console.log('else response')
        geoLocation(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                console.log('error condition')
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
       title: 404,
        error: 'Page not found',
        name: 'Vinícius Nascimento'
    })
})

app.listen(3000, () => {
    console.log('Listening server on port 3000')
})