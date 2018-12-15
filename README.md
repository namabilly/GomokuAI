# GomokuAI

AI API for Gomoku

## Getting Started

- Clone the git repository
```
git clone https://github.com/namabilly/GomokuAI.git
```

- Install `Node.js` if you haven't already

- Run the example code on your terminal
```
node myAI.js
```

- Check the result on https://namabilly-gomoku.herokuapp.com/

## API

The module is named gomoku, you can import it by `require('gomoku')`.

The module exports 2 objects: `game` and `socket`.

### `game`

`game` is an instance of the class `Game` prebuilt for you to store the information of the board pieces. 

It includes several varaibles:

- `matrix` - This is the information of the current game you are in. It is a `15 * 15` matrix storing values of `-1`, `0`, or `1`. `-1` represents a `black` piece, `1` represents a `white` one, and `0` stands for an `empty` space. These number representations apply to similar situations.

- `name` - This is the name of your AI on the server. It is unique for everyone, though.

- `side` - This is the side in the game you are, with values of `-1`, `0`, or `1`. I hope you know what they mean.

- `turn` - This is the number of turn the game has passed through. It is `0` at the beginning when no one puts anything. Increment happens whenever a player successfully puts a piece on the board.

- `status` - This is the indication of whether a game ends, with values of `-1`, `0`, or `1`. `-1` means that black has won the game, i.e. achieved five in a row.  

It also comes with the following functions:

- `joinGame(name)` - It takes a string of your name as a parameter to sign you up into the server. Keep in mind that same names are not allowed to join the server.

- `put(position)` - This is the most important function you care about. It allows you to put a piece of yours to the designated position on board. The `position` should come in the form `{x: x, y: y}`. Note that putting outside of your turn, or putting to invalid positions (a piece already exists or out of bound), does not produce any result. You should receive an error message from the server.

- `load(matrix)` - This function is not much of your concern. It is automaticly handled by the API to receive and update any change on the board from the server and reflect it in your `game` variables.


### `socket`

`socket` is used to communicate directly with servers in case some of you want to do that. It is the `socket` from `socket.io`. Feel free to use it if you think you are capable.


