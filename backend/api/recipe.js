const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('List of recipes requested')
    res.status(200)
})

router.get('/:name', (req, res) => {
    const recipeName = req.body.name
    res.send(`Recipe: ${recipeName}`)
    res.status(200)
})

module.exports = router;