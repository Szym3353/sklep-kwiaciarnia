import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
};

function App() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const navRef = React.useRef(1);
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

  React.useEffect(() => {
    if (products && products.length > 0)
      localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <div className="container">
      <Navbar key={navRef.current} />
      <div className="content">
        <p className="content__heading">Nasze produkty:</p>
        <Gallery items={products} callback={() => (navRef.current += 1)} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
