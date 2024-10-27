import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./components/userTable";

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (fetchError) {
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/users", newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "", age: "" });
    } catch (error: any) {
      setError(
        error.response?.data?.error ||
          "An error occurred while adding the user."
      );
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      age: user.age.toString(),
    });
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingUser) {
      try {
        const response = await axios.put(
          `http://localhost:3000/users/${editingUser.id}`,
          newUser
        );

        // Optionally update the state with the response data for the edited user
        // This is not strictly necessary if you're fetching again
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? response.data : user
          )
        );

        // Reset editing state
        setEditingUser(null);
        setNewUser({ name: "", email: "", age: "" });

        // Re-fetch users to ensure you have the latest data
        const updatedResponse = await axios.get("http://localhost:3000/users");
        setUsers(updatedResponse.data);
      } catch (error: any) {
        setError(
          error.response?.data?.error ||
            "An error occurred while updating the user."
        );
      }
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error: any) {
      setError(
        error.response?.data?.error ||
          "An error occurred while deleting the user."
      );
    }
  };

  return (
    <div className="container">
      <header>
        <h1>User List</h1>
      </header>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
          required
        />
        <button type="submit">{editingUser ? "Update" : "Add User"}</button>
      </form>

      <UserTable
        users={users}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
      />
    </div>
  );
};

export default App;
