// ---------------------------------------------------
// MODEL SETUP - Author
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

// 2) Creating Schema for Model (blueprint)
const AuthorSchema = new mongoose.Schema(
	{
		authorName: {
			type: String,
			required: [true, "Author name for your author is required"],
			minlength: [3, "The Author name must be at least 3 characters long"],
		},
		
	},
	{ timestamps: true }
);

// 3) Apply the uniqueValidator plugin to AuthorSchema.
// AuthorSchema.plugin(uniqueValidator);

// 4) Creating Model using Schema
const AuthorModel = mongoose.model("Author", AuthorSchema);

// 5) Exporting Model
module.exports = AuthorModel;
