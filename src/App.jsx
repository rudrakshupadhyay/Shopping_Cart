import { useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

function App() {
  const [itemsList, setItemsList] = useState([]);
  function addToCart(item) {
    if(itemsList.some((cartItem) => cartItem.id === item.id)) {
      alert("Item already in cart:", item);
      return;
    }
    const newItem = { ...item, quantity: 1 };
    setItemsList((prevItems) => [...prevItems, newItem]);
    console.log("Item added to cart:", newItem);
  }
  function removeFromCart(itemId) {
    setItemsList((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }
  function updateQuantity(itemId, newQuantity) {
    if(newQuantity < 1) {
      return;
    }
    setItemsList((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }
  return (
    <>
      <Navbar numberCartItem={itemsList.length} />
      <Outlet context={{ itemsList, addToCart, removeFromCart, updateQuantity }} />
    </>
  );
}

export default App;
