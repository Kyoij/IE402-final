import Button from 'components/Button';
import Input from 'components/Input';
import { useUser } from 'contexts/UserContext';
import supabase from 'libs/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {
	const { user } = useUser();
	const router = useRouter();
	const { register, handleSubmit, formState } = useForm();

	const onSubmit = async (values: any) => {
		const { error } = await supabase.auth.api.resetPasswordForEmail(values.email);
		console.log(error);
		if (error) toast.error(error.message);
		else toast.success('Check email!');
	};

	if (user) return null;
	return (
		<section className="flex justify-center items-center h-screen bg-gray-100">
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full bg-white rounded p-6 space-y-4">
				<div className="mb-4">
					<p className="text-gray-600">Forgot Password</p>
				</div>
				<div>
					<Input label="Email" type="email" {...register('email', { required: true })} />
				</div>
				<div>
					<Button type="submit" className="w-full" isLoading={formState.isSubmitting}>
						Reset Password
					</Button>
				</div>
				<div className="flex items-center justify-between">
					<div></div>
					<div>
						<Link href="/signin">
							<a className="text-sm text-blue-600 hover:underline">Sigin</a>
						</Link>
					</div>
				</div>
			</form>
		</section>
	);
};

export default ForgotPasswordPage;
