const mqtt = require('mqtt') //https://github.com/essadji/MQTT/blob/master/lora.js

const host = 'eu1.cloud.thethings.network'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'webcontroller2021@ttn',
    password: 'NNSXS.FXH2NTABN3CTNTOXPBDFSTEYU3AGLGUUPXSXC5Q.4ZFHPRENLKLANGOPNBZADZITVJDXPKYUCIO5E4E4XNA4EEMK5ENA',
    reconnectPeriod: 1000,
})

client.on('connect', () => {
    console.log(`Client connected with client ID: ${clientId}`)
    client.subscribe(['v3/+/devices/+/up'], () => {
        console.log(`Subscribed to topic: v3/+/devices/+/up`)
    })
})
client.on('message', (topic, payload) => {
    const jsonPayload = JSON.parse(payload)
    console.log('Message received by client on topic: ', topic, '\nPayload: ', jsonPayload.uplink_message.decoded_payload)
})