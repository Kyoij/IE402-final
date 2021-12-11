import clsx from 'clsx';
import React, { FC, ButtonHTMLAttributes } from 'react';
import LoadingIcon from './LoadingIcon';

const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
	variant = 'primary',
	type = 'button',
	isLoading,
	className,
	children,
	...rest
}) => {
	return (
		<button
			type={type}
			className={clsx(
				'text-white px-6 py-2 rounded font-medium transition duration-200 each-in-out',
				{
					'bg-blue-500 hover:bg-blue-600': variant === 'primary',
					'bg-gray-500 hover:bg-gray-600': variant === 'secondary',
					'bg-green-500 hover:bg-green-600': variant === 'success',
					'bg-green-600 hover:bg-green-700': variant === 'info',
					'bg-yellow-500 hover:bg-yellow-600': variant === 'warning',
					'bg-red-500 hover:bg-red-600': variant === 'danger',
					'bg-gray-700 hover:bg-gray-800': variant === 'dark',
				},
				className
			)}
			{...rest}
		>
			<div className="relative">
				<span className={clsx({ 'opacity-0': isLoading })}>{children}</span>
				{isLoading && (
					<span className="absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2">
						<LoadingIcon />
					</span>
				)}
			</div>
		</button>
	);
};

export default Button;

// component props
type ButtonProps = {
	variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';
	isLoading?: boolean;
};
