import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";


const Cart = props => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${Math.abs(cartCtx.totalAmount).toFixed(2)}`;
    const hasItems = cartCtx.items > 0;

    const removeItemFromCartHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const addItemToCartHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    }

    const cartItems = <ul className={classes.cartItems}> {
       cartCtx.items.map(({ id, name, amount, price }) => (
               <CartItem
                   key={id}
                   name={name}
                   price={price}
                   amount={amount}
                   onRemove={removeItemFromCartHandler.bind(null, id)}
                   onAdd={addItemToCartHandler.bind(null, {id, name, amount, price})}
               />)
           )
    }
    </ul>
    return <Modal onClose={props.onClose}>
        { cartItems }
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{ totalAmount }</span>
        </div>
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
}

export default Cart;
