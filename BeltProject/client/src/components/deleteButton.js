import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteButton = (props) => {
	//-----------------------------------
	// I) HOOKS & VARIABLES
	// ----------------------------------

	const { author, setLoading, origin } = props;

	// Navigate Hooks
	const navigate = useNavigate();

	//-----------------------------------
	// II) HANDLERS
	// ----------------------------------

	const deleteAuthor = async (authorID) => {
		try {
			const res = await axios.delete(
				"http://localhost:8000/authors/" + authorID
			);
			console.log(res);
			setLoading(true);
			if (origin === "details") {
				navigate("/");
			}
		} catch (err) {
			console.log(err);
		}
	};

	// ---------------------------------------------
	// III) JSX
	// ---------------------------------------------

	return (
		<>
			<button
				className="mx-1 btn btn-danger opacity-75"
				onClick={(e) => deleteAuthor(author._id)}
			>
				Delete
			</button>
		</>
	);
};

export default DeleteButton;
