/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use('/',express.static(__dirname + '/public'));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
  var err = new Error('Not Found');
  res.status(err.status || 404);
  res.end('Not Found QQ');
});


// setting socket.io
var io = require('socket.io')(require('http').Server(app));
io.engine.ws = new (require('uws').Server)({
    noServer: true,
    perMessageDeflate: false
});


var chat_io = io.of('/chat').on('connection', (socket) => {
  require('./routes/esb/chat')(socket, chat_io);
});


// start server on the specified port and binding host
http.listen(appEnv.port, '0.0.0.0', () => {
  console.log("server starting on " + appEnv.url);
});
