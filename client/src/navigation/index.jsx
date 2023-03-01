import React from "react";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Success from "../pages/Success";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useSelector } from "react-redux";

export default function Navigation() {
	const user = useSelector((state) => state.user.currentUser);

	return (
		<Router basename="/">
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>

				<Route
					path="/products?/:category"
					element={<ProductList />}
				/>

				<Route
					path="/product/:id"
					element={<Product />}
				/>

				<Route
					path="/cart"
					element={<Cart />}
				/>

				<Route
					path="/success"
					element={<Success />}
				/>

				<Route
					path="/login"
					element={
						user ? (
							<Navigate
								to="/"
								replace
							/>
						) : (
							<Login />
						)
					}
					replace
				/>

				<Route
					path="/register"
					element={
						user ? (
							<Navigate
								to="/"
								replace
							/>
						) : (
							<Register />
						)
					}
					replace
				/>
			</Routes>
		</Router>
	);
}
