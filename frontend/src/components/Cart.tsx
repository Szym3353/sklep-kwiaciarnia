import React from "react";
import "../css/cart.css";
import type { Product } from "../App";

type CartItem = Product & { quantity: number };

export default function Cart() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    const rawData = localStorage.getItem("cart");
    if (rawData) {
      const products: Product[] = JSON.parse(rawData);

      const grouped = products.reduce((acc: CartItem[], item) => {
        const existing = acc.find((i) => i.id === item.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          acc.push({ ...item, quantity: 1 });
        }
        return acc;
      }, []);

      setCartItems(grouped);
    }
  }, []);

  const updateLocalStorage = (newItems: CartItem[]) => {
    const flatList: Product[] = [];
    newItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        const { quantity, ...productOnly } = item;
        flatList.push(productOnly);
      }
    });
    localStorage.setItem("cart", JSON.stringify(flatList));
    setCartItems(newItems);
  };

  const removeItem = (id: number) => {
    const filtered = cartItems.filter((item) => item.id !== id);
    updateLocalStorage(filtered);
  };

  const totalPrice = React.useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  if (cartItems.length === 0) {
    return <div className="cart-empty">Twój koszyk jest pusty.</div>;
  }

  return (
    <div className="cart-container">
      <h2>Twój Koszyk</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="cart-item__image"
            />

            <div className="cart-item__details">
              <h3 className="cart-item__name">{item.name}</h3>
              <p className="cart-item__description">{item.description}</p>
            </div>

            <div className="cart-item__actions">
              <div className="cart-item__price-info">
                <span className="cart-item__quantity">
                  Ilość: {item.quantity}
                </span>
                <span className="cart-item__price">
                  {item.price * item.quantity} zł
                </span>
              </div>
              <button
                className="cart-item__remove"
                onClick={() => removeItem(item.id)}
              >
                Usuń
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <span>Suma całkowita:</span>
        <strong>{totalPrice} zł</strong>
      </div>
    </div>
  );
}
