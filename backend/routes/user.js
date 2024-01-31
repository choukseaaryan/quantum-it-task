const { Router } = require("express");
const userRoute = Router();
const userController = require("../controllers/user");

userRoute.get("/get-users", userController.getUsers);
userRoute.post("/add-user", userController.addUser);
userRoute.put("/edit-user", userController.updateUser);
userRoute.delete("/delete-user", userController.deleteUser);

module.exports = userRoute;