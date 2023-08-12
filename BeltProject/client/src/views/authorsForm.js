import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AuthorForm = (props) => {
	// ---------------------------------------------
	// I) VARIABLES & HOOKS
	// ---------------------------------------------

	const { formType } = props;
	const [loading, setLoading] = useState(true);
	const [authors, setAuthors] = useState({
		authorName: "",
	});

	const navigate = useNavigate();
	const params = useParams();

	const getOneAuthor = useCallback(async () => {
		try {
			const res = await axios.get("http://localhost:8000/authors/" + params.id);
			setAuthors(res.data);
		} catch (error) {
			console.error(error);
		}
	}, [params.id]);

	useEffect(() => {
		if (formType === "edit") {
			getOneAuthor();
		} else if (formType === "create") {
			setAuthors({
				authorName: "",
			});
		}
	}, [formType, getOneAuthor]);
	// ---------------------------------------------
	// II) HANDLERS & AUX FUNCTIONS
	// ---------------------------------------------

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			if (formType === "create") {
				await axios
					.post("http://localhost:8000/authors", {
						authorName: authors.authorName,
					})
					.then((res) => {
						setLoading(true);
						console.log(res);
						setAuthors({
							authorName: "",
						});
						navigate("/");
					});
			} else if (formType === "edit") {
				await axios.put("http://localhost:8000/authors/" + params.id, {
					authorName: authors.data[0].authorName,
				});
				navigate("/");
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const onChangeAuthorHandler = (e, index) => {
		const updatedAuthors = [...authors.data];
		updatedAuthors[index][e.target.name] = e.target.value;
		setAuthors({ ...authors, data: updatedAuthors });
	};
	// ---------------------------------------------
	// III) JSX
	// ---------------------------------------------

	const renderInputField = (label, value, onChange) => (
		<>
			<label className="ps-4">{label}</label>
			<input
				type="text"
				onChange={onChange}
				name={"authorName"}
				value={value}
				className="my-2 mx-3 w-50"
			/>
		</>
	);

	return (
		<div className="px-5">
			<div className="mt-2 pb-2">
				<Link to={"/"}>Home</Link>
			</div>
			{formType === "create" ? (
				<h2>Add a new author:</h2>
			) : (
				<h2>Edit this author:</h2>
			)}
			<div className="bg-dark bg-opacity-10 my-2 py-4 w-50 border border-dark">
				<form onSubmit={onSubmitHandler} className="">
					{formType === "create" ? (
						<>
							{renderInputField("Author", authors.authorName, (e) =>
								setAuthors({ ...authors, authorName: e.target.value })
							)}
						</>
					) : (
						authors.data &&
						authors.data.map((author, index) => {
							return (
								<div key="index">
									{renderInputField("Author", author.authorName, (e) =>
										onChangeAuthorHandler(e, index)
									)}
								</div>
							);
						})
					)}
					<div className="px-4">
						<button type="submit" className="btn btn-success opacity-50 m-2">
							Submit
						</button>
						<button
							type="submit"
							className="btn btn-success opacity-50 m-2"
							onClick={() => navigate(`/`)}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AuthorForm;
