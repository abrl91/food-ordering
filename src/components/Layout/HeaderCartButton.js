import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const numOfCartItems = cartCtx.items.reduce((currNum, item) => {
       return currNum + item.amount;
    }, 0);

    return <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span className={classes.badge}>{numOfCartItems}</span>
    </button>
}

export default HeaderCartButton;
