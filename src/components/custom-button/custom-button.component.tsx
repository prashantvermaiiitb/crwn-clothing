// ! Do not need this any more now.
// import './custom-button.styles.scss';
import { FC } from 'react';
import Button from '../button/button.component';

type CustomButtonProps = {
  children:React.ReactNode;
};

const CustomButton:FC<CustomButtonProps> = ({ children, ...otherProps }) => {
    return (
        <Button {...otherProps}>{children}</Button>
    )
}

export default CustomButton;