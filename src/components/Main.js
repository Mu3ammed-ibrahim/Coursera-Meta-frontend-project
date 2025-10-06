// Import images
import greekSalad from "../assets/greek salad.jpg";
import bruchetta from "../assets/bruchetta.svg";
import lemonDessert from "../assets/lemon dessert.jpg";
import cheifA from "../assets/Mario and Adrian A.jpg";
import cheifB from "../assets/Mario and Adrian b.jpg";
import CustomersSay from "./CustomersSay";

function Main({ availableTimes, onDateChange }) {
  return (
    <main>
      {/* Specials Section */}
      <section id="menu" className="specials">
        <div className="specials-header">
          <h2 className="section-title">This week specials</h2>
          <button className="btn">Online Menu</button>
        </div>
        <div className="specials-grid">
          <article className="card">
            <img src={greekSalad} alt="Greek Salad" />
            <h3 className="card-title">
              Greek Salad <span className="price">$12.99</span>
            </h3>
            <p className="card-text">
              Refreshing salad with crispy lettuce, peppers, olives and feta
              cheese.
            </p>
            <a href="#">Order a delivery</a>
          </article>
          <article className="card">
            <img src={bruchetta} alt="Bruschetta" />
            <h3>
              Bruschetta <span className="price">$5.99</span>
            </h3>
            <p>Grilled bread with garlic, tomatoes, olive oil and basil.</p>
            <a href="#">Order a delivery</a>
          </article>
          <article className="card">
            <img src={lemonDessert} alt="Lemon Dessert" />
            <h3>
              Lemon Dessert <span className="price">$4.99</span>
            </h3>
            <p>Delicious lemon-flavored dessert with a modern twist.</p>
            <a href="#">Order a delivery</a>
          </article>
        </div>
      </section>

      <CustomersSay />

      {/* About Section */}
      <section id="about" className="about" aria-labelledby="about-heading">
        <h2 id="about-heading" className="section-title">
          About
        </h2>
        <div className="about-grid">
          <article className="about-content">
            <h3>Little Lemon</h3>
            <h4>Chicago</h4>
            <p className="card-text">
              Little Lemon is a family-owned Mediterranean restaurant, offering
              authentic recipes with a modern twist.
            </p>
          </article>
          <figure className="about-images">
            <img
              src={cheifA}
              alt="Chef Mario preparing a delicious meal"
              className="img-top"
            />
            <img
              src={cheifB}
              alt="Chef Adrian garnishing a dish"
              className="img-bottom"
            />
          </figure>
        </div>
      </section>
    </main>
  );
}

export default Main;
