import clsx from 'clsx';
import React, { forwardRef, SelectHTMLAttributes } from 'react';

// eslint-disable-next-line react/display-name
const Select = forwardRef<HTMLSelectElement, SelectProps & SelectHTMLAttributes<HTMLSelectElement>>(
	({ options, name, className, label, ...rest }, ref) => {
		return (
			<div>
				{!!label && (
					<label htmlFor={name} className="block text-sm font-medium text-gray-700">
						{label}
					</label>
				)}
				<select
					name={name}
					ref={ref}
					{...rest}
					className={clsx(
						'focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
						className,
						{ 'mt-1': !!label }
					)}
				>
					{options?.map((option) => (
						<option value={option.id} key={option.id}>
							{option.name}
						</option>
					))}
				</select>
			</div>
		);
	}
);

export default Select;

// component props
type SelectProps = {
	options?: { id: number; name: string }[];
	label?: string;
};
