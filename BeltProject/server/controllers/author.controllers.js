// ---------------------------------------------------
// CONTROLLER SETUP - Author
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; // Destructuring assignment to get ObjectId

// 2) Importing Model
const AuthorModel = require("../models/author.models");

// 3) Exporting Controller functions

// 3.1) CREATE METHODS
module.exports = {
	getAllAuthors: (req, res) => {
		AuthorModel.find(
			{},
			{ _id: true, authorName: true }
		)
			.then((authors) => {
				res.json({ data: authors });
			})
			.catch((error) => {
				res.status(500).json({ error: error });
			});
	},
	getOneAuthor: (req, res) => {
		let id = req.params.id;
		if (!ObjectId.isValid(id))
			return res
				.status(400)
				.json({ message: "id doesn't match the expected format" });
		AuthorModel.find({ _id: id })
			.then((authors) => {
				res.json({ data: authors });
			})
			.catch((error) => {
				res.status(500).json({ error: error });
			});
	},
	createAuthor: (req, res) => {
		let data = req.body;
		console.log(data);
		AuthorModel.create(data)
			.then((authors) => {
				res.json({ data: authors });
			})
			.catch((error) => {
				if (error instanceof mongoose.Error.ValidationError) {
					let keys = Object.keys(error.errors);
					let error_dict = {};
					keys.map((key) => {
						error_dict[key] = error.errors[key].message;
					});
					res.status(500).json({ error: error_dict });
				} else {
					res.status(500).json({ error: error });
				}
			});
	},
	deleteAuthor: (req, res) => {
		let id = req.params.id;
		if (!ObjectId.isValid(id))
			return res
				.status(400)
				.json({ message: "id doesn't match the expected format" });
		AuthorModel.deleteOne({ _id: id })
			.then(() => {
				res.json({ success: true });
			})
			.catch((error) => {
				res.status(500).json({ error: error });
			});
	},
	editAuthor: (req, res) => {
		let id = req.params.id;
		let data = req.body;
		const updateOptions = {
			new: true, // Return the updated document
			runValidators: true, // Enforce validation during update
		};
		if (!ObjectId.isValid(id))
			return res
				.status(400)
				.json({ message: "id doesn't match the expected format" });
		AuthorModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
			.then(() => {
				res.json({ success: true });
			})
			.catch((error) => {
				if (error instanceof mongoose.Error.ValidationError) {
					let keys = Object.keys(error.errors);
					let error_dict = {};
					keys.map((key) => {
						error_dict[key] = error.errors[key].message;
					});
					res.status(500).json({ error: error_dict });
				} else {
					res.status(500).json({ error: error });
				}
			});
	},
};
