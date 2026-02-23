import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <p className="content__heading">Nasze produkty:</p>
      </div>
      <Footer />
    </div>
  );
}

export default App;
