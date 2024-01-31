import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPage404 from "../Components/ErrorPage404";
import Dashboard from "../Pages/Dashboard";
import Details from "../Pages/Details";
import Main from "./main";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

const AllRoutes = () => (
	<Routes>
		<Route path="*" element={<ErrorPage404 />} />
		<Route path="/login" element={<Login />} />
		<Route path="/signup" element={<Signup />} />
		<Route path="/" element={<Main />}>
			<Route path="/" element={<Dashboard />} />
			<Route path="/details/:userId" element={<Details />} />
		</Route>
	</Routes>
);

export default AllRoutes;
