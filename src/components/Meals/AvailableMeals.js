import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://food-ordering-b77d3-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error('something went wrong :(');
            }

            const responseData = await response.json();
            const ladedMeals = [];
            for (let mealId in responseData) {
                ladedMeals.push({
                    id: mealId,
                    name: responseData[mealId].name,
                    description: responseData[mealId].description,
                    price: responseData[mealId].price,
                });
            }

            setMeals(ladedMeals);
            setIsLoading(false);
        }

        fetchMeals()
            .catch(error => {
                setIsLoading(false);
                setError(error.message);
            });
    }, []);

    if (isLoading) {
        return <section className={classes.mealsLoading}>
            <h1>Loading...</h1>
        </section>
    }

    if (error) {
        return <section className={classes.mealsError}>
            <h1>{error}</h1>
        </section>
    }

    const mealsList = meals.map(meal => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
        )
    );
    return <section className={classes.meals}>
        <Card>
            <ul>
                { mealsList }
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;
