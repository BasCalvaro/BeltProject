// This component work as a path to navigate to the view that give as the posibility to add new tasks

import React from "react";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
	// ---------------------------------------------
	// I) VARIABLES & HOOKS
	// ---------------------------------------------

	const navigate = useNavigate();

	// ---------------------------------------------
	// II) HANDLERS & AUX FUNCTIONS
	// ---------------------------------------------

	// ---------------------------------------------
	// III) JSX
	// ---------------------------------------------

	return (
		<div className="border border-dark border-top-0">
			<div className="p-3">
				<button
					type="submit"
					className="btn btn-info w-25"
					onClick={() => navigate(`/new`)}
				>
					Add new project
				</button>
			</div>
		</div>
	);
};

export default NewProject;
