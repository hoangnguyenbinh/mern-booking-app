import { useEffect } from "react";
import { ToastMessage } from "../app-context-types";

export type ToastProps = ToastMessage & { onClose: () => void };

const Toast = ({ message, type, onClose }: ToastProps) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 5000);
		return () => {
			clearTimeout(timer);
		};
	}, [onClose]);
	const styles =
		type === "SUCCESS"
			? "fixed top-4 right-4 z-50 p-4 rounded-md bg-emerald-500 max-w-md transition ease-out"
			: "fixed top-4 right-4 z-50 p-4 rounded-md bg-rose-500 max-w-md transition ease-out";
	return (
		<div className={styles}>
			<div className="flex justify-center items-center">
				<span className="text-lg font-semibold">{message}</span>
			</div>
		</div>
	);
};

export default Toast;
