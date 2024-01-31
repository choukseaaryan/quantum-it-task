import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_USERS } from "../../Redux/actions/user";
import { useParams } from "react-router-dom";
import PageLoader from "../../Components/PageLoader";
import ErrorPage404 from "../../Components/ErrorPage404";
import styles from "./details.module.css";

const Details = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				dispatch(GET_USERS({ id: userId })).then((res) => {
					if (res?.success) {
						res?.data && setUser(res?.data[0]);
						setLoading(false);
					} else {
						setError(true);
						setLoading(false);
					}
				});
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		};
		fetchUser();
	}, [dispatch, userId]);
	if (error) {
		return <ErrorPage404 />;
	}
	return (
		<>
			{loading && <PageLoader />}
			<div className={styles.details__container}>
				<div className={styles.details__container__header}>
					<h1>Details</h1>
				</div>
				<hr />
				<div className={styles.details__container__body}>
					<div className={styles.details__container__body__item}>
						<img src="https://via.placeholder.com/150" alt="user" />
					</div>
					<div className={styles.details__container__body__item}>
						<h3>Name</h3>
						<p>{user?.name || "Not Available"}</p>
					</div>
					<div className={styles.details__container__body__item}>
						<h3>Email</h3>
						<p>{user?.email || "Not Available"}</p>
					</div>
					<div className={styles.details__container__body__item}>
						<h3>Phone</h3>
						<p>{user?.phone || "Not Available"}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Details;
