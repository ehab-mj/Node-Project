import express from "express";
import usersRouter from "./api/users.router.js";
import cardsRouter from "./api/cards.router.js";
import handleError from "../utils/handleError.js";
const router = express.Router();

// http://localhost:3030/api/users
router.use("/users", usersRouter);

router.use("/cards", cardsRouter);

router.get("/", (req, res) => {
  res.send("api sub route");
});

router.use((req, res) => {
  handleError(res, 404, "not found");
});

export default router;
