var config = require('./config.json');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server,
                             { pingInternal: 60000,
                               pingTimeout: 120000 });

app.use(express.static(__dirname + '/adsb_map_client/'));
app.set('port', config.port || 8081);

server.listen(app.get('port'), function(){
  console.log('Express listening on port ' + app.get('port'));
});

io.on('connection', connectionHandler);

function connectionHandler(socket) {
  console.log('Client has connected');
  
  socket.emit('sendSetupData', config.setupData);
  
  socket.on('disconnect', function(data) {
		console.log('Client disconnected: ' + JSON.stringify(data));
	});

	socket.on('error', function(data) {
		console.log('Data error: ' + data);
	});
}
