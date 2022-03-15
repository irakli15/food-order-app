import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);

	const numberOfCartItems = cartCtx.items.reduce(
		(sum, item) => sum + item.amount,
		0
	);

	const [buttonIsHighlited, setButtonIsHighlited] = useState(false);
	const btnClasses = `${classes.button} ${
		buttonIsHighlited ? classes.bump : ""
	}`;

	useEffect(() => {
		if (cartCtx.items.length === 0) {
			return;
		}
		setButtonIsHighlited(true);

		const timer = setTimeout(() => {
			setButtonIsHighlited(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		}
	}, [cartCtx.items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
