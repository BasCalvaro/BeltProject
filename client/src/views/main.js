// This component work as a our main manager of the views and states for our manager
import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";
import _ from "lodash";
import { baseURL } from "../config";

import ProjectsList from "../components/projectsList";
import NewProject from "../components/newProject";

const Main = () => {
	// ---------------------------------------------
	// I) VARIABLES & HOOKS
	// ---------------------------------------------

	const [loading, setLoading] = useState(true);

	const [projects, setProjects] = useState([]);

	const getAllProjects = useCallback(async () => {
		axios.get(`${baseURL}/api/projects/`).then((res) => {
			setProjects(res.data);
			setLoading(false);
		});
	}, [setLoading]);

	useEffect(() => {
		if (loading) {
			getAllProjects();
		}
	}, [loading, getAllProjects]);

	const sortProjectsByDate = (projects) => {
    return _.sortBy(projects, (project) => new Date(project.projectDate));
  };
	// ---------------------------------------------
	// II) HANDLERS & AUX FUNCTIONS
	// ---------------------------------------------

	// ---------------------------------------------
	// III) JSX
	// ---------------------------------------------

	return (
		<div>
			<div className="d-flex justify-content-center">
				{projects.data && (
					<>
						<ProjectsList
							projects={sortProjectsByDate(
                projects.data.filter((project) => project.projectStatus === "Backlog")
              )}
							setProjects={setProjects}
							loading={loading}
							setLoading={setLoading}
							status={"Backlog"}
						/>
						<ProjectsList
							projects={sortProjectsByDate(projects.data.filter(
								(project) => project.projectStatus === "In Progress"
							))}
							setProjects={setProjects}
							loading={loading}
							setLoading={setLoading}
							status={"In Progress"}
						/>

						<ProjectsList
							projects={sortProjectsByDate(projects.data.filter(
								(project) => project.projectStatus === "Completed"
							))}
							setProjects={setProjects}
							loading={loading}
							setLoading={setLoading}
							status={"Completed"}
						/>
					</>
				)}
			</div>
			<NewProject />
		</div>
	);
};

export default Main;
