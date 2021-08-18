const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express(); // making an express application
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Added to test socket.io communication
// Delete after test complete ////////////////////
const socket = require('socket.io');
const io = socket(server);

io.sockets.on('connection', newConnection);

// Testing nedb database
const Datastore = require('nedb');

const viewerVoiceDatabase = new Datastore('db/viewer-voice-database.db');
viewerVoiceDatabase.loadDatabase();

const viewerPointDatabase = new Datastore('db/viewer-point-database.db');
viewerPointDatabase.loadDatabase();

const chatDatabase = new Datastore('db/chat-database.db');
chatDatabase.loadDatabase();

const chatPointDatabase = new Datastore('db/chat-point-database.db');
chatPointDatabase.loadDatabase();
//////////////////////////////////////////////////

// Suppress CORS warning.
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/db', express.static(path.join(__dirname, 'db')));

function computeAndEmitDonationSumMap(socket) {
    viewerVoiceDatabase.find({}, { nickname: 1, donation: 1 }, (err, docs) => {
        // Map of key: string, value: number;
        const donationSumMap = {};

        docs.forEach(({ nickname }) => {
            donationSumMap[nickname] = 0;
        });

        docs.forEach(({ nickname, donation }) => {
            donationSumMap[nickname] += donation;
        });

        console.log(`Sum of donation of each user: ${JSON.stringify(donationSumMap)}`);
        io.emit('donation-sum-map', donationSumMap);
    });
}

let audioFileIndex = 0;
const pointUpdateDataQueue = [];

// Handle sockets for testing purposes//////
// a nice cheat sheet from stackoverflow: https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender
function newConnection(socket) {
    console.log('new connection: ' + socket.id);
    // ===================================================
    // For cat and viewer ui.

    // data: {socketid: ..., audio: ... (Blob object)}.
    socket.on('button-clicked', data => {
        const { nickname, audio, donation, socketid, timestamp, timestampString } = data;
        const audioFileName = `${audioFileIndex}-${timestamp}-${nickname}-${timestampString}.mp3`;
        audioFileIndex++;

        fs.writeFileSync(`public/cat/uploads/${audioFileName}`, Buffer.from(audio));

        const dataToCat = {
            nickname,
            donation,
            socketid,
            timestamp,
            timestampString,
            audioFileName
        };

        socket.broadcast.emit('button-clicked', dataToCat); // save unique socket id
        console.log('button clicked!');
    });

    socket.on('drawType', (arg) => {
        socket.broadcast.emit('drawType', arg);
        console.log("draw type: " + arg);
    })

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
        viewerVoiceDatabase.insert(arg);
        computeAndEmitDonationSumMap(socket);
    });

    socket.on('number-exceeded', (arg) => {
        socket.broadcast.to(arg.socketid).emit('number-exceeded');
        console.log('oops! too many objects on the screen!');
    });

    socket.on('move-fish-group', (arg) => {
        socket.broadcast.emit('move-fish-group', arg);
    });

    socket.on('donation-sum-map', () => {
        computeAndEmitDonationSumMap(socket);
    });

    const maxPoint = 500000;

    // Used when initializing the amount of remaining points of viewer ui.
    socket.on('init-point', data => {
        const { socketid, nickname } = data;

        viewerPointDatabase.findOne({ nickname: nickname }, { nickname: 1, point: 1 }, (err, doc) => {
            let initialPoint = 0;

            if (doc === null) {
                initialPoint = maxPoint;
                viewerPointDatabase.insert({ nickname: nickname, point: initialPoint });
            } else {
                initialPoint = doc.point;
            }

            io.emit('apply-point', { nickname: nickname, point: initialPoint });
        });
    });

    function processPointUpdate(data) {
        const { socketid, nickname, pointDiff } = data;

        viewerPointDatabase.findOne({ nickname: nickname }, { nickname: 1, point: 1 }, (err, doc) => {
            let newPoint = 0;

            if (doc === null) {
                newPoint = maxPoint;
                viewerPointDatabase.insert({ nickname: nickname, point: newPoint });
            } else {
                newPoint = doc.point + pointDiff;
                viewerPointDatabase.update({ nickname: nickname }, { nickname: nickname, point: newPoint }, {});
            }

            io.emit('apply-point', { nickname: nickname, point: newPoint });
        });
    }

    function processRemainingPointUpdates() {
        while (pointUpdateDataQueue.length > 0) {
            const data = pointUpdateDataQueue.shift();
            processPointUpdate(data);
        }
    }

    // For storing the amount of remaining points of each user to DB.
    socket.on('update-point', data => {
        pointUpdateDataQueue.push(data);
        processRemainingPointUpdates();
    });

    // ===================================================
    // For fake YouTube chat.

    // arg: {profileColor: string, nickname: string, content: string, donation: number, timestamp: number, type: string}.
    socket.on('upload-chat', chat => {
        console.log(`New chat: ${chat.content} by ${chat.nickname}`);
        chatDatabase.insert(chat);
        io.emit('upload-chat', chat);
    });

    const maxChatPoint = 500000;

    // Used when initializing the amount of remaining points of viewer ui.
    socket.on('init-chat-point', data => {
        const { socketid, nickname } = data;

        chatPointDatabase.findOne({ nickname: nickname }, { nickname: 1, point: 1 }, (err, doc) => {
            let initialPoint = 0;

            if (doc === null) {
                initialPoint = maxChatPoint;
                chatPointDatabase.insert({ nickname: nickname, point: initialPoint });
            } else {
                initialPoint = doc.point;
            }

            io.emit('apply-chat-point', { nickname: nickname, point: initialPoint });
        });
    });

    socket.on('update-chat-point', data => {
        const { socketid, nickname, pointDiff } = data;

        chatPointDatabase.findOne({ nickname: nickname }, { nickname: 1, point: 1 }, (err, doc) => {
            let newPoint = 0;

            if (doc === null) {
                newPoint = maxChatPoint;
                chatPointDatabase.insert({ nickname: nickname, point: newPoint });
            } else {
                newPoint = doc.point + pointDiff;
                chatPointDatabase.update({ nickname: nickname }, { nickname: nickname, point: newPoint }, {});
            }

            io.emit('apply-chat-point', { nickname: nickname, point: newPoint });
        });
    });

    // ===================================================
    // For the download page.

    socket.on('get-all-data', (req) => {
        const { socketid } = req;

        const dataNames = {
            db: fs.readdirSync('db'),
            uploads: fs.readdirSync('public/cat/uploads').filter(name => (name !== '.gitkeep'))
        };

        io.to(socketid).emit('get-all-data', dataNames);
    });
}
//////////////////////////////////////////////////

server.listen(PORT, function () {
    console.log(`initiating server at ${PORT}`);
});
