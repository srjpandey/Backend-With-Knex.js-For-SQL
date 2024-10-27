import db from "../db/knex";

interface User {
  id?: number;
  name: string;
  email: string;
  age: number;
}

const getAllUsers = () => {
  return db("users").select("*");
};

const getUserById = (id: number) => {
  return db("users").where({ id }).first();
};

const getUserByEmail = (email: string) => {
  return db("users").where({ email }).first();
};

const createUser = (user: User) => {
  return db("users").insert(user);
};

const updateUser = (id: number, user: User) => {
  return db("users").where({ id }).update(user);
};

const deleteUser = (id: number) => {
  return db("users").where({ id }).del();
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
