const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey:'7840b954efde43598f79269f4d7bbebf'});

const handleApiCall = (req, res) => {
	app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
	.then(data => {
		//console.log(data);
		res.json(data);
	})
	.catch(err => {
		res.status(400).json('Can not access api');
	})
}

const handleImage = (req, res, db) => {	

	const { id } = req.body;
	db('users').where({
		id:id
	})
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => {
		res.status(400).json('Something went WRONG')
	})

}

module.exports = {
	handleImage:handleImage,
	handleApiCall:handleApiCall
}