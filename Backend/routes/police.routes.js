const express = require("express");
const router = express.Router();
const { body, check } = require("express-validator");
const policeController = require("../controllers/police.controller");
const { authPolice } = require("../middlewares/auth.middleware");

// Registration route
router.post(
  "/register",
  [
    check("name").not().isEmpty().withMessage("Name is required"),
    check("mobileNumber").isNumeric().withMessage("Mobile number must be a valid number"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    check("badgeNumber").not().isEmpty().withMessage("Badge number is required"),
    check("location.longitude").isNumeric().withMessage("Longitude must be a number"),
    check("location.latitude").isNumeric().withMessage("Latitude must be a number"),
  ],
  policeController.registerPolice
);

// Login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password is too short"),
  ],
  policeController.loginPolice
);

// Profile route
router.get("/profile", authPolice, policeController.getPoliceProfile);

// Logout route
router.post("/logout", authPolice, policeController.logoutPolice);

router.patch('/approve/:policeId', authPolicePersonnel, policeController.approvePolice);

module.exports = router;