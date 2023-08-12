const {
	getAllAuthors,
	getOneAuthor,
	createAuthor,
	deleteAuthor,
	editAuthor,
} = require("../controllers/author.controllers");

module.exports = (app) => {
	app.get("/authors/", getAllAuthors);
	app.get("/authors/:id", getOneAuthor);
	app.post("/authors/", createAuthor);
	app.delete("/authors/:id", deleteAuthor);
	app.put("/authors/:id", editAuthor);
};
