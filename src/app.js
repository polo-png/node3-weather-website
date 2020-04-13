const path = require('path')

const express = require("express")

const hbs = require('hbs')

const app = express()

const geocode = require("./utils/geocode")

const forecast = require("./utils/forecast")

const request = require("request")

//Define paths for Express config  

app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine views location
app.set("view engine", "hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render("index", {
        title: 'Weather app',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req,res) => {
    res.render("about", {
        title: 'About me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req,res) => {
    res.render("help", {
        title: 'Help!',
        message: 'We will help you!'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        res.send({
            error: "You must provide the address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error){
            return res.send({ error })
        }else if(latitude == undefined || longitude == undefined) {
            return res.send("Try something else")
        }

        forecast(longitude, latitude, (error, forecastD) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast : forecastD,
                location : location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.send("My 404 page")
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})