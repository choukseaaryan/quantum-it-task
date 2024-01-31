const { Router } = require("express");
const adminRoute = Router();
const adminController = require("../controllers/admin");

adminRoute.post("/login", adminController.login);
adminRoute.post("/signup", adminController.signup);

module.exports = adminRoute;