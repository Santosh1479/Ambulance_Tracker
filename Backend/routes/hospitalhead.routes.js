const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const hospitalController = require("../controllers/hospitalhead.controller");

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  hospitalController.registerHospital
);

router.post(
  "/login",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  hospitalController.loginHospital
);

module.exports = router;