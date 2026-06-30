import homeStyle from "../styleSheet/Home.module.css";
import { Link } from "react-router";
function Home() {
  return (
    <main>
      <section className={homeStyle.heroImage}></section>

      <section className={homeStyle.heroContent}>
        <h1>Shop Smarter, Live Better</h1>
        <p>Discover quality products at unbeatable prices.</p>
        <Link to="/shop" className={homeStyle.button}>
          Shop Now
        </Link>
      </section>
    </main>
  );
}
export default Home;
