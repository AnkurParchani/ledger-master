const express = require("express");

const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.post("/login", authController.login);

router.use(authController.protect);

router.route("/me").get(userController.getUser);
router.route("/updateMe").patch(userController.updateMe);
router.route("/deleteMe").delete(userController.deleteUser);

module.exports = router;
