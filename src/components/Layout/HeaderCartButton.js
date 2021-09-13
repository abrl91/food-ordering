import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    const numOfCartItems = items.reduce((currNum, item) => {
       return currNum + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${isBtnHighlighted ? classes.bump: ''}`;

    useEffect(() => {
        if (!cartCtx.items.length) return;

        setIsBtnHighlighted(true);

        const timer = setTimeout(() => {
            setIsBtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }

    }, [items, cartCtx.items.length]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span className={classes.badge}>{numOfCartItems}</span>
    </button>
}

export default HeaderCartButton;
