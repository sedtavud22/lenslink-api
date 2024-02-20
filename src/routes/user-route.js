const express = require("express");

const userController = require("../controllers/user-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
const {
  validateEditProfile,
} = require("../middlewares/validator/validate-user");

const router = express.Router();

router.get("/:userId", userController.getUserById);
router.patch(
  "/",
  authenticate,
  upload.single("profileImage"),
  validateEditProfile,
  userController.updateUser
);

module.exports = router;
