// Node Packages
const express = require('express');
const Mta = require('mta-gtfs');
const secrets = require('./secrets');

//Declarations
const app = express()
const mta = new Mta({
  key: secrets.MTA_API_KEY, // only needed for mta.schedule() method
  feed_id: 2                // L is on feed 2
});

//constants
const LORIMER_STATION_ID = 617 //Is this actually right? This documentation is garbage

mta.schedule(10).then(function (result) {
  console.log(result)
}).catch(function (err) {
  console.log(err);
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/lorimer', function (req, res) {
  mta.schedule(LORIMER_STATION_ID).then(function (result) {
    const lorimerTrains = result['schedule'][LORIMER_STATION_ID]
    res.send(lorimerTrains)
  }).catch(function (err) {
    console.log(err);
  });
})

app.get('/lorimer/manhattan', function (req, res) {
  mta.schedule(LORIMER_STATION_ID).then(function (result) {
    const nextTrains = result['schedule'][LORIMER_STATION_ID]['N']
    res.send(nextTrains)
  }).catch(function (err) {
    console.log(err);
  });
})

app.get('/lorimer/rockaway', function (req, res) {
  mta.schedule(LORIMER_STATION_ID).then(function (result) {
    const nextTrains = result['schedule'][LORIMER_STATION_ID]['S']
    res.send(nextTrains)
  }).catch(function (err) {
    console.log(err);
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
