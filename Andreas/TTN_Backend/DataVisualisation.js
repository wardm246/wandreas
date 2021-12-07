const express = require('express') //used for hosting the website

const path = require('path') //used for sending the html

const fastcsv = require('fast-csv') //used for parsing the csv data
const fs = require('fs')

const plotly = require('plotly')('AndreasStgm', 'SvqNUM9cumNHtkrE2GOt') //used for plotting the data

//-------------------------

const app = express()
const port = 3000

const dataFile = './data.csv'
const parse = fastcsv.parse(
    {
        ignoreEmpty: true,
        discardUnmappedColumns: true,
        headers: true
    })
    .on('error', error => console.error(error))
    .on('data', readRow => console.log(readRow))
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`))

//-------------------------
const watch = fs.watchFile(dataFile, function () {
    console.log('data.csv was changed')
    const rs = fs.createReadStream(dataFile, { autoClose: true })
        .pipe(parse)
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/visualisationPage.html'))
})
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})