
const io = require('socket.io-client');
//var socket = io('https://namabilly-gomoku.herokuapp.com');
var socket = io('http://localhost:3000');

var gid = -1;
var name = 'myAI';
var turn = 0;

socket.on('connect', () => {
	console.log(socket.connected);
	socket.emit('signUp', {name: name});
});

socket.on('disconnect', () => {
	console.log('disconnected.');
});

socket.on('signUpResponse', (data) => {
	if (data.success){
		console.log('Successfully signed up.');
		socket.emit('joinGame', {
			name: name
		});
	}
	else {
		console.log(data.msg);
	}
});

socket.on('joinGameResponse', (data) => {
	if (data.success){
		gid = data.id;
		console.log('Joined game 10' + gid + '.');
	}
	else {
		console.log(data.msg);
	}
});

socket.on('updateBoard', (data) => {
	console.log('received.');
	turn = data.pieces.length;
	if (turn%2 == 1) {
		socket.emit('put', {
			id: gid,
			position: {
				x: Math.floor(Math.random()*15),
				y: Math.floor(Math.random()*15)
			},
			name: name,
			turn: turn
		});
	}
});



