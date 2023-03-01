import { loginFailure, loginStart, loginSuccess } from "./user";
import { publicRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		console.log(user);
		const res = await publicRequest.post("/auth/login", user);
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};

export const register = async (userInfo) => {
	try {
		console.log(userInfo);
		await publicRequest.post("/auth/register", userInfo);
	} catch (err) {
		console.log("oops-client");
	}
};
