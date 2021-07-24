const express = require ('express');
const http = require('http');

const app = express (); // making an express application
const server = http.createServer(app);


const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.get ('/', (req, res) => res.sendFile(__dirname + './public/fish.html'))
//app.get('/mouse', (req, res) => res.setFile(__dirname+'/public/mouse.html'))


server.listen(PORT, function(){
    console.log(`initiating server at ${ PORT }`);
})