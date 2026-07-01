let cachedProducts = null;

async function getItem() {
  if (cachedProducts) {
    return cachedProducts;
  }

  console.log("getItem is called");
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  cachedProducts = data;
  return data;
}

export default getItem;
