import Button from 'components/Button';
import Input from 'components/Input';
import { useUser } from 'contexts/UserContext';
import supabase from 'libs/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ChangePasswordPage = () => {
	const { user } = useUser();
	const router = useRouter();
	const { register, handleSubmit, formState } = useForm();

	const onSubmit = async (values: any) => {
		const { error } = await supabase.auth.update(values);
		if (error) toast.error(error.message);
		else toast.success('Change password successfull!');
	};

	if (!user) return null;
	return (
		<section className="flex justify-center items-center h-screen bg-gray-100">
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full bg-white rounded p-6 space-y-4">
				<div className="mb-4">
					<p className="text-gray-600">Change Password</p>
				</div>
				<div>
					<Input label="New Password" type="password" {...register('password', { required: true })} />
				</div>
				<div>
					<Button type="submit" className="w-full" isLoading={formState.isSubmitting}>
						Change Password
					</Button>
				</div>
			</form>
		</section>
	);
};

export default ChangePasswordPage;
