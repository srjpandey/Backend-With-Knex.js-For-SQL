import { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} from "../models/userModel";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await getUserById(Number(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
};

export const fetchUserByEmail = async (req: Request, res: Response) => {
  const user = await getUserByEmail(req.params.email);
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
};

export const createUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser = req.body;

    if (!newUser.name || !newUser.email || !newUser.age) {
      res.status(400).json({ error: "Name, email, and age are required" });
      return;
    }

    if (newUser.age < 0) {
      res.status(400).json({ error: "Age must be a positive number" });
      return;
    }

    const existingUser = await getUserByEmail(newUser.email);

    if (existingUser) {
      res
        .status(400)
        .json({ error: "User with the same email already exists" });
      return;
    }

    const [id] = await createUser(newUser);
    res.json({ id, ...newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  const updatedUser = req.body;
  await updateUser(Number(req.params.id), updatedUser);
  res.json({ message: "User updated" });
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  await deleteUser(Number(req.params.id));
  res.json({ message: "User deleted" });
};
