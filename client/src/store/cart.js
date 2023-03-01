import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			const newItem = action.payload;
			const existingItem = state.products.find(
				(product) => product._id === newItem._id
			);
			state.quantity += action.payload.quantity;

			state.total += action.payload.price * action.payload.quantity;

			if (!existingItem) {
				state.products.push(newItem);
			} else {
				existingItem.quantity += action.payload.quantity;
			}
		},

		removeProduct: (state, action) => {
			const id = action.payload.id;
			const existingItem = state.products.find(
				(product) => product._id === id
			);
			state.quantity--;
			state.total -= action.payload.price;

			if (existingItem.quantity === 1) {
				state.products = state.products.filter(
					(product) => product._id !== id
				);
			} else {
				existingItem.quantity--;
			}
		},

		clearCart: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0;
		},
	},
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
