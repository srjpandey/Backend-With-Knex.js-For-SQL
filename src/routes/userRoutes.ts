import express from "express";
import {
  getUsers,
  getUser,
  fetchUserByEmail,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/email/:email", fetchUserByEmail);
router.post("/", createUserHandler);
router.put("/:id", updateUserHandler);
router.delete("/:id", deleteUserHandler);

export default router;
