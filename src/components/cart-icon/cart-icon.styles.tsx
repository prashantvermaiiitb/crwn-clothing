import styled from "styled-components";
/**
 * !TS is not able to find this module for SVGs, we have to update our Tsconfig.
 * !need to tell TS to search for alternative file types and include them in react world.
 * !this is where we have to declare a global type as before like when we added something to the window.
 * !So we will be adding a global file to add additional global type into which is <name>.d.ts.
 * !d.ts is a special file that TS is looking for.
 * !we need to tell here typescript about the
 */

/**
 * after declaring in custom.d.ts error will be updated to now "we are exporting a string hence this is not 
 * an exportable react component"
 */
import { ReactComponent as ShoppingSVG } from "../../assets/shopping-bag.svg";

const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ShoppingIcon = styled(ShoppingSVG)`
  width: 24px;
  height: 24px;
`;

const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;

export { CartIconContainer, ShoppingIcon, ItemCount };
