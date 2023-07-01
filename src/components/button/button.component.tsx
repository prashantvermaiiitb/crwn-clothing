import { ButtonHTMLAttributes, FC } from "react";
import { BaseButton, GoogleButton, InvertedButton } from "./button.styles";
// ! not needed buttons are changed to styled component
// import "./button.styles.scss";
/**
 * Map defining types of buttons and this will be used
 * else where and we can get rid of the strings passed
 * in the div or span or container etc.
 */
export enum BUTTON_TYPE_CLASSES {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
}

/**
 * Extracting button types from the Map
 * it's reutning to us 1 of the 3 styled component buttons. base button is a component.
 * These all are variations of styled component buttons.
 * @param {*} buttonType
 * @returns
 */
const getCustomButton = (
  buttonType = BUTTON_TYPE_CLASSES.base
): typeof BaseButton => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};

/**
 * todo : we have to be carefull while defining children, this should have been done by the libraries that are integrated
 * todo : we should try to; see the types libraries included, since we are using Functional component we can import in FC
 * todo : type from the react. This button is going to be of FC type so we will be making this button component of this FC type.
 * todo : with ButtonHtmlAtributes we are allowing OtherProps to be there and telling that HTMLBUttonElement will have attributes 
 * todo : which are relevent to HTML input button.
 */
export type ButtonProps = {
  // ! first we will define our props
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * todo we need to think how this button component is going to render so we have to define button Props.
 * todo: since this is a functional component so using react/FC as the type and ButtonProps type defined here.
 * todo : children will be inferred by the ButtonProps.
 * @param param0
 * @returns
 */
const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  ...otherProps
}: ButtonProps) => {
  const CustomButton = getCustomButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
