import React from "react";
import "../css/gallery.css";
import type { Product } from "../App";

export default function Gallery({ items }: { items: Product[] }) {
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc" | null>(null);
  const sortedItems = React.useMemo(() => {
    if (!sortOrder) return items;

    return [...items].sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      return b.price - a.price;
    });
  }, [items, sortOrder]);

  return (
    <div className="gallery">
      <div className="gallery__filters">
        <button onClick={() => setSortOrder("asc")}>Cena: od najniższej</button>
        <button onClick={() => setSortOrder("desc")}>
          Cena: od najwyższej
        </button>
        <button onClick={() => setSortOrder(null)}>Resetuj</button>
      </div>
      <div className="gallery-content">
        {sortedItems.map((item) => (
          <GalleryItem {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

function GalleryItem(data: Product) {
  const handleCart = () => {
    let currCart = localStorage.getItem("cart");
    if (currCart) {
      let currCartConverted: Product[] = JSON.parse(currCart);
      currCartConverted.push(data);
      localStorage.setItem("cart", JSON.stringify([...currCartConverted]));
    } else {
      localStorage.setItem("cart", JSON.stringify([data]));
    }
  };

  return (
    <div className="gallery-item">
      <button className="gallery-item__cart" onClick={handleCart}>
        Dodaj do kosza
      </button>
      <img src={data.imageUrl} />
      <div className="gallery-item__info">
        <p className="gallery-item__title">{data.name}</p>
        <p className="gallery-item__description">{data.description}</p>
        <p className="gallery-item__price">{data.price} zł</p>
      </div>
    </div>
  );
}
