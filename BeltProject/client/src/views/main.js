import React, { useState } from "react";
import { Link } from "react-router-dom";

import AuthorList from "../components/authorsList";

const Main = () => {
	// ---------------------------------------------
	// I) VARIABLES & HOOKS
	// ---------------------------------------------

	const [loading, setLoading] = useState(true);

	// ---------------------------------------------
	// II) HANDLERS & AUX FUNCTIONS
	// ---------------------------------------------

	// ---------------------------------------------
	// III) JSX
	// ---------------------------------------------

	return (
		<div className="col px-5">
			<div className="mt-2 pb-2">
				<Link to={"/new"}>Add an author</Link>
			</div>
			<AuthorList loading={loading} setLoading={setLoading} />
		</div>
	);
};

export default Main;
