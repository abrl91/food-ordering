import Header from "./components/Layout/Header";
import { useState } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/cartProvider";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCartHandler = () => {
      setIsCartShown(true);
  }

  const hideCartHandler = () => {
      setIsCartShown(false);
  }

  return (
    <CartProvider>
        {isCartShown && <Cart onClose={hideCartHandler}/>}
        <Header onCartBtnClicked={showCartHandler} />
        <main>
            <Meals />
        </main>
    </CartProvider>
  );
}

export default App;
