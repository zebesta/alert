// Node Packages
const express = require('express');
const Mta = require('mta-gtfs');
const secrets = require('./secrets');

//Declarations
const app = express()
const mta = new Mta({
  key: secrets.MTA_API_KEY, // only needed for mta.schedule() method
  feed_id: 1                  // optional, default = 1
});

//constants
const LORIMER_STATION_ID = 617




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

/*
L10:
 { stop_id: 'L10',
   stop_code: '',
   stop_name: 'Lorimer St',
   stop_desc: '',
   stop_lat: '40.714063',
   stop_lon: '-73.950275',
   zone_id: '',
   stop_url: '',
   location_type: '1',
   parent_station: '' },
L10N:
 { stop_id: 'L10N',
   stop_code: '',
   stop_name: 'Lorimer St',
   stop_desc: '',
   stop_lat: '40.714063',
   stop_lon: '-73.950275',
   zone_id: '',
   stop_url: '',
   location_type: '0',
   parent_station: 'L10' },
L10S:
 { stop_id: 'L10S',
   stop_code: '',
   stop_name: 'Lorimer St',
   stop_desc: '',
   stop_lat: '40.714063',
   stop_lon: '-73.950275',
   zone_id: '',
   stop_url: '',
   location_type: '0',
   parent_station: 'L10' },
   */
