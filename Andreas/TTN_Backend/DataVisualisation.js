const express = require('express') //used for hosting the website
const path = require('path') //used for sending the html

const { execFile } = require('child_process')

const fastcsv = require('fast-csv') //used for parsing the csv data
const fs = require('fs')

const plotly = require('plotly')('AndreasStgm', 'SvqNUM9cumNHtkrE2GOt') //used for plotting the data

//----------MQTT Downlink----------

const child = execFile('node', ['./TtnMQTTDownlink.js'], (error, stdout, stderr) => {
    if (error) {
        throw error
    }
    console.log(stdout)
})

//----------Express/SocketIO Front-End----------

const port = 3000
const app = express()

const httpServer = require("http").createServer(app);
const options = { /* ... */ }
const io = require("socket.io")(httpServer, options)

io.on('connection', socket => {
    console.log('SocketIO client connected')
    socket.on('disconnect', () => {
        console.log('SocketIO client disconnected')
    })
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/visualisationPage.html'))
})
httpServer.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

//----------Parsing CSV----------

const dataFile = './data.csv'

const watch = fs.watchFile(dataFile, () => {
    console.log('data.csv was changed')
    timestampArray.length = 0 // Reset the length of the array to clear it
    temperatureArray.length = 0
    relHumidArray.length = 0

    const rs = fs.createReadStream(dataFile)
    fastcsv.parseStream(rs, {
        ignoreEmpty: true,
        discardUnmappedColumns: true,
        headers: true
    }).on('error', error => console.error(error))
        .on('data', readRow => {
            console.log(readRow)
            timestampArray.push(readRow.timestamp)
            temperatureArray.push(readRow.temperature)
            relHumidArray.push(readRow.relative_humidity)
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount} rows`)
            plotly.plot(data, graphtOptions, function (err, msg) {
                console.log(msg)
            })
            io.emit('reading change')
        })
})

//----------Plotly----------

const timestampArray = []
const temperatureArray = []
const relHumidArray = []

var traceTemp = {
    x: timestampArray,
    y: temperatureArray,
    name: 'Temperature (°C)',
    type: 'scatter'
}
var traceRelHumid = {
    x: timestampArray,
    y: relHumidArray,
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