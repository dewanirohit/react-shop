import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";

import { mobile } from "../responsive";
import { logout } from "../store/user";

import { useDispatch } from "react-redux";

export default function Navbar() {
	const cartQuantity = useSelector((state) => state.cart.quantity);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	function handleLogout() {
		dispatch(logout());
	}

	return (
		<Container>
			<Wrapper>
				<Left>
					<Logo onClick={() => navigate("/")}>RAD.</Logo>
				</Left>
				<Right>
					{user ? (
						<>
							{`Hello, ${user.username}`}{" "}
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</>
					) : (
						<>
							<Link to="/register">
								<MenuItem>REGISTER</MenuItem>
							</Link>
							<Link to="/login">
								<MenuItem>SIGN IN</MenuItem>
							</Link>
						</>
					)}
					<Link to="/cart">
						<MenuItem>
							<Badge
								badgeContent={cartQuantity}
								color="primary"
								overlap="rectangular"
							>
								<ShoppingCartOutlined />
							</Badge>
						</MenuItem>
					</Link>
				</Right>
			</Wrapper>
		</Container>
	);
}

const Container = styled.div`
	height: 60px;
	${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
	padding: 10px 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ padding: "10px 15px" })}
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;

const Logo = styled.h1`
	font-weight: bold;
	cursor: pointer;
	${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
	font-size: 14px;
	cursor: pointer;
	margin-left: 25px;
	${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
