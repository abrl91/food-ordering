import {Fragment, useRef, useState} from "react";
import classes from './Checkout.module.css';

const Checkout = props => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = streetInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = !isNotFiveChar(enteredPostalCode);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid,
        });

        const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredPostalCodeIsValid && enteredStreetIsValid;
        if (!formIsValid) return;

        // submit the cart data
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity,
        });
    }

    const isEmpty = value => value.trim() === '';
    const isNotFiveChar = value => value.trim().length < 5;


    return <Fragment>
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameInputRef}/>
            </div>
            {!formInputsValidity.name && <p>Please enter a valid name</p>}
            <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef}/>
            </div>
            {!formInputsValidity.street && <p>Please enter a valid street</p>}
            <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`}>
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" id="postalCode" ref={postalCodeInputRef}/>
            </div>
            {!formInputsValidity.postalCode && <p>Please enter a valid postal code</p>}
            <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef}/>
            </div>
            {!formInputsValidity.city && <p>Please enter a valid postal city</p>}
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    </Fragment>
}

export default Checkout;
