import { useEffect, useState } from "react";
import getItem from "../services/data";
import ShopStyle from "../styleSheet/Shop.module.css";
import { useOutletContext } from "react-router";

function Shop() {
  const [data, setData] = useState([]);
  const { itemsList, addToCart, removeFromCart } = useOutletContext();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getItem();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div>
      <ul className={ShopStyle.container}>
        {data.map((curr) => {
          return (
            <li key={curr.id}>
              <div className={ShopStyle.imageBox}>
                <img
                  src={curr.image}
                  alt={curr.title}
                  className={ShopStyle.product}
                />
              </div>
              <div className={ShopStyle.productDetails}>
                <div className={ShopStyle.title}>{curr.title}</div>
                <div className={ShopStyle.description}>{curr.description}</div>
                <div className={ShopStyle.price}>${curr.price}</div>
                <div>
                  <button
                    onClick={() => addToCart(curr)}
                    className={ShopStyle.addToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Shop;
