import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./context/app-context.tsx";
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
		},
	},
});
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppContextProvider>
				<App />
			</AppContextProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);

// https://www.youtube.com/watch?v=YdBy9-0pER4&t=1673s 4:23
