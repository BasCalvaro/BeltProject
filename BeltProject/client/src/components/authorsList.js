import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import _ from "lodash";

import DeleteButton from "./deleteButton";

const AuthorsList = (props) => {
	// ---------------------------------------------
	// I) VARIABLES & HOOKS
	// ---------------------------------------------
	const { loading, setLoading } = props;

	// State Hooks
	const [authors, setAuthors] = useState();

	// Navigate Hooks
	const navigate = useNavigate();

	const getAllAuthors = useCallback(async () => {
		await axios.get("http://localhost:8000/authors/").then((res) => {
			const sortedAuthors = _.sortBy(res.data.data, ["authorName"]);
			setAuthors(sortedAuthors);
			setLoading(false);
		});
	}, [setLoading]);

	useEffect(() => {
		if (loading) {
			getAllAuthors();
		}
	}, [loading, getAllAuthors]);
	// ---------------------------------------------
	// II) HANDLERS & AUX FUNCTIONS
	// ---------------------------------------------

	// ---------------------------------------------
	// III) JSX
	// ---------------------------------------------

	return (
		<div className="row">
			<h2>We have quotes by:</h2>
			<table className="table w-50">
				<thead>
					<tr>
						<th className="col-1">#</th>
						<th className="col-7">Author</th>
						<th>Actions available</th>
					</tr>
				</thead>
				{authors &&
					authors.map((author, index) => {
						return (
							<tbody key={index}>
								<tr>
									<th>{index + 1}</th>
									<td>{author.authorName}</td>
									<td>
										<div>
											<button
												type="button"
												className="btn btn-info opacity-75 mx-1"
												onClick={() => navigate(`/edit/${author._id}/`)}
											>
												Edit
											</button>
											<DeleteButton author={author} setLoading={setLoading} />
										</div>
									</td>
								</tr>
							</tbody>
						);
					})}
			</table>
		</div>
	);
};

export default AuthorsList;
