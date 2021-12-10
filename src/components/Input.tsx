import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps & InputHTMLAttributes<HTMLInputElement>>(
	({ label, className, name, type = 'text', ...rest }, ref) => {
		return (
			<div>
				<label htmlFor={name} className="block text-sm font-medium text-gray-700">
					{label}
				</label>
				<input
					type={type}
					ref={ref}
					name={name}
					className={clsx(
						'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
						className
					)}
					{...rest}
				/>
			</div>
		);
	}
);

export default Input;

// component props
type InputProps = { label: string };
