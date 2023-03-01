import React from "react";

import styled from "styled-components";

import { categories } from "../data";

import { mobile } from "../responsive";

import CategoryItem from "./CategoryItem";

export default function Categories() {
	return (
		<>
			<Title>Categories</Title>
			<Container>
				{categories.map((item) => (
					<CategoryItem
						item={item}
						key={item.id}
					/>
				))}
			</Container>
		</>
	);
}

const Container = styled.div`
	display: flex;
	padding: 20px;
	justify-content: space-between;
	${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Title = styled.h2`
	text-align: center;
	margin-top: 1.5rem;
	${mobile({ marginBlock: "1rem" })}
`;
