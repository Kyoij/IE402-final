import clsx from 'clsx';
import React, { FC, ButtonHTMLAttributes } from 'react';

const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
	variant = 'primary',
	type = 'button',
	className,
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
		/>
	);
};

export default Button;

// component props
type ButtonProps = {
	variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';
};
