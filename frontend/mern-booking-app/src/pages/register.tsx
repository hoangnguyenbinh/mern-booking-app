import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";
import { useAppContext } from "../context/app-context";
import { Link, useNavigate } from "react-router-dom";
export type RegisterFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	const navigate = useNavigate();
	const { showToast } = useAppContext();
	const { register, handleSubmit, watch, formState } =
		useForm<RegisterFormData>();
	const mutation = useMutation(apiClient.register, {
		onSuccess: () => {
			showToast({ message: "Registration Success", type: "SUCCESS" });
			navigate("/");
		},
		onError: (error: Error) => {
			console.log(error);
			showToast({ message: error.message, type: "ERROR" });
		},
	});
	const onSubmit = async (value: RegisterFormData) => {
		mutation.mutate(value);
	};
	return (
		<form
			className="flex flex-col gap-5 max-w-[700px] mx-auto"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h2 className="text-3xl font-bold">Create an account</h2>
			<div className="flex flex-col md:flex-row gap-5 ">
				<div>
					<label className="text-zinc-700 text-sm font-bold flex-1">
						First Name
						<input
							className="border rounded w-full py-1 px-2 font-normal"
							{...register("firstName", { required: "This field is required" })}
						/>
					</label>
					{formState.errors.firstName && (
						<span className="   text-rose-500">
							{formState.errors.firstName.message}
						</span>
					)}
				</div>
				<div>
					<label className="text-zinc-700 text-sm font-bold flex-1">
						Last Name
						<input
							className="border rounded-md w-full py-1 px-2 font-normal"
							{...register("lastName", { required: "This field is required" })}
						/>
					</label>
					{formState.errors.lastName && (
						<p className="   text-rose-500">
							{formState.errors.lastName.message}
						</p>
					)}
				</div>
			</div>
			<label className="text-zinc-700 text-sm font-bold flex-1">
				Email
				<input
					type="email"
					className="border rounded-md w-full py-1 px-2 font-normal"
					{...register("email", { required: "This field is required" })}
				/>
				{formState.errors.email && (
					<p className=" p-2  text-rose-500">
						{formState.errors.email.message}
					</p>
				)}
			</label>
			<label className="text-zinc-700 text-sm font-bold flex-1">
				Password
				<input
					type="password"
					className="border rounded-md w-full py-1 px-2 font-normal"
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 6,
							message: "Password must be at least 6 characters",
						},
					})}
				/>
				{formState.errors.password && (
					<p className="   text-rose-500">
						{formState.errors.password.message}
					</p>
				)}
			</label>
			<label className="text-zinc-700 text-sm font-bold flex-1">
				Confirm password
				<input
					type="password"
					className="border rounded-md w-full py-1 px-2 font-normal"
					{...register("confirmPassword", {
						validate: (val) => {
							if (!val) {
								return "This field is required";
							}
							if (val !== watch("password")) {
								return "Password does not match";
							}
						},
					})}
				/>
				{formState.errors.confirmPassword && (
					<p className="   text-rose-500">
						{formState.errors.confirmPassword.message}
					</p>
				)}
			</label>
			<span className=" flex items-center justify-between">
				<span>
					Already Have An Account?{" "}
					<Link to="/signin" className="underline cursor-pointer">
						Log In
					</Link>
				</span>
				<button
					type="submit"
					className="bg-blue-600 text-white px-3 py-2 font-bold hover:bg-blue-500 text-xl rounded-md"
				>
					Register
				</button>
			</span>
		</form>
	);
};

export default Register;
