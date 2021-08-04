import { Fragment } from "react";
import headerBackgroundImg from '../../assets/images/vegan-bowls-bgr.jpeg';
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1>Food Ordering</h1>
            <HeaderCartButton />
        </header>
        <div className={classes['main-image']}>
            <img src={headerBackgroundImg} alt="header background" />
        </div>
    </Fragment>
}

export default Header;
