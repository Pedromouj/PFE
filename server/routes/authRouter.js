const express = require("express");
const {
  authenticateController,
  SincrireController,
} = require("../controllers/UserController");
const authRouter = express.Router();

// Define user routes
authRouter.post("/login", authenticateController);

authRouter.post("/sincrire", SincrireController);

module.exports = authRouter;
