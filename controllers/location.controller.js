const Location = require('../models/Location');

exports.test = function (req, res) {
	res.send('Greetings from the Test Controller!');
};

exports.location_create = function (req, res) {
	let location = new Location(
		req.body
	);

	location.save(function (err) {
		if (err) {
			return next(err);
		}
		res.send('Location Created successfully')
	})
};

exports.location_details = function (req, res) {
	Location.findById(req.params.id, function(err, location) {
		if (err) return next(err);
		res.send(location);
	})
};