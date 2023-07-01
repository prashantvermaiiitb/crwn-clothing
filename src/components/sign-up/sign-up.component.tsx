import { ChangeEvent, FormEvent, useState } from "react";

import FormInput from "../form-input/form-input.component";

import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import Button from "../button/button.component";
import "./sign-up.styles.scss";
const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={(event: ChangeEvent<HTMLInputElement>) => {
            setDisplayName(event.target.value);
          }}
          label="Display Name"
          required
        ></FormInput>
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={(event: ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          label="Email"
          required
        ></FormInput>
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          label="Password"
          required
        ></FormInput>
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={(event: ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(event.target.value);
          }}
          label="Confirm Password"
          required
        ></FormInput>
        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUp;
