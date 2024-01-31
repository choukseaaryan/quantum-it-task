const bcrypt = require("bcrypt");
const response = require("../helpers/response");
const handleException = require("../helpers/exception");
const userModel = require("../models/user");

const getUsers = async (req, res) => {
	try {
		const { str, id, sort } = req.query;

		const isNumeric = /^\d+$/.test(str);

		let query = id ? { _id: id } : {};
		let sortQuery;

		if (sort) {
			switch (sort) {
				case "a-z":
					sortQuery = { name: 1 };
					break;
				case "z-a":
					sortQuery = { name: -1 };
					break;
				case "modified":
					sortQuery = { updatedAt: -1 };
					break;
				case "inserted":
					sortQuery = { createdAt: -1 };
					break;
				default:
					sortQuery = { name: 1 };
					break;
			}
		}

		query = isNumeric
			? { ...query, phone: { $regex: str, $options: "i" } }
			: {
					...query,
					$or: [
						{ name: { $regex: str, $options: "i" } },
						{ email: { $regex: str, $options: "i" } },
					],
			  };

		const users = await userModel.find(query).sort(sortQuery);
		if (!users) {
			const obj = {
				res,
				msg: "Users not found",
			};

			return response.error(obj);
		}

		const obj = {
			res,
			msg: "Users found",
			data: users,
		};

		return response.success(obj);
	} catch (err) {
		console.log("Error occured in getUsers: ", err);
		handleException(res, err);
	}
};

const addUser = async (req, res) => {
	try {
		const { name, email, phone } = req.body;

		const user = await userModel.findOne({ email });

		if (user) {
			const obj = {
				res,
				msg: "User already exists",
			};

			return response.error(obj);
		}

		const newUser = await userModel.create({
			name,
			email,
			phone,
		});

		const obj = {
			res,
			msg: "User added",
			data: newUser,
		};

		return response.success(obj);
	} catch (err) {
		console.log("Error occured in addUser: ", err);
		handleException(res, err);
	}
};

const updateUser = async (req, res) => {
	try {
		const { id, name, email, phone } = req.body;

		const user = await userModel.findById(id);

		if (!user) {
			const obj = {
				res,
				msg: "User not found",
			};

			return response.error(obj);
		}

		const updatedUser = await userModel.findByIdAndUpdate(
			id,
			{
				name,
				email,
				phone,
			},
			{ new: true }
		);

		const obj = {
			res,
			msg: "User updated",
			data: updatedUser,
		};

		return response.success(obj);
	} catch (err) {
		console.log("Error occured in updateUser: ", err);
		handleException(res, err);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.query;

		const user = await userModel.findById(id);

		if (!user) {
			const obj = {
				res,
				msg: "User not found",
			};

			return response.error(obj);
		}

		const deleteUser = await userModel.findByIdAndDelete(id);

		const obj = {
			res,
			msg: "User deleted",
			data: deleteUser,
		};

		return response.success(obj);
	} catch (err) {
		console.log("Error occured in deleteUser: ", err);
		handleException(res, err);
	}
};

module.exports = {
	getUsers,
	addUser,
	updateUser,
	deleteUser,
};
