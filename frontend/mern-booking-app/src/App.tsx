import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Layout from "../src/layouts/layout";
import Register from "./pages/register";
import SignIn from "./pages/signin";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Layout>
							<p>Home Page</p>
						</Layout>
					}
				/>
				<Route
					path="/register"
					element={
						<Layout>
							<Register />
						</Layout>
					}
				/>
				<Route
					path="/signin"
					element={
						<Layout>
							<SignIn />
						</Layout>
					}
				/>
				<Route path="*" element={<Navigate replace to="/" />} />
			</Routes>
		</Router>
	);
}

export default App;
