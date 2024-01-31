const bcrypt = require("bcrypt");
const response = require("../helpers/response");
const handleException = require("../helpers/exception");
const adminModel = require("../models/admin");

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const adminData = await adminModel.findOne({ "email.id": email });

		if (!adminData) {
			const obj = {
				res,
				msg: "Email Does Not Exist",
			};

			return response.error(obj);
		}

		if (!bcrypt.compareSync(password, adminData?.email?.password)) {
			const obj = {
				res,
				msg: "Incorrect Password",
			};

			return response.error(obj);
		}

		const obj = {
			res,
			msg: "Login Successful",
			data: adminData,
		};
		return response.success(obj);
	} catch (err) {
		console.log("Error occured in login: ", err);
		handleException(res, err);
	}
};

const signup = async (req, res) => {
	try {
		const { name, email, password, dob } =
			req.body;

		const adminData = await adminModel.findOne({ "email.id": email });

		if (adminData) {
			const obj = {
				res,
				msg: "Email Already Exists",
			};

			return response.error(obj);
		}

		const passwordHash = bcrypt.hashSync(password, 10);

		const newAdminData = await adminModel.create({
			name,
			email: {
				id: email,
				password: passwordHash,
			},
			dob,
		});

		const obj = {
			res,
			msg: "Registration Successful",
			data: newAdminData,
		};

		return response.success(obj);
	} catch (err) {
		console.log("Error occured in signup: ", err);
		handleException(res, err);
	}
};

module.exports = {
	login,
	signup,
};
