import { LuHouse, LuStore, LuShoppingCart } from "react-icons/lu";
import styles from "../styleSheet/Navbar.module.css";
import { Link } from "react-router";
import PropTypes from "prop-types";
function ShoppingCart({ numItem }) {
  return (
    console.log(numItem),
    (
      <div className={styles.cartIcon}>
        <Link to="cart" className={styles.cartLink}>
          <LuShoppingCart size={30} />
          <span className={styles.itemCount}>{numItem}</span>
        </Link>
      </div>
    )
  );
}
function Navbar({ numberCartItem }) {
  return (
    <nav className={styles.top}>
      <div>
        <Link to="/" className={styles.homeLink}>
          <h1 className={styles.logo}>
            <span>Buy</span>
            <span>Nest</span>
          </h1>
        </Link>
      </div>
      <div className={styles.icons}>
        <Link to="/shop" className={styles.storeLink}>
          <LuStore size={30} />
        </Link>
        <ShoppingCart numItem={numberCartItem} />
      </div>
    </nav>
  );
}
Navbar.propTypes = {
  numberCartItem: PropTypes.number.isRequired,
};
ShoppingCart.propTypes = {
  numItem: PropTypes.number.isRequired,
};
export default Navbar;
