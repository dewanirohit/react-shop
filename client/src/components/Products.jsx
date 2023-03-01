import React, { useState, useEffect } from "react";

import axios from "axios";

import styled from "styled-components";

import Product from "./Product";

import { mobile } from "../responsive";

export default function Products({ category, filters, sort }) {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(
					category
						? `http://localhost:5000/api/products?category=${category}`
						: "http://localhost:5000/api/products"
				);
				setProducts(res.data);
			} catch (err) {}
		};
		getProducts();
	}, [category]);

	useEffect(() => {
		category &&
			setFilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(([key, value]) =>
						item[key].includes(value)
					)
				)
			);
	}, [products, category, filters]);

	useEffect(() => {
		if (sort === "newest") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => b.createdAt - a.createdAt)
			);
		} else if (sort === "asc") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.price - b.price)
			);
		} else {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => b.price - a.price)
			);
		}
	}, [sort]);
	return (
		<>
			<Title>Featured Products</Title>
			<Container>
				{category
					? filteredProducts.map((item) => (
							<Product
								item={item}
								key={item._id}
							/>
					  ))
					: products.slice(0, 8).map((item) => (
							<Product
								item={item}
								key={item._id}
							/>
					  ))}
			</Container>
		</>
	);
}

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const Title = styled.h2`
	text-align: center;
	margin-top: 1.5rem;
	${mobile({ display: "none" })}
`;
