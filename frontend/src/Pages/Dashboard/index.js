import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../Components/Modal/delete";
import EditModal from "../../Components/Modal/edit";
import AddModal from "../../Components/Modal/add";
import NoDataComponent from "../../Components/NoDataComponent";
import { GET_USERS } from "../../Redux/actions/user";
import styles from "./dashboard.module.css";

const HomePage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [addModal, setAddModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState(sessionStorage.getItem("sort") || "a-z");
	const [filteredData, setFilteredData] = useState([]);

	const userData = useSelector((state) => state?.user?.users);
	// const data = Array.from({ length: 100 }, (_, i) => ({
	// 	id: i + 1,
	// 	name: `User ${i + 1}`,
	// 	email: `user${i + 1}@example.com`,
	// 	phone: `123456789${i + 1}`,
	// }));

	const totalPages = Math.ceil(filteredData?.length / limit);

	const handlePageChange = (event) => {
		setCurrentPage(Number(event.target.value));
	};

	const handleLimit = (e) => {
		setLimit(e.target.value);
		setCurrentPage(1);
	};

	const handleSort = (e) => {
		sessionStorage.setItem("sort", e.target.value);
		setSort(e.target.value);
	};

	const startIndex = (currentPage - 1) * limit;
	const endIndex = startIndex + limit;
	const currentItems = filteredData?.slice(startIndex, endIndex);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		dispatch(GET_USERS({ str: search, sort }));
		setCurrentPage(1);
	}, [dispatch, search, sort]);

	useEffect(() => {
		setFilteredData(userData);
	}, [userData]);

	return (
		<div className={styles.dashboard__container}>
			<div className={styles.dashboard__container__header}>
				<p>
					Showing &nbsp;
					{
						<select onChange={handleLimit}>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
							<option value={filteredData?.length}>All</option>
						</select>
					}
					&nbsp; Users
				</p>
				<p>
					Page: &nbsp;
					<select value={currentPage} onChange={handlePageChange}>
						{Array.from({ length: totalPages }, (_, i) => (
							<option key={i + 1} value={i + 1}>
								{i + 1}
							</option>
						))}
					</select>
					&nbsp; of {totalPages || 0}
				</p>

				<input
					type="text"
					placeholder="Search By Name/Email/Phone"
					onChange={handleSearch}
				/>
				<div className={styles.sort__container}>
					<p>Sort By:</p>
					<select defaultValue={sort} onChange={handleSort}>
						<option value="a-z">A-Z</option>
						<option value="z-a">Z-A</option>
						<option value="modified">Last Modified</option>
						<option value="inserted">Last Inserted</option>
					</select>
				</div>
			</div>
			<div className={styles.dashboard__container__body}>
				{filteredData ? (
					currentItems.map((user) => (
						<div
							key={user._id}
							className={styles.dashboard__container__body__card}
							onClick={() => navigate(`/details/${user._id}`)}
						>
							<div>
								<p className={styles.name__paragraph}>
									<b>Name:</b> {user.name}
								</p>
								<p>
									<b>Email:</b> {user.email}
								</p>
								<p>
									<b>Phone:</b> {user.phone}
								</p>
							</div>
							<div>
								<i
									onClick={(e) => {
										e.stopPropagation();
										setSelectedUser(user);
										setEditModal(true);
									}}
									className={`bx bx-edit ${styles.bx__edit}`}
								></i>
								<i
									onClick={(e) => {
										e.stopPropagation();
										setSelectedUser(user);
										setDeleteModal(true);
									}}
									className={`bx bx-trash ${styles.bx__trash}`}
								></i>
							</div>
						</div>
					))
				) : (
					<NoDataComponent />
				)}
			</div>

			<button className={styles.add__btn} onClick={() => setAddModal(true)}>
				<i className="bx bx-plus"></i>
			</button>

			{addModal && <AddModal setIsOpen={setAddModal} />}

			{deleteModal && (
				<DeleteModal setIsOpen={setDeleteModal} id={selectedUser._id} />
			)}

			{editModal && (
				<EditModal setIsOpen={setEditModal} user={selectedUser} />
			)}
		</div>
	);
};

export default HomePage;
