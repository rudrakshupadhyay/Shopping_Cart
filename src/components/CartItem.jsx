import { useState } from "react";
import PropTypes from "prop-types";
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
CartItem.propTypes = {
  itemsList: PropTypes.array.isRequired,
};
export default CartItem;