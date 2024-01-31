require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT || 3001;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

router.use("/", userRoutes);
router.use("/", adminRoutes);

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/v1", router);

require("./config/database");

app.get("/", (req, res) => {
	res.send("Server is ready");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
