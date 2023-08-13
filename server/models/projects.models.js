// ---------------------------------------------------
// MODEL SETUP - Project
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// 2) Creating Schema for Model (blueprint)
const ProjectSchema = new mongoose.Schema(
	{
		projectName: {
			type: String,
			required: [true, "Project name is required"],
			unique: true,
			minlength: [3, "The Project name must be at least 3 characters long"],
		},
		projectDate: {
			type: String,
			required: [true, "Project due date is required"],
		},
		projectStatus: {
			type: String,
		},
	},
	{ timestamps: true }
);

// 3) Apply the uniqueValidator plugin to ProjectSchema.
ProjectSchema.plugin(uniqueValidator, {message: "Error: The project already exist"});

// 4) Creating Model using Schema
const ProjectModel = mongoose.model("Project", ProjectSchema);

// 5) Exporting Model
module.exports = ProjectModel;
