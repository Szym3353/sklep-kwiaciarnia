import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
};

function App() {
  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) throw new Error("Something went wrong");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  });

  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <p className="content__heading">Nasze produkty:</p>
        {products.map((p) => (
          <span>{p.name}</span>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
