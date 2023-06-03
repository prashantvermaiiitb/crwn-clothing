import styled from "styled-components";
import { GoogleButton, InvertedButton, BaseButton } from "../button/button.styles";

// !cart container 
const CartContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${GoogleButton},${InvertedButton},${BaseButton} {
    margin-top: auto;
  }
`;

// !empty container
const EmptyMessage = styled.div`
    font-size: 18px;
    margin: 50px auto;
`;

// !cart items
const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

export { CartContainer, EmptyMessage, CartItems };