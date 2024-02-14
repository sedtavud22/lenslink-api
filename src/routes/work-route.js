const express = require("express");

const workController = require("../controllers/work-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
const {
  validateCreateWork,
} = require("../middlewares/validator/validate-work");
const { validateMainImage } = require("../middlewares/validator/validator");

const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 3 },
  ]),
  validateCreateWork,
  validateMainImage,
  workController.createWork
);
router.get("/", workController.getAllWorks);

module.exports = router;
