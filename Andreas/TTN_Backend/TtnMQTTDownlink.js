const mqtt = require('mqtt') // https://www.npmjs.com/package/mqtt
const fastcsv = require('fast-csv') // https://www.npmjs.com/package/fast-csv
const fs = require('fs') // https://fedingo.com/how-to-export-to-csv-in-nodejs/

//-------------------------

const host = 'eu1.cloud.thethings.network'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true, //true, set to false to receive QoS 1 and 2 messages while offline
    connectTimeout: 4000, // milliseconds, time to wait before a CONNACK is received
    username: 'webcontroller2021@ttn',
    password: 'NNSXS.FXH2NTABN3CTNTOXPBDFSTEYU3AGLGUUPXSXC5Q.4ZFHPRENLKLANGOPNBZADZITVJDXPKYUCIO5E4E4XNA4EEMK5ENA',
    reconnectPeriod: 1000, //  interval between two reconnections. Disable auto reconnect by setting to 0.
})

//-------------------------

client.on('connect', () => {
    console.log(`Client connected with client ID: ${clientId}`)
    client.subscribe(['v3/+/devices/+/up'], () => {
        console.log(`Subscribed to topic: v3/+/devices/+/up`)
    })
})
client.on('message', (topic, payload) => {
    let date_obj = new Date()
    let hours = ('0' + date_obj.getHours()).slice(-2)
    let minutes = ('0' + date_obj.getMinutes()).slice(-2)
    let seconds = ('0' + date_obj.getSeconds()).slice(-2)

    const jsonPayload = JSON.parse(payload)
    const jsonData = [
        {
            timestamp: hours + ':' + minutes + ':' + seconds,
            temperature: jsonPayload.uplink_message.decoded_payload.Temp,
            relative_humidity: jsonPayload.uplink_message.decoded_payload.RelHumid
        }]
    console.log('Message received by client on topic: ', topic,
        '\nPayload: ', jsonPayload.uplink_message.decoded_payload)

    const ws = fs.createWriteStream('data.csv', { flags: 'a' })
    fastcsv.write(jsonData, {
        headers: fs.existsSync('data.csv') ? false : true, includeEndRowDelimiter: true
    }).on('finish', function () {
        console.log('Write to CSV successful')
    }).pipe(ws)
})