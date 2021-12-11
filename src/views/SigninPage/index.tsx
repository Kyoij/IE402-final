import Button from 'components/Button';
import Input from 'components/Input';
import { useUser } from 'contexts/UserContext';
import supabase from 'libs/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const SigninPage = () => {
	const { user } = useUser();
	const router = useRouter();
	const { register, handleSubmit } = useForm();

	const onSubmit = async (values: any) => {
		const { error } = await supabase.auth.signIn(values);
		console.log(error);
	};

	useEffect(() => {
		if (user) router.replace('/');
	}, [user]);

	if (user) return null;
	return (
		<section className="flex justify-center items-center h-screen bg-gray-100">
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full bg-white rounded p-6 space-y-4">
				<div className="mb-4">
					<p className="text-gray-600">Sign In</p>
					<h2 className="text-xl font-bold">Join our community</h2>
				</div>
				<div>
					<Input label="Email" type="email" {...register('email', { required: true })} />
				</div>
				<div>
					<Input label="Password" type="password" {...register('password', { required: true })} />
				</div>
				<div>
					<Button type="submit" className="w-full">
						Sign In
					</Button>
				</div>
				<div className="flex items-center justify-between">
					<div></div>
					<div>
						<Link href="/forgot_password">
							<a className="text-sm text-blue-600 hover:underline">Forgot password?</a>
						</Link>
					</div>
				</div>
			</form>
		</section>
	);
};

export default SigninPage;
