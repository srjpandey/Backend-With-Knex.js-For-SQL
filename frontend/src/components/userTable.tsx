import React from "react";
import { User } from "../types";

type UserTableProps = {
  users: User[];
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
};

const UserTable: React.FC<UserTableProps> = ({ users, onDelete, onEdit }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>
              <div style={{ display: "flex", gap: "8px" }}>
                {" "}
                {/* Flexbox for button alignment */}
                <button
                  className="update-button button"
                  onClick={() => onEdit(user)}
                >
                  {/* Your SVG icon for update */}
                  <svg>{/* Your update icon here */}</svg>
                  <span className="tooltip">Update</span>
                </button>
                <button
                  className="delete-button button"
                  onClick={() => onDelete(user.id)}
                >
                  {/* Your SVG icon for delete */}
                  <svg>{/* Your delete icon here */}</svg>
                  <span className="tooltip">Delete</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
