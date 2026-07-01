import CartStyle from "../styleSheet/Cart.module.css";
import { useOutletContext } from "react-router";
function Cart() {
  const { itemsList, addToCart, removeFromCart, updateQuantity } =
    useOutletContext();
  return itemsList.length > 0 ? (
    <ul className={CartStyle.cartList}>
      {itemsList.map((curr) => {
        return (
          <li key={curr.id} className={CartStyle.currItem}>
            <div className={CartStyle.imageBox}>
              <img
                src={curr.image}
                alt={curr.title}
                className={CartStyle.product}
              />
            </div>
            <div className={CartStyle.info}>
              <div>
                <strong>Product Name:</strong> {curr.title}
              </div>
              <div>
                <strong>Quantity:</strong>{" "}
                <span className={CartStyle.quantity}>{curr.quantity}</span>
              </div>
              <div className={CartStyle.price}>
                <strong>Price:</strong> $
                {(curr.price * curr.quantity).toFixed(2)}
              </div>
              <div className={CartStyle.quantityBnt}>
                <button
                  className={CartStyle.quantityDecrease}
                  onClick={() => updateQuantity(curr.id, curr.quantity - 1)}
                >
                  -
                </button>
                <button
                  className={CartStyle.quantityIncrease}
                  onClick={() => updateQuantity(curr.id, curr.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  className={CartStyle.removeButton}
                  onClick={() => removeFromCart(curr.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <p className={CartStyle.emptyCart}>Nothing in the Cart....</p>
  );
}

export default Cart;
