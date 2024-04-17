"use client";

import Login from "../../components/Login";
import Register from "../../components/Register";
import { useState } from "react";

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(true);
  return (
    <>
      {hasAccount && <Login />}
      {hasAccount || <Register />}
      <div className="auth-container">
        {hasAccount ? (
          <p>
            don't have an account yet?{" "}
            <button onClick={() => setHasAccount(!hasAccount)}>register</button>
          </p>
        ) : (
          <p>
            already have an account?{" "}
            <button onClick={() => setHasAccount(!hasAccount)}>log in</button>
          </p>
        )}
      </div>
    </>
  );
};
export default Auth;
