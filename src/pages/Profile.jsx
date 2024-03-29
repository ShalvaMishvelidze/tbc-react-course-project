import { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "john",
    lastName: "doe",
    email: "johndoe@example.com",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.dataset.type]: e.target.value,
    }));
  };

  return (
    <form className="profile" onSubmit={handleSubmit}>
      <div>
        <label>name</label>
        <input
          type="text"
          value={user.name}
          data-type={"name"}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>last name</label>
        <input
          type="text"
          value={user.lastName}
          data-type={"lastName"}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>email</label>
        <input
          type="email"
          value={user.email}
          data-type={"email"}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>new password</label>
        <input
          type="password"
          value={user.newPassword}
          data-type={"newPassword"}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>confirm password</label>
        <input
          type="password"
          value={user.confirmPassword}
          data-type={"confirmPassword"}
          onChange={handleChange}
        />
      </div>
      <button type="submit" onSubmit={handleSubmit}>
        save
      </button>
    </form>
  );
};

export default Profile;
