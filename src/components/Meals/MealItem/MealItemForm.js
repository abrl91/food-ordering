import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = props => {
 const [amountIsValid, setAmountIsValid] = useState(true);
 const amountInputRef = useRef();

 const submitHandler = event => {
   event.preventDefault();
   const enteredAmount = amountInputRef.current.value;
   const enteredAmountNumber = +enteredAmount;

   const validation = {
    isEmpty: enteredAmount.trim().length === 0,
    isValidAmount: enteredAmountNumber < 1 || enteredAmount > 5,
   }

   if (validation.isEmpty || validation.isValidAmount) {
    setAmountIsValid(false);
    return;
   }

   props.onAddToCart(enteredAmountNumber);
 }

 const generateInputId = `amount_${props.id}`;
 return <form className={classes.form} onSubmit={submitHandler}>
  <Input ref={amountInputRef} label="Amount" input={
   {id: generateInputId, type: 'number', min: 1, max: 5, step: 1, defaultValue: 1}
  }/>
  <button>+ Add</button>
  {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
 </form>
}

export default MealItemForm;
