import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		const existingItemIndex = state.items.findIndex(
			(item) => action.item.id === item.id
		);
		const existingItem = state.items[existingItemIndex];

		let updatedItems;
		if (existingItem) {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === "REMOVE") {
		const itemIndex = state.items.findIndex((item) => item.id === action.id);
		const existingItem = state.items[itemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;
		if (existingItem.amount > 1) {
			const updatedItem = {...existingItem, amount: existingItem.amount - 1};
			updatedItems = [...state.items];
			updatedItems[itemIndex] = updatedItem;
		} else {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCardAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemHandler = (item) => {
		dispatchCardAction({ type: "ADD", item: item });
	};

	const removeItemHandler = (id) => {
		dispatchCardAction({ type: "REMOVE", id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
