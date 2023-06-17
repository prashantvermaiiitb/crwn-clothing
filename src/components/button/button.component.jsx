import { BaseButton, GoogleButton, InvertedButton } from "./button.styles";
// ! not needed buttons are changed to styled component 
// import "./button.styles.scss";
/**
 * Map defining types of buttons and this will be used 
 * else where and we can get rid of the strings passed 
 * in the div or span or container etc.
 */
export const BUTTON_TYPE_CLASSES = {
    base: "base",
    google: "google-sign-in",
    inverted: "inverted",
};

/**
 * Extracting button types from the Map
 * @param {*} buttonType 
 * @returns 
 */
const getCustomButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    return (
        {
            [BUTTON_TYPE_CLASSES.base]: BaseButton,
            [BUTTON_TYPE_CLASSES.google]: GoogleButton,
            [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
        }[buttonType]
    );
}

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    const CustomButton = getCustomButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? 'payment in progress' : children}
        </CustomButton>
    );
};

export default Button;