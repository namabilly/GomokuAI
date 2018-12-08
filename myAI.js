
const gomoku = require('gomoku');

var g = gomoku.game;
var socket = gomoku.socket;
var name = 'myAI';

// join game
g.joinGame(name);

// g.matrix represents the current board with 15*15 2d array
// g.side gives your color
// -1 represents black while 1 stands for white; 0 is empty
// g.put puts a piece

// your code here
function main(){
	setTimeout(function(){
		if (g.turn%2*2-1===g.side) {
			if (g.turn === 0) {
				g.put({
					x: 7,
					y: 7
				});
			}
			if (g.turn === 1) {
				for (let x=0;x<15;x++) {
					for (let y=0;y<15;y++) {
						if (g.matrix[x][y]===-g.side) {
							var d = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]][Math.floor(Math.random()*8)];
							if (g.matrix[x+d[0]]&&g.matrix[x+d[0]][y+d[0]]===0) {
								g.put({
									x: x+d[0],
									y: y+d[1]
								});
								break;
							}
						}
					}
				}
			}
			for (let x=0;x<15;x++) {
				for (let y=0;y<15;y++) {
					if (g.matrix[x][y]===g.side) {
						var d = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]][Math.floor(Math.random()*8)];
						if (g.matrix[x+d[0]]&&g.matrix[x+d[0]][y+d[0]]===0)
							g.put({
								x: x+d[0],
								y: y+d[1]
							});
					}
				}
			}
		}
		main();
	}, 1);
	
}

main();


