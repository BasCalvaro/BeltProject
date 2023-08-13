// This component work as a list that updates every project, no matters the status of it

import React from "react";

import DeleteButton from "./deleteButton";
import StatusButton from "./statusButton";

const ProjectList = (props) => {
	// ---------------------------------------------
	// I) VARIABLES & HOOKS
	// ---------------------------------------------

	const { status, projects, setLoading } = props;

	// We generate a constant that contains the curren date of the day
	const currentDate = new Date().toISOString().split("T")[0];

	// ---------------------------------------------
	// II) HANDLERS & AUX FUNCTIONS
	// ---------------------------------------------

	// ---------------------------------------------
	// III) JSX
	// ---------------------------------------------

	return (
		<div className="border border-dark w-100">
			{status === "Backlog" ? (
				<h1 className="p-2 text-center border-bottom border-dark bg-info bg-opacity-50">
					{status}
				</h1>
			) : status === "In Progress" ? (
				<h1 className="p-2 text-center border-bottom border-dark bg-warning bg-opacity-50">
					{status}
				</h1>
			) : (
				<h1 className="p-2 text-center border-bottom border-dark bg-success bg-opacity-50">
					{status}
				</h1>
			)}
			<div style={{ height: "450px", overflowY: "scroll" }}>
				{/* // Here we check if the project object is empty before we try to map it */}
				{projects &&
					projects.map((project, index) => (
						<div key={index} className="border border-dark m-2 p-2">
							<h5>{project.projectName}</h5>
							<div>
								Due:
								<span
									// Here we check the date and if it is from before our current date (considering GMT+0)
									// we give it color red
									className={
										status === "Completed"
											? ""
											: project.projectDate < currentDate
											? "text-danger"
											: ""
									}
								>
									{" "}
									{/**/}
									{project.projectDate}
								</span>
							</div>
							{status === "Backlog" ? (
								<StatusButton
									status={status}
									project={project}
									setLoading={setLoading}
								/>
							) : status === "In Progress" ? (
								<StatusButton
									status={status}
									project={project}
									setLoading={setLoading}
								/>
							) : (
								<DeleteButton project={project} setLoading={setLoading} />
							)}
						</div>
					))}
			</div>
		</div>
	);
};

export default ProjectList;
