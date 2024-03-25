import React from "react";

// დაამატეთ შემდეგი გვერდები აპლიკაციაში,
// სადაც მითითებული არაა ყველაფერი სტატიკური უნდა იყოს:
// /profile
// უნდა იყოს გამოტანილი ინფორმაცია მომხმარებელზე (სახელი, გვარი, მეილი...).
// ორი password input: New Password & Confirm New Password.
// ბოლოში შენახვის ღილაკი.

const Profile = ({ name, lastName, email }) => {
  return (
    <form className="profile">
      <div>
        <label>name</label>
        <input type="text" value={name} />
      </div>
      <div>
        <label>lastname</label>
        <input type="text" value={lastName} />
      </div>
      <div>
        <label>email</label>
        <input type="email" value={email} />
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
