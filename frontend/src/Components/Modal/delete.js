import React from "react";
import { useDispatch } from "react-redux";
import styles from "./modal.module.css";
import { DELETE_USER, GET_USERS } from "../../Redux/actions/user";

const DeleteModal = ({ setIsOpen, id }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(DELETE_USER({ id })).then((res) => {
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
						<h5 className={styles.heading}>Delete User</h5>
					</div>
					<button
						className={styles.close__btn}
						onClick={() => setIsOpen(false)}
					>
						<i className="bx bx-x"></i>
					</button>
					<div className={styles.modal__content}>
						<p>Are you sure you want to delete the user?</p>
					</div>
					<div className={styles.modal__actions}>
						<div className={styles.actions__container}>
							<button
								className={styles.delete__btn}
								onClick={handleDelete}
							>
								Delete
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

export default DeleteModal;
