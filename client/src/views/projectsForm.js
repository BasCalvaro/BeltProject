// This component work as a the view and the form to add new tasks to our manager

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../config";

const ProjectForm = () => {
	// ---------------------------------------------
	// I) VARIABLES & HOOKS
	// ---------------------------------------------

	// A state to handle the loading status and let the list
	// and the elements refresh
	const [loading, setLoading] = useState(true);

	// A state to handle the project name
	const [projects, setProjects] = useState({
		projectName: "",
	});

	// A state to handle errors
	const [error, setError] = useState(null);

	// Navigate handler so we can go back to our home page
	const navigate = useNavigate();

	// ---------------------------------------------
	// II) HANDLERS & AUX FUNCTIONS
	// ---------------------------------------------

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			await axios
				.post(`${baseURL}/api/projects/new`, {
					projectName: projects.projectName, // Add the name for the new projects
					projectDate: projects.projectDate, // Add the Date for the new projects
					projectStatus: "Backlog", // Define the status for the new projects
				})
				.then((res) => {
					console.log(res);
					setProjects({
						projectName: "", // Clean the name for the creation of a new project
						projectDate: "", // Clean the date for the creation of a new project
					});
					setLoading(true);
					setError(null); // Clean the error in case we hace success
					navigate("/");
				});
		} catch (error) {
			console.error("Error:", error.response.data.error);
			updateErrorMessages(error);
			setLoading(false);
		}
	};

	const onChangeProjectHandler = (e) => {
		// A handler to update the input form for the name
		setProjects({
			...projects,
			projectName: e.target.value,
		});
	};

	const onChangeDateHandler = (e) => {
		// A handler to update the input form for the date
		setProjects({
			...projects,
			projectDate: e.target.value,
		});
	};

	const updateErrorMessages = (err) => {
		const errors = err.response.data.error;
		setError(errors);
	};

	// ---------------------------------------------
	// III) JSX
	// ---------------------------------------------

	return (
		<div>
			<div className="text-end">
				<Link to={"/"}>Back to dashboard</Link>
			</div>
			<h2
				className="ms-2 px-2 bg-white position-absolute"
				style={{ top: "95px" }}
			>
				Add a new project:
			</h2>
			<div
				className="text-center my-2 py-4 border border-dark"
				style={{ height: "450px" }}
			>
				<div>
					<form onSubmit={onSubmitHandler} className="my-5">
						<div>
							<label className="ps-3 me-3">Project</label>
							<input
								type="text"
								onChange={onChangeProjectHandler}
								name={"projectName"}
								value={projects.projectName}
								className="my-2 mx-3 w-50"
							/>
							<div className="text-danger small">{error?.projectName}</div>
						</div>
						<div>
							<label className="ps-3">Due Date</label>
							<input
								type="date"
								onChange={onChangeDateHandler}
								name="projectDate"
								value={projects.projectDate}
								className="my-2 mx-3 w-50"
							/>
						</div>
						<div className="text-danger small">{error?.projectDate}</div>
						<div className="px-4">
							<button
								type="submit"
								className="btn btn-info border border-dark m-5 w-50"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default ProjectForm;
