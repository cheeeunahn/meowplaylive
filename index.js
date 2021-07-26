const express = require ('express');
const http = require('http');
//const fs = require('fs');
//const cors = require('cors');
//const bodyParser = require('body-parser');

const app = express (); // making an express application
const server = http.createServer(app);


const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.get ('/', (req, res) => res.sendFile(__dirname + './public/fish.html'))
//app.get('/mouse', (req, res) => res.setFile(__dirname+'/public/mouse.html'))

app.post('/audio-upload', (req, res) => {
    console.log('야옹');
    //fs.writeFileSync(path.join(__dirname,"niktoResults","test-recording.mp3"), req.body);
});

server.listen(PORT, function(){
    console.log(`initiating server at ${ PORT }`);
})