const express = require('express') //used for hosting the website
const path = require('path') //used for sending the html

const fastcsv = require('fast-csv') //used for parsing the csv data
const fs = require('fs')

const plotly = require('plotly')('AndreasStgm', 'SvqNUM9cumNHtkrE2GOt') //used for plotting the data

//----------Express Front-End----------

const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/visualisationPage.html'))
})
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

//----------Parsing CSV----------

const dataFile = './data.csv'

const watch = fs.watchFile(dataFile, () => {
    console.log('data.csv was changed')

    const rs = fs.createReadStream(dataFile);
    fastcsv.parseStream(rs, {
        ignoreEmpty: true,
        discardUnmappedColumns: true,
        headers: true
    }).on('error', error => console.error(error))
        .on('data', readRow => console.log(readRow))
        .on('end', rowCount => console.log(`Parsed ${rowCount} rows`))
})

//----------Plotly----------
var traceTemp = {
    x: ["2013-10-04 22:23:00", "2013-11-04 22:23:00", "2013-12-04 22:23:00"],
    y: [40, 30, 50],
    name: 'Temperature (°C)',
    type: 'scatter'
}
var traceRelHumid = {
    x: ["2013-10-04 22:23:00", "2013-11-04 22:23:00", "2013-12-04 22:23:00"],
    y: [50, 100, 150],
    name: 'Relative Humidity (%)',
    yaxis: 'y2',
    type: 'scatter'
}
var data = [traceTemp, traceRelHumid]

var layout = {
    title: 'Beehive Data',
    yaxis: { title: 'Temperature (°C)' },
    yaxis2: {
        title: 'Relative Humidity (%)',
        overlaying: 'y',
        side: 'right'
    }
}

var graphtOptions = { layout: layout, filename: 'visualisation_beehive', fileopt: 'overwrite' }
plotly.plot(data, graphtOptions, function (err, msg) {
    console.log(msg)
})

