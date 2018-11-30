
const io = require('socket.io-client');
var socket = io('https://namabilly-gomoku.herokuapp.com');
//var socket = io('http://localhost:3000');

var SIZE = {x: 15, y: 15};
var g;
var gid = -1;
var name = 'myAI';
var side = 0;

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
		g = new Game(SIZE);
	}
	else {
		console.log(data.msg);
	}
});

socket.on('updateBoard', (data) => {
	console.log('received.');
	g.load(data.pieces);
	console.log(g.matrix);
	if (!data.lock) {
		socket.emit('put', {
			id: gid,
			position: {
				x: Math.floor(Math.random()*15),
				y: Math.floor(Math.random()*15)
			},
			name: name
		});
	}
});

class Game {
	constructor(size){
		this.size = size;
		this.matrix = [];
		this.init();
	}
	init(){
		for (let x=0;x<this.size.x;x++) {
			this.matrix[x] = [];
			for (let y=0;y<this.size.y;y++) {
				this.matrix[x][y] = 0;
			}
		}
	}
	load(matrix){
		this.init();
		for (let i in matrix) {
			var piece = matrix[i];
			this.matrix[piece.position.x][piece.position.y] = piece.turn%2*2-1;
		}
	}
}



