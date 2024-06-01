"use client";

const Logout = ({ setIsLoggedIn }: any) => {
  return <button onClick={() => setIsLoggedIn(false)}>log out</button>;
};
export default Logout;
