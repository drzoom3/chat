const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    http = require('http'),
    socketIo = require('socket.io'),
    routes = require('./routes/main.route'),
    config = require('../config');

const app = express(),
    server = http.createServer(app),
    io = socketIo(server);

//FOR DEV
app.use(function (req, res, next) {
    // Website you wish to allow to connect'
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");  
    res.setHeader('Access-Control-Allow-Credentials', true);  
    next();
});

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}));

app.use('/css/', express.static(path.join(__dirname, '../build/css/'), {maxAge: 31557600000}) );
app.use('/js/', express.static(path.join(__dirname, '../build/js/'), {maxAge: 31557600000}) );
app.use('/images/', express.static(path.join(__dirname, '../build/images/'), {maxAge: 31557600000} ) );
app.use('/i18n/', express.static(path.join(__dirname, '../build/i18n/'), {maxAge: 31557600000} ) );

app.get('*', routes.index);

routes.chat(io);

server.listen(config.port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port :', config.port)
  }
})