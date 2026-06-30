import { useState } from "react";

function CartItem({itemsList}) {


  return (
    <>
      {itemsList.length === 0 ? (
        <p>Nothing in the Cart</p>
      ) : (
        <div>
          {itemsList.map((curritem) => {
            
          })}
        </div>
      )}
    </>
  );
}

export default CartItem;