var express = require('express');
var router = express.Router();
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort("COM4", { baudRate: 9600 })

/* GET home page. */

module.exports=(io)=>{
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  io.on("connection",(socket)=>{
    socket.on("submit_wave_generation",(data)=>{
      data=data.data;
      var dataToAvr=data.wave+data.amp+data.freq
      console.log(dataToAvr)
      port.write(`@${dataToAvr};\n`);

    })
    console.log("CONNECTED")
  })

  return router
}



