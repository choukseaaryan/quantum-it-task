import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "./modal.module.css";
import { ADD_USER, GET_USERS } from "../../Redux/actions/user";

const AddModal = ({ setIsOpen }) => {
	const [data, setData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const dispatch = useDispatch();

	const handleChange = (e) => {
		setData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleAddUser = () => {
		const { name, email, phone } = data;

		if (!name || !email || !phone) {
			toast.error("Please fill all fields!");
			return;
		}

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const phoneRegex = /^[0-9]{10}$/;

		if (!emailRegex.test(email)) {
			toast.error("Please enter a valid email!");
			return;
		}

		if (!phoneRegex.test(phone)) {
			toast.error("Please enter a valid phone number!");
			return;
		}

		dispatch(ADD_USER({ payload: data })).then((res) => {
			if (res?.success) {
				dispatch(GET_USERS({}));
			}
		});
		setIsOpen(false);
	};
	return (
		<>
			<div className={styles.dark__bg} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modal__header}>
						<h5 className={styles.heading}>Add User</h5>
					</div>
					<button
						className={styles.close__btn}
						onClick={() => setIsOpen(false)}
					>
						<i className="bx bx-x"></i>
					</button>
					<div className={styles.modal__form}>
						<p>
							<b>Name</b>
						</p>
						<input
							name="name"
							type="text"
							placeholder="Name"
							onChange={handleChange}
						/>
						<p>
							<b>Email</b>
						</p>
						<input
							name="email"
							type="email"
							placeholder="Email"
							onChange={handleChange}
						/>
						<p>
							<b>Phone</b>
						</p>
						<input
							name="phone"
							type="number"
							placeholder="Phone"
							onChange={handleChange}
						/>
					</div>
					<div className={styles.modal__actions}>
						<div className={styles.actions__container}>
							<button
								className={styles.save__btn}
								onClick={handleAddUser}
							>
								Add
							</button>
							<button
								className={styles.cancel__btn}
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddModal;
