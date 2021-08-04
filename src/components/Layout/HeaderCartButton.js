import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {
    return <button className={classes.button}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span className={classes.badge}>10</span>
    </button>
}

export default HeaderCartButton;
