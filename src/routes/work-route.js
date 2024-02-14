const express = require("express");

const workController = require("../controllers/work-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
const {
  validateCreateWork,
} = require("../middlewares/validator/validate-work");
const { validateImage } = require("../middlewares/validator/validator");

const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.array("imageUrl", 4),
  validateCreateWork,
  validateImage,
  workController.createWork
);
router.get("/", workController.getAllWorks);

module.exports = router;
