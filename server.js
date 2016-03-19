// server.js
var express        = require('express');
var app            = express();
var httpServer = require("http").createServer(app);
var five = require("johnny-five");
var Raspi = require("raspi-io");
var io=require('socket.io')(httpServer);

var port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(port);
console.log('Servidor disponible en http://localhost:' + port);
var motorA1, motorA2, motorB1,motorB2;


var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  motorA1 = new five.Led("P1-13");
  motorA2 = new five.Led("P1-15");
  motorB1 = new five.Led("P1-16");
  motorB2 = new five.Led("P1-18");
//  led.blink();
});

//Socket connection handler
io.on('connection', function (socket) {
        console.log(socket.id);

        socket.on('motorA1:on', function (data) {
           motorA1.on();
           console.log('MotorA1 ON RECEIVED');
        });

        socket.on('motorA1:off', function (data) {
            motorA1.off();
            console.log('MotorA1 OFF RECEIVED');

        });

        socket.on('motorA2:on', function (data) {
           motorA2.on();
           console.log('Motor A2 ON RECEIVED');
        });

        socket.on('motorA2:off', function (data) {
            motorA2.off();
            console.log('motorA2 OFF RECEIVED');

        });

        socket.on('motorB1:on', function (data) {
           motorB1.on();
           console.log('Motor B1 ON RECEIVED');
        });


        socket.on('motorB1:off', function (data) {
            motorB1.off();
            console.log('Motor B1 OFF RECEIVED');

        });

         socket.on('motorB2:on', function (data) {
           motorB2.on();
           console.log('Motor B2 ON RECEIVED');
        });
                  socket.on('motorB2:off', function (data) {
           motorB2.off();
            console.log('Motor B2 OFF RECEIVED');

        });


    });

console.log('Waiting for connection');




