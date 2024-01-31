const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
	{
		name: {
			type: String,
			default: null,
		},
		email: {
			id: {
				type: String,
				default: null,
			},
			password: {
				type: String,
				default: null,
			},
		},
		dob: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("admin", adminSchema);
