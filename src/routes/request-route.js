const express = require("express");
const workController = require("../controllers/work-controller");
const requestController = require("../controllers/request-controller");
const { validateWorkId } = require("../middlewares/validator/validate-work");
const {
  validateClient,
  validatePhotographer,
} = require("../middlewares/validator/validator");
const {
  validateRequest,
} = require("../middlewares/validator/validate-request");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();
const subRouter = express.Router({ mergeParams: true });

router.get(
  "/user/:userId",
  authenticate,
  requestController.getRequestsByUserId
);
router.get(
  "/:requestId",
  authenticate,
  requestController.getRequestByRequestId
);

router.use("/works/:workId", subRouter);
subRouter.use(validateWorkId, workController.checkExistingWork);

subRouter.post(
  "/",
  validateClient,
  validateRequest,
  requestController.sendRequest
);
subRouter.patch(
  "/accept",
  validatePhotographer,
  requestController.acceptRequest
);
subRouter.patch(
  "/reject",
  validatePhotographer,
  requestController.rejectRequest
);
subRouter.patch("/cancel", validateClient, requestController.cancelRequest);
subRouter.patch("/complete", validateClient, requestController.completeRequest);

module.exports = router;
