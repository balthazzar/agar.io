'use strict';

import express from 'express';
import io from 'socket.io';
import http from 'http';
import quadtree from 'simple-quadtree';
import utils from './utils';
import config from '../../config';

var app = express(),
	server = http.Server(app),
	tree = quadtree(0, 0, config.gameWidth, config.gameHeight),

	users = [],
	massFood = [],
	food = [],
	virus = [],
	sockets = {},

	leaderboardChanged = false,
	leaderboard = [];

app.use(express.static(__dirname + '/../client'));

let port = process.env.PORT || config.port;
server.listen(port, () => {
	console.log(`Server listening on port: ${config.port}`);
});
