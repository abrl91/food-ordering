import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import {Fragment, useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";


const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${Math.abs(cartCtx.totalAmount).toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const removeItemFromCartHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const addItemToCartHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitted(true);
        await fetch('https://food-ordering-b77d3-default-rtdb.firebaseio.com/oders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items,
            }),
        });

        setIsSubmitted(false);
        setDidSubmit(true);
        cartCtx.clearCart();
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

    const modalActions = <div className={classes.actions}>
        <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModelContent = <Fragment>
           { cartItems }
           <div className={classes.total}>
               <span>Total Amount</span>
               <span>{ totalAmount }</span>
           </div>
           {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler}/>}
           {!isCheckout && modalActions}
       </Fragment>


    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = <p>Order was sent successfully</p>

    return <Modal onClose={props.onClose}>
        {!isSubmitted && !didSubmit && cartModelContent}
        {isSubmitted && isSubmittingModalContent}
        {!isSubmitted && didSubmit && didSubmitModalContent}
    </Modal>
}

export default Cart;
