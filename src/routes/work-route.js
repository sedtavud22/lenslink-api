const express = require("express");

const workController = require("../controllers/work-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
const {
  validateCreateWork,
} = require("../middlewares/validator/validate-work");
const {
  validateCardImage,
  validatePhotographer,
} = require("../middlewares/validator/validator");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validatePhotographer,
  upload.fields([
    { name: "cardImage", maxCount: 1 },
    { name: "subImages", maxCount: 3 },
  ]),
  validateCreateWork,
  validateCardImage,
  workController.createWork
);
router.get("/", workController.getAllWorks);

module.exports = router;
