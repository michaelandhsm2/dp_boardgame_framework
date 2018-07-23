# Design Pattern Term Project

[Demo Powerpoint!!!](https://docs.google.com/presentation/d/1hO0xX2g7DRD1_d5cvvtyUAZxOeB22rcvPUNtISU1lgo/edit?usp=sharing)

This is the term project for the [Design Pattern Course](https://myweb.ntut.edu.tw/~yccheng/dp2018s/DP.html) in National Taipei University of Technology (NTUT). The project is a framework that allows users to __quickly scaffold__ turn-based board games by specifying the *__game mechanics__* and the *__board representation__*.

The project is inspired by [Schuchert’s Monopoly Kata](https://schuchert.wikispaces.com/Monopoly%28r%29) and Google's [boardgame.io](https://github.com/google/boardgame.io).

## Problem Statement

Create a framework that allows users to quickly scaffold turn-based board games
by specifying the game mechanics
and the board representation.

## Design Problems

- The game mechanics should be independent of the board representation, while the board representation relies on the game mechanics.
- The framework itself should manage game order and state.
- The framework itself should provide multiplayer connectivity.
- The framework should aim to create ease for dynamic customization.

## Usage Sample ([Sample Code](https://github.com/michaelandhsm2/dp_boardgame_framework/blob/master/src/index.js))

### 1. Simple Tic Tac Toe
Local 2 player games.

![Pic](https://raw.githubusercontent.com/michaelandhsm2/dp_boardgame_framework/master/assets/task1.png)

### 2. Drawing Game
Allows online connectivity and master-slave controls.
![Pic](https://raw.githubusercontent.com/michaelandhsm2/dp_boardgame_framework/master/assets/task4.png)

### 3. Guessing Game
Switching between different presentation by switching the game board.

![Pic](https://raw.githubusercontent.com/michaelandhsm2/dp_boardgame_framework/master/assets/task5a.png)

![Pic](https://raw.githubusercontent.com/michaelandhsm2/dp_boardgame_framework/master/assets/task5b.png)


## Built With

* NodeJS

## Authors

* **Michael Fu** - *System Design and Code Implementation* - [michaelandhsm2](https://github.com/michaelandhsm2)
