import Image from "../assets/restauranfood.jpg";

function Header() {
  return (
    <header className="hero">
      <div className="hero-text">
        <h1 className="header-title">Little Lemon</h1>
        <h2 className="header-subtitle">Chicago</h2>
        <p className="card-text">
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <button className="btn">Reserve a Table</button>
      </div>
      <div className="hero-image">
        <img src={Image} alt="Delicious food" />
      </div>
    </header>
  );
}

export default Header;
