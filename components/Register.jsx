import { register } from "../utils/actions";

const Register = () => {
  return (
    <form className="auth" action={register}>
      <label htmlFor="username">username</label>
      <input name="username" type="text" />
      <label htmlFor="email">email</label>
      <input name="email" type="email" />
      <label htmlFor="password">password</label>
      <input name="password" type="password" />
      <button className="auth-btn" type="submit">
        register
      </button>
    </form>
  );
};
export default Register;
