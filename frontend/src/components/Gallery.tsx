import React from "react";
import "../css/gallery.css";
import type { Product } from "../App";

export default function Gallery({ items }: { items: Product[] }) {
  return (
    <div className="gallery">
      {items.map((item) => (
        <GalleryItem {...item} key={item.id} />
      ))}
    </div>
  );
}

function GalleryItem(data: Product) {
  return (
    <div className="gallery-item">
      <img src={data.imageUrl} />
      <div className="gallery-item__info">
        <p className="gallery-item__title">{data.name}</p>
        <p className="gallery-item__description">{data.description}</p>
        <p className="gallery-item__price">{data.price} zł</p>
      </div>
    </div>
  );
}
