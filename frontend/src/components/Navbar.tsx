import "../css/navbar.css";

export default function Navbar() {
  const options: { val: string; url: string }[] = [
    { val: "Katalog", url: "/" },
    { val: "O nas", url: "/" },
  ];
  return (
    <div className="navbar">
      <h1 className="navbar__heading">Kwiaciarnia Rosa</h1>
      <div className="navbar__options">
        {options.map((o) => (
          <p className="navbar__option">{o.val}</p>
        ))}
      </div>
    </div>
  );
}
