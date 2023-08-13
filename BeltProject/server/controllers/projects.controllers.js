// ---------------------------------------------------
// CONTROLLER SETUP - Project
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; // Destructuring assignment to get ObjectId

// 2) Importing Model
const ProjectModel = require("../models/projects.models");

// 3) Exporting Controller functions
module.exports = {
	// 3.1) READ ALL ELEMENTS METHOD
	getAllProjects: (req, res) => {
		ProjectModel.find(
			{},
			{ _id: true, projectName: true, projectDate: true, projectStatus: true }
		)
			.then((projects) => {
				res.json({ data: projects });
			})
			.catch((error) => {
				res.status(500).json({ error: error });
			});
	},

	// 3.2) READ ONE ELEMENT METHOD
	getOneProject: (req, res) => {
		let id = req.params.id;
		if (!ObjectId.isValid(id))
			return res
				.status(400)
				.json({ message: "id doesn't match the expected format" });
		ProjectModel.find({ _id: id })
			.then((projects) => {
				res.json({ data: projects });
			})
			.catch((error) => {
				res.status(500).json({ error: error });
			});
	},

	// 3.3) CREATE A NEW ELEMENT METHOD
	createProject: (req, res) => {
		let data = req.body;
		console.log(data);
		ProjectModel.create(data)
			.then((projects) => {
				res.json({ data: projects });
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

	// 3.4) DELETE AN ELEMENT METHOD
	deleteProject: (req, res) => {
		let id = req.params.id;
		if (!ObjectId.isValid(id))
			return res
				.status(400)
				.json({ message: "id doesn't match the expected format" });
		ProjectModel.deleteOne({ _id: id })
			.then(() => {
				res.json({ success: true });
			})
			.catch((error) => {
				res.status(500).json({ error: error });
			});
	},

	// 3.5) EDIT AN ELEMENT METHOD
	editProject: (req, res) => {
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
		ProjectModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
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
