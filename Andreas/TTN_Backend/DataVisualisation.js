const express = require('express')
const plotly = require('plotly')//(AndreasStgm, SvqNUM9cumNHtkrE2GOt)
const path = require('path')

//-------------------------

const app = express()
const port = 3000

//-------------------------

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/visualisationPage.html'))
})
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})