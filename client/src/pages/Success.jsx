import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";

import { userRequest } from "../requestMethod";
import { clearCart } from "../store/cart";

import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

import styled from "styled-components";
import { mobile } from "../responsive";

export default function Success() {
	const location = useLocation();
	const data = location.state.stripeData;
	const cart = location.state.products;
	const [orderId, setOrderId] = useState(null);
	const currentUser = useSelector((state) => state.user.currentUser);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	function handleClearCart() {
		dispatch(clearCart());
	}

	useEffect(() => {
		handleClearCart();
	});

	useEffect(() => {
		const createOrder = async () => {
			try {
				const res = await userRequest.post("/orders", {
					userId: currentUser._id,
					products: cart.products.map((item) => ({
						productId: item._id,
						quantity: item.quantity,
					})),
					amount: cart.total,
					address: data.billing_details.address,
				});
				setOrderId(res.data._id);
			} catch (error) {}
		};
		data && createOrder();
	}, [cart, data, currentUser]);

	return (
		<>
			<Navbar />
			<Announcement />
			<Container>
				{orderId
					? `Order has been created successfully.Your order number is ${orderId}`
					: `Please wait. Your order is being processed....`}

				<Button onClick={() => navigate("/")}>Back to homepage</Button>
			</Container>
			<Footer />
		</>
	);
}

const Container = styled.div`
	padding-inline: 20px;
	height: 60vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Button = styled.button`
	padding: 10px;
	margin-top: 20px;
	font-weight: 600;
	cursor: pointer;
	border: none;
	background-color: black;
	color: white;

	&:hover {
		background-color: teal;
	}
`;
