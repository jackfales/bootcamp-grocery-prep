const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static(__dirname + "/../public"))

const recipeEndpoints = require('./api/recipe.js')

app.get('/', (req, res) => {
    res.send('Success')
    res.status(200)
})

app.use('/api/recipe/', recipeEndpoints)

app.get('/api/rating', (req, res) => {
    const rating = req.body.rating
    const id = req.body.id
    res.send(`${rating} star rating for recipe ${id}`)
    res.status(200)
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})