// This component work as a button to change the status of our task and projects

import React from "react";
import axios from "axios";
import { baseURL } from "../config";

const StatusButton = (props) => {
	//-----------------------------------
	// I) HOOKS & VARIABLES
	// ----------------------------------

	const { project, status, setLoading } = props;

	//-----------------------------------
	// II) HANDLERS
	// ----------------------------------

	const changeStatus = async (projectID, status) => {
		try {
			await axios.put(`${baseURL}/api/projects/` + projectID, {
				projectStatus: status,
			});
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
			{status === "Backlog" ? (
				<button
					type="submit"
					className="btn btn-warning opacity-75 w-100"
					style={{ height: "40px" }}
					onClick={() => changeStatus(project._id, "In Progress")}
				>
					<p>Start Project</p>
				</button>
			) : (
				<button
					type="submit"
					className="btn btn-success opacity-75 w-100"
					style={{ height: "40px" }}
					onClick={() => changeStatus(project._id, "Completed")}
				>
					<p>Move to completed</p>
				</button>
			)}
		</div>
	);
};

export default StatusButton;
