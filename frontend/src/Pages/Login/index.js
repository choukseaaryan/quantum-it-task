import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { HANDLE_LOGIN } from "../../Redux/actions/admin";
import PageLoader from "../../Components/PageLoader";
import styles from "./login.module.css";

const Login = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});
	const [loading, setLoading] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		if (!data.email || !data.password) {
			toast.error("Please fill all fields!");
			return;
		}

		const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+$/;
		if (!emailRegex.test(data.email)) {
			toast.error("Please enter valid email!");
			return;
		}

		setLoading(true);
		dispatch(HANDLE_LOGIN({ payload: data })).then((res) => {
			if (res?.success) {
				window.location.href = "/";
			}
			setLoading(false);
		});
	};

	const changeHandler = (e) => {
		if (e.target.name === "rememberMe") {
			setData((prevData) => ({
				...prevData,
				[e.target.name]: e.target.checked,
			}));
			return;
		}
		setData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			{loading && <PageLoader />}
			<div className={styles.login}>
				<div className={styles.login__container}>
					<div className={styles.login__header}>
						<p>SIGN IN</p>
					</div>
					<i
						className={`bx bxs-user-circle ${styles.bxs__user__circle}`}
					></i>
					<div className={styles.login__form}>
						<div className={styles.input__icon}>
							<i className={`bx bxs-envelope ${styles.bx}`}></i>
							<input
								name="email"
								type="email"
								placeholder="Email"
								onChange={changeHandler}
							/>
						</div>

						<div className={`password__container`}>
							<div className={styles.input__icon}>
								<i
									className={`bx bxs-lock-alt ${styles.bx}`}
								></i>
								<input
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="Password"
									onChange={changeHandler}
									className="password__input"
								/>
							</div>
							<button
								className="toggle__passwordBtn"
								onClick={toggleShowPassword}
							>
								{showPassword ? (
									<i class="bx bx-hide"></i>
								) : (
									<i class="bx bx-show"></i>
								)}
							</button>
						</div>

						<div className={styles.links__container}>
							<label>
								<input name="rememberMe" type="checkbox" onChange={changeHandler} />
								<span>Remember me</span>
							</label>
							<a href="/forgot-password">Forgot password?</a>
						</div>
						<button
							onClick={submitHandler}
							className={styles.login__button}
						>
							LOGIN
						</button>
					</div>

					<p className="login__registerPara">
						Don't have an account?{" "}
						<a href="/signup" className={styles.signup__button}>
							Sign Up
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
