import React, { useContext, useState } from "react";
import { ToastMessage } from "../app-context-types";
import Toast from "../components/toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type AppContext = {
	showToast: (toastMessage: ToastMessage) => void;
	isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

	const showToast = (toastMessage: ToastMessage) => setToast(toastMessage);

	const { isError } = useQuery("validateToken", apiClient.validateToken, {
		retry: false,
	});

	const value = { showToast, isLoggedIn: !isError };
	return (
		<AppContext.Provider value={value}>
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(undefined)}
				/>
			)}
			{children}
		</AppContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within AppContextProvider");
	}
	return context as AppContext;
};
