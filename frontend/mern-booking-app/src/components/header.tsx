import { Link } from "react-router-dom";
import { useAppContext } from "../context/app-context";
import { SignoutButton } from "./signout-button";

export const Header = () => {
	const { isLoggedIn } = useAppContext();
	return (
		<div className="bg-blue-800 py-6">
			<div className="container mx-auto flex justify-between flex-nowrap">
				<span className="text-3xl text-white font-bold tracking-tight">
					<Link to="/">MernHolidays.com</Link>
				</span>
				<span className="flex space-x-2 items-center flex-nowrap">
					{isLoggedIn ? (
						<>
							<Link
								to="/my-bookings"
								className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
							>
								My Bookings
							</Link>
							<Link
								to="/my-hotel"
								className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
							>
								My Hotels
							</Link>
							<SignoutButton />
						</>
					) : (
						<Link
							to="/signin"
							className="flex items-center text-sky-600 px-3 font-bold hover:bg-gray-100"
						>
							Sign in
						</Link>
					)}
				</span>
			</div>
		</div>
	);
};
