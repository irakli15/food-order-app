import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (itemToAdd) => {},
    removeItem: (id) => {}
})

export default CartContext;