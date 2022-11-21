import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm({setShowModal}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ credential, password }))
    .then(() => setShowModal(false))
    .catch(
      async (res) => {

        const data = await res.json();

        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemoUserSubmit = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential:"Demo-lition", password:'password'}))
    .then(() => setShowModal(false))
    .catch(
      async (res) => {

        const data = await res.json();

        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <span className="login-header">Login</span>
      <ul className="login-errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email"
        />
      </label>
      <label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder={"Password"}
        />
      </label>
      <button className="LoginButton" type="submit">Continue</button>
      <button className="DemoUserButton" onClick={handleDemoUserSubmit}>Login as Demo User</button>
    </form>
  );
}

export default LoginForm;
