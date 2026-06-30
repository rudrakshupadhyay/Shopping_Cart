import { useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import "./App.css";

function App() {
  const [itemsList, setItemsList] = useState([]);
  return (
    <>
      <Navbar numberCartItem={itemsList.length} />
      <Outlet/>
    </>
  );
}

export default App;
