import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { HANDLE_SIGNUP } from "../../Redux/actions/admin";
import PageLoader from "../../Components/PageLoader";
import styles from "./signup.module.css";

const Signup = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
		dob: "",
	});

	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [dateType, setDateType] = useState("text");

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const submitHandler = () => {
		const { name, email, password, dob } =
		data;
		
		if (
			!name ||
			!email ||
			!password ||
			!confirmPassword ||
			!dob
			) {
				toast.error("Please fill all fields!");
				return;
			}
			
			const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			
			if (!emailRegex.test(email)) {
				toast.error("Please enter a valid email!");
				return;
			}

			if (password !== confirmPassword) {
				toast.error("Passwords do not match!");
				return;
			}
			
		setLoading(true);
		dispatch(HANDLE_SIGNUP({ payload: data })).then((res) => {
			if (res?.success) {
				setLoading(false);
				window.location.href = "/login";
			}
		});
	};

	const changeHandler = (e) => {
		if (e.target.name === "conf-password") {
			setConfirmPassword(e.target.value);
		} else {
			setData({ ...data, [e.target.name]: e.target.value.toString() });
		}
	};

	return (
		<>
			{loading && <PageLoader />}
			<div className={styles.signup}>
				<div className={styles.signup__container}>
					<div className={styles.signup__header}>
						<p>SIGN UP</p>
					</div>
					<div className={styles.signup__form}>
						<div>
							<div className={styles.input__icon}>
								<i className={`bx bxs-user ${styles.bx}`}></i>
								<input
									name="name"
									type="text"
									placeholder="Name"
									onChange={changeHandler}
								/>
							</div>
						</div>
						<div>
							<div className={styles.input__icon}>
								<i
									className={`bx bxs-calendar ${styles.bx}`}
								></i>
								<input
									name="dob"
									type={dateType}
									placeholder="Date of Birth"
									onFocus={() => setDateType("date")}
									onBlur={() => setDateType("text")}
									onChange={changeHandler}
								/>
							</div>
						</div>
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

						<div className={`password__container`}>
							<div className={styles.input__icon}>
								<i
									className={`bx bxs-lock-alt ${styles.bx}`}
								></i>
								<input
									name="conf-password"
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									placeholder="Confirm Password"
									onChange={changeHandler}
									className="password__input"
								/>
							</div>
							<button
								className="toggle__passwordBtn"
								onClick={toggleShowConfirmPassword}
							>
								{showConfirmPassword ? (
									<i class="bx bx-hide"></i>
								) : (
									<i class="bx bx-show"></i>
								)}
							</button>
						</div>
						<button
							onClick={submitHandler}
							className={styles.signup__button}
						>
							SIGN UP
						</button>
					</div>

					<p className="login__registerPara">
						Already a member?{" "}
						<a href="/login" className={styles.login__button}>
							Sign In
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default Signup;
