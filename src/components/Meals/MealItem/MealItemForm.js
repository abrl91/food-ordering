import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";

const MealItemForm = props => {
 const generateInputId = `amount_${Math.floor(100000 + Math.random() * 900000)}`;
 return <form className={classes.form}>
  <Input label="Amount" input={
   {id: generateInputId, type: 'number', min: 1, max: 5, step: 1, defaultValue: 1}
  }/>
  <button>+ Add</button>
 </form>
}

export default MealItemForm;
