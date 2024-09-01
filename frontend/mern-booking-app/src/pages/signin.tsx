import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/app-context";
import { Link, useNavigate } from "react-router-dom";
export type SigninFormData = {
	email: string;
	password: string;
};

const SignIn = () => {
	const { register, handleSubmit, formState } = useForm<SigninFormData>();
	const { showToast } = useAppContext();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const mutation = useMutation(apiClient.signIn, {
		onSuccess: async () => {
			showToast({ message: "Log in successfull ", type: "SUCCESS" });
			await queryClient.invalidateQueries("validateToken");

			navigate("/");
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });

			console.log(error.message);
		},
	});

	const onSubmit = (values: SigninFormData) => {
		mutation.mutate(values);
	};
	return (
		<form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="text-3xl">Sign In </h2>
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
			<div className="flex items-center justify-between">
				<span>
					Don&apos;t have an account?{" "}
					<Link to="/register" className="underline cursor-pointer">
						Sign Up
					</Link>
				</span>
				<button
					type="submit"
					className="border rounded-md bg-slate-50 shadow-sm drop-shadow hover:bg-slate-200 py-1 px-3"
				>
					Log in
				</button>
			</div>
		</form>
	);
};

export default SignIn;
