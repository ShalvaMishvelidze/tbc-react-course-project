"use client";

import { User } from "@/utils/interfaces";
// import { addUser, deleteUser, updateUser } from "../utils/actions";
import { ChangeEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";

const Admin = ({ users }: { users: User[] }) => {
  const [selectedUser, setSelectedUser] = useState({
    id: 0,
    username: "",
    email: "",
    age: 0,
    role: "",
  });
  const [newUser, setNewUser] = useState({
    id: 0,
    username: "",
    email: "",
    age: 0,
    role: "",
    password: "",
  });
  const [modal, setModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleEdit = (u: any) => {
    setSelectedUser({ ...u, age: u.age === null ? 0 : u.age });
    setModal(true);
  };
  // const handleDelete = async () =>
  //   // id: number
  //   {
  //     // await deleteUser(id);
  //     location.reload();
  //   };

  const handleSave = async () => {
    // await updateUser(selectedUser);
    setModal(false);
    location.reload();
  };

  const handleRegister = async () => {
    // await addUser(newUser);
    setModal(false);
    setIsRegistering(false);
    location.reload();
  };

  const addNewUserHandler = () => {
    setIsRegistering(true);
    setNewUser({
      id: 0,
      username: "",
      email: "",
      age: 0,
      role: "",
      password: "",
    });
    setModal(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      dataset: { type },
      value,
    } = e.target;
    if (isRegistering) {
      setNewUser({ ...newUser, [type as string]: value });
    } else {
      setSelectedUser({ ...selectedUser, [type as string]: value });
    }
  };

  return (
    <section className="admin">
      <button className="admin-add-btn" onClick={addNewUserHandler}>
        <FaPlus />
      </button>
      {users.map((user) => (
        <article className="user" key={user.id}>
          <div className="user-info-container">
            <h4>
              Username: <span className="user-name">{user.username}</span>
            </h4>
            <h5>
              Email: <span className="user-email">{user.email}</span>
            </h5>
            <h5>
              Role:{" "}
              <span
                className={
                  user.role === "admin" ? "user-role special" : "user-role"
                }
              >
                {user.role}
              </span>
            </h5>
          </div>
          <div className="user-btn-container">
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button
              onClick={
                () => {}
                // handleDelete(user.id)
              }
            >
              Delete
            </button>
          </div>
        </article>
      ))}
      {modal && (
        <div className="modal">
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Username</label>
            <input
              type="text"
              value={isRegistering ? newUser.username : selectedUser.username}
              onChange={handleChange}
              data-type="username"
            />
            <label>Email</label>
            <input
              type="text"
              value={isRegistering ? newUser.email : selectedUser.email}
              onChange={handleChange}
              data-type="email"
            />
            <label>Age</label>
            <input
              type="number"
              value={isRegistering ? newUser.age : selectedUser.age}
              onChange={handleChange}
              data-type="age"
            />
            {isRegistering && (
              <>
                <label>Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={handleChange}
                  data-type="password"
                />
              </>
            )}
            <div className="radio-container">
              <label>user</label>
              <input
                type="radio"
                value={"user"}
                checked={
                  isRegistering
                    ? newUser.role === "user"
                    : selectedUser.role === "user"
                }
                onChange={handleChange}
                data-type="role"
              />
              <label>admin</label>
              <input
                type="radio"
                value={"admin"}
                checked={
                  isRegistering
                    ? newUser.role === "admin"
                    : selectedUser.role === "admin"
                }
                onChange={handleChange}
                data-type="role"
              />
            </div>
            <button onClick={isRegistering ? handleRegister : handleSave}>
              {isRegistering ? "Register" : "Save"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};
export default Admin;
