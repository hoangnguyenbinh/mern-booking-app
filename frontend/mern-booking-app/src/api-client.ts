import { RegisterFormData } from "./pages/register";
import { SigninFormData } from "./pages/signin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const register = async (formData: RegisterFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/users/register`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});

	const responseBody = await response.json();
	if (!response.ok) {
		throw new Error(responseBody.message);
	}
	return responseBody;
};

export const validateToken = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Token Invalid");
	}
	return response.json();
};

export const signIn = async (formData: SigninFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});

	const responseBody = await response.json();
	if (!response.ok) {
		throw new Error(responseBody.message);
	}
	return responseBody;
};

export const signOut = async () => {
	console.log("trigger");
	const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
		method: "POST",
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Error during sign out");
	}
};
