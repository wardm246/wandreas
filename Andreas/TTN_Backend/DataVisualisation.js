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

//----------Plotly test----------
var traceTemp = {
    x: ["2013-10-04 22:23:00", "2013-11-04 22:23:00", "2013-12-04 22:23:00"],
    y: [40, 50, 60],
    name: 'Temperature (°C)',
    type: 'scatter'
}
var traceRelHumid = {
    x: ["2013-10-04 22:23:00", "2013-11-04 22:23:00", "2013-12-04 22:23:00"],
    y: [70, 80, 90],
    name: 'Relative Humidity (%)',
    yaxis: 'y2',
    type: 'scatter'
}
var data = [traceTemp, traceRelHumid]

var layout = {
    title: 'Beehive Data',
    yaxis: { title: 'yAxis Title' },
    yaxis2: {
        title: 'yAxis2 Title',
        titlefont: { color: 'rgb(255, 25, 25)' },
        tickfont: { color: 'rgb(255, 25, 25)' },
        overlaying: 'y',
        side: 'right'
    }
}

var graphtOptions = { layout: layout, filename: 'visualisation_beehive', fileopt: 'overwrite' }
plotly.plot(data, graphtOptions, function (err, msg) {
    console.error(err)
    console.log(msg)
})

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