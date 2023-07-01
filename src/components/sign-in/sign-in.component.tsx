import { ChangeEvent, FormEvent, useState } from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";

import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // const { user } = await customSignInWithEmailAndPassword(auth, email, password);
      dispatch(emailSignInStart(email, password));
      // console.log("🚀 ~ file: sign-in.component.jsx:23 ~ SignIn ~ handleSubmit= ~ user:", user);
      setEmail("");
      setPassword("");
      // setFormFields(defaultFormFields);
      // setCurrentUser(user);
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * Instead of triggering function for the Sign-In with google
   * button we are going to do dispatch now, later SAGA will be
   * taking care of launching the Google Sign-In form for us.
   */
  const handleSignInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          name="email"
          required
          type="email"
          value={email}
          handleChange={(event: ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />
        <FormInput
          label="password"
          name="password"
          required
          type="password"
          value={password}
          handleChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
        />
        <div className="buttons">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            onClick={handleSignInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
