const Profile = ({ name, lastName, email }) => {
  return (
    <form className="profile">
      <div>
        <label>name</label>
        <input readOnly type="text" value={name} />
      </div>
      <div>
        <label>last name</label>
        <input readOnly type="text" value={lastName} />
      </div>
      <div>
        <label>email</label>
        <input readOnly type="email" value={email} />
      </div>
      <div>
        <label>new password</label>
        <input type="password" />
      </div>
      <div>
        <label>confirm password</label>
        <input type="password" />
      </div>
      <button type="submit">save</button>
    </form>
  );
};

export default Profile;
