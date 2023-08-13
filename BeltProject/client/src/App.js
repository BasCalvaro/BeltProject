// This component work as a manager for the path for our web
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Main from "./views/main";
import ProjectForm from "./views/projectsForm"

// **************************************************************************
// A) MAIN COMPONENT
// **************************************************************************

function App() {
	// --------------------------------------------------
	// I) HOOKS AND VARIABLES
	// --------------------------------------------------


	// --------------------------------------------------
	// II) JSX
	// --------------------------------------------------
	return (
		<div  className="p-3">
			<h1 className="text-center pb-3">Project manager</h1>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route
					path="/new"
					element={<ProjectForm formType={"create"} />}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}
export default App;
