import "../css/footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <p className="footer__info">
          Telefon: <span>+48 123 456 789</span>
        </p>
        <p className="footer__info">
          Mail: <span>kwiaciarnia@gmail.com</span>
        </p>
      </div>
      <p className="copy">Copyright © 2026</p>
    </div>
  );
}
