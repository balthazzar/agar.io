'use strict';

import config from '../../config';

const utils = {
	validateNickname: nickname => /^\w*$/.exec(nickname) !== null,

	massToRadius: mass => 4 + Math.sqrt(mass) * 6,

	log: (() => (n, base) => Math.log(n) / (base ? Math.log(base) : 1))(),

	getDistance: (p1, p2) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) - p1.radius - p2.radius,

	random: (from, to) => ~~(Math.random() * (to - from)) + from,

	randomPosition: radius => ({
		x: utils.random(radius, config.gameWidth - radius),
		y: utils.random(radius, config.gameHeight - radius)
	}),

	uniformPosition: (points, radius) => {
		let bestCandidate, maxDistance = 0,
			numberOfCandidates = 10;

		if (points.length === 0) {
			return utils.randomPosition(radius);
		}

		for (let ci = 0; ci < numberOfCandidates; ci++) {
			let minDistance = Infinity,
				candidate = utils.randomPosition(radius);
			candidate.radius = radius;

			for (let pi = 0; pi < points.length; pi++) {
				let distance = utils.getDistance(candidate, points[pi]);
				if (distance < minDistance) {
					minDistance = distance;
				}
			}

			if (minDistance > maxDistance) {
				bestCandidate = candidate;
				maxDistance = minDistance;
			} else {
				return utils.randomPosition(radius);
			}
		}

		return bestCandidate;
	},

	findIndex: (arr, id) => {
		let len = arr.length;

		while (len--) {
			if (arr[len].id === id) {
				return len;
			}
		}

		return -1;
	},

	randomColor: () => {
		let color = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6),
			c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color),
			r = (parseInt(c[1], 16) - 32) > 0 ? (parseInt(c[1], 16) - 32) : 0,
			g = (parseInt(c[2], 16) - 32) > 0 ? (parseInt(c[2], 16) - 32) : 0,
			b = (parseInt(c[3], 16) - 32) > 0 ? (parseInt(c[3], 16) - 32) : 0;

		return {
			fill: color,
			border: '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
		};
	}
}

export default utils;
