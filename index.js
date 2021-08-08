const express = require ('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');

const app = express (); // making an express application
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Added to test socket.io communication
// Delete after test complete ////////////////////
const socket = require ('socket.io');
const { SocketAddress } = require('net');
const io = socket(server);

io.sockets.on('connection', newConnection);

// Testing nedb database
const Datastore = require('nedb');
const {response} = require('express');
const database = new Datastore('database.db');
database.loadDatabase();
//////////////////////////////////////////////////

// Suppress CORS warning.
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
    // commented for nedb testing purposes
    //res.send('Success!');
    
    // testing nedb
    database.find({}, (err, data) => {
        if (err){
            res.end;
            return;
        }
        res.json(data);
    });
});

function computeAndBroadcastDonationSumMap(socket) {
    database.find({}, {nickname: 1, donation: 1}, (err, docs) => {
        // Map of key: string, value: number;
        const donationSumMap = {};

        docs.forEach(({nickname}) => {
            donationSumMap[nickname] = 0;
        });

        docs.forEach(({nickname, donation}) => {
            donationSumMap[nickname] += donation;
        });

        console.log(`Sum of donation of each user: ${JSON.stringify(donationSumMap)}`);
        socket.broadcast.emit('donation-sum-map', donationSumMap);
    });
}

// Handle sockets for testing purposes//////
// a nice cheat sheet from stackoverflow: https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender
function newConnection(socket) {
    console.log('new connection: ' + socket.id);
    
    // data: {socketid: ..., audio: ... (Blob object)}.
    socket.on('button-clicked', data => {
        socket.broadcast.emit('button-clicked', data); // save unique socket id
        console.log('button clicked!');
    });
    
    socket.on('cat-tap-success', (socketid) => {
        socket.broadcast.to(socketid).emit('cat-tap-success');
        console.log('cat tap success!');
    });

    socket.on('cat-tap-fail', (socketid) => {
        socket.broadcast.to(socketid).emit('cat-tap-fail');
        console.log('cat tap fail');
    });
    
    socket.on('name-sent', (arg) => {
        console.log(arg);
        socket.broadcast.emit('name-sent', arg);
    });

    socket.on('upload-audio', (arg) => {
        console.log(`Received an audio file from ${arg.nickname} (Socket id: ${arg.socketid})`)
        database.insert(arg);
        computeAndBroadcastDonationSumMap(socket);
    });
    
    socket.on('number-exceeded', (arg) => {
        socket.broadcast.to(arg.id).emit('number-exceeded');
        console.log('oops! too many objects on the screen!');
    });

    socket.on('move-fish-group', (arg) => {
        socket.broadcast.emit('move-fish-group', arg);
    });

    socket.on('donation-sum-map', () => {
        computeAndBroadcastDonationSumMap(socket);
    });
}
//////////////////////////////////////////////////

server.listen(PORT, function(){
    console.log(`initiating server at ${ PORT }`);
})
