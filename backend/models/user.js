const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		name: {
			type: String,
			default: null,
		},
		email: {
			type: String,
			default: null,
		},
		phone: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("user", userSchema);
