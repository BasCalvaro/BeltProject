// This component work as a button to delete the task and projects that we complete on our manager

import React from "react";
import axios from "axios";
import { baseURL } from "../config";

const DeleteButton = (props) => {
	//-----------------------------------
	// I) HOOKS & VARIABLES
	// ----------------------------------

	const { project, setLoading } = props;

	//-----------------------------------
	// II) HANDLERS
	// ----------------------------------

	const deleteProject = async (projectID) => {
		try {
			await axios.delete(`${baseURL}/api/projects/` + projectID);
			setLoading(true);
		} catch (err) {
			console.log(err);
		}
	};

	// ---------------------------------------------
	// III) JSX
	// ---------------------------------------------

	return (
		<div className="pt-3">
			<button
				className="btn btn-danger opacity-75 w-100"
				onClick={() => deleteProject(project._id)}
			>
				Delete
			</button>
		</div>
	);
};

export default DeleteButton;
