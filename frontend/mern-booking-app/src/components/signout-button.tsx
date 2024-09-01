import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/app-context";
import { useNavigate } from "react-router-dom";
export const SignoutButton = () => {
	const { showToast } = useAppContext();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const mutation = useMutation(apiClient.signOut, {
		onSuccess: async () => {
			await queryClient.invalidateQueries("validateToken");
			showToast({ message: "Signed Out!", type: "SUCCESS" });
			navigate("/");
		},
	});

	return (
		<button
			onClick={() => mutation.mutate()}
			className="text-blue-600 font-bold bg-white hover:bg-gray-100 p-1 rounded-md"
		>
			Sign out
		</button>
	);
};
