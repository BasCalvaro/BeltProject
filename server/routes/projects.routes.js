// ---------------------------------------------------
// ROUTES SETUP - Projects
// ---------------------------------------------------

// 1) Importing Controller Methods
const {
	getAllProjects,
	getOneProject,
	createProject,
	deleteProject,
	editProject,
} = require("../controllers/projects.controllers");

// 2) Link Routes with Controller Methods
module.exports = (app) => {
	app.get("/api/projects/", getAllProjects);
	app.get("/api/projects/:id", getOneProject);
	app.post("/api/projects/new", createProject);
	app.delete("/api/projects/:id", deleteProject);
	app.put("/api/projects/:id", editProject);
};
