import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const isAuth = sessionStorage.getItem("profileInfo");

	return isAuth ? (
		<div>
			<Outlet />
		</div>
	) : (
		<Navigate to="/login" />
	);
};

export default ProtectedRoute;
