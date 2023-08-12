import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import LogRegPage from "./views/logRegPage";
import Main from "./views/main";
import AuthorsForm from "./views/authorsForm";
import NavBar from "./components/navBar";

// **************************************************************************
// A) AUXILIARY COMPONENT
// **************************************************************************
const ProtectedRoute = (props) => {
	// Variables from Props
	const { user, redirectPath = "/login", children } = props;

	// II) JSX
	return <>{!user ? <Navigate to={redirectPath} replace /> : children}</>;
};

const PublicRoute = (props) => {
	// --------------------------------------------------
	// I) HOOKS AND VARIABLES
	// --------------------------------------------------

	// Variables
	const { user, redirectPath = "/", children } = props;

	// --------------------------------------------------
	// II) JSX
	// --------------------------------------------------
	return <>{user ? <Navigate to={redirectPath} replace /> : children}</>;
};

// **************************************************************************
// B) MAIN COMPONENT
// **************************************************************************

function App() {
	// --------------------------------------------------
	// I) HOOKS AND VARIABLES
	// --------------------------------------------------

	// Variables
	const userDetails = JSON.parse(localStorage.getItem("user"));
	const userInfo = userDetails ? userDetails : null;
	// State Hooks
	const [user, setUser] = useState(userInfo);

	// --------------------------------------------------
	// II) JSX
	// --------------------------------------------------
	return (
		<div>
      <NavBar setUser={setUser} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute user={user} redirectPath="/">
              <LogRegPage setUser={setUser} />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user} redirectPath="/login">
              <Main setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute user={user} redirectPath="/login">
              <AuthorsForm formType={"create"} setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id/"
          element={
            <ProtectedRoute user={user} redirectPath="/login">
              <AuthorsForm formType={"edit"} setUser={setUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
	);
}
export default App;
