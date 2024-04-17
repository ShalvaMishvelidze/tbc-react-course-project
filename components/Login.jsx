import { clearUser, login } from "../utils/actions";

const Login = () => {
  return (
    <>
      <form className="auth" action={login}>
        <label htmlFor="username">username</label>
        <input name="username" type="text" />
        <label htmlFor="password">password</label>
        <input name="password" type="password" />
        <button className="auth-btn" type="submit">
          log in
        </button>
      </form>
    </>
  );
};
export default Login;
