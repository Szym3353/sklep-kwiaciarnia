import React from "react";
import "../css/navbar.css";
import type { Product } from "../App";
import { Link, useNavigate } from "react-router";

let initialCartItems = { count: 0, price: 0 };

export default function Navbar() {
  const navigate = useNavigate();
  const options: { val: string; url: string }[] = [
    { val: "Katalog", url: "/" },
    { val: "O nas", url: "/" },
  ];

  let [cartItems, setCartItems] = React.useState(initialCartItems);

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems(initialCartItems);
  };

  React.useEffect(() => {
    let currCart = localStorage.getItem("cart");
    if (!currCart) return;

    let currCartFixed: Product[] = JSON.parse(currCart);
    let priceSum = currCartFixed.reduce((acc, item) => acc + item.price, 0);

    let newCartItems = { count: currCartFixed.length, price: priceSum };

    setCartItems(newCartItems);
  }, []);

  return (
    <div className="navbar">
      <h1 className="navbar__heading">Kwiaciarnia Rosa</h1>
      <div className="navbar__options">
        {options.map((o) => (
          <Link to={o.url} className="navbar__option">
            {o.val}
          </Link>
        ))}
      </div>
      <div>
        <p className="navbar__cart-info">
          Produktów w koszu:{" "}
          <strong>
            {cartItems.count} - {cartItems.price} zł.
          </strong>
        </p>
        <div className="navbar__cart-buttons">
          <button onClick={() => navigate("/cart")}>Koszyk</button>
          <button onClick={clearCart}>Wyczyść</button>
        </div>
      </div>
    </div>
  );
}
