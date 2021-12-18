import { FC, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { Dialog, Transition } from '@headlessui/react';
import Button from 'components/Button';
import Input from 'components/Input';
import supabase from 'libs/supabase';
import { toast } from 'react-toastify';
import Textarea from 'components/Textarea';

const FloorModal: FC<FloorModalProps> = ({ isOpen, onClose, floor }) => {
	const { register, handleSubmit, formState, reset } = useForm({ defaultValues: floor });
	const { mutate } = useSWRConfig();

	const onSubmit = async (values: any) => {
		try {
			if (floor) {
				const { data, error } = await supabase
					.from('Floor')
					.update([
						{
							name: values.name,
						},
					])
					.eq('id', floor.id);

				if (error) return toast.error(error.message);

				const { error: err1 } = await supabase.from('Point').delete().eq('floor_id', floor.id);
				if (err1) return toast.error(err1.message);

				const points = JSON.parse(values.points);
				const { error: err } = await supabase
					.from('Point')
					.insert(points.map((point: any) => ({ longitude: point[0], latitude: point[1], floor_id: data?.[0].id })));
				if (!err) {
					onClose();
					mutate('floors');
					toast.success('Floor update successfull!');
				} else {
					toast.error(err.message);
				}
			} else {
				const { data, error } = await supabase.from('Floor').insert([
					{
						name: values.name,
					},
				]);
				if (error) return toast.error(error.message);

				const points = JSON.parse(values.points);
				const { error: err } = await supabase
					.from('Point')
					.insert(points.map((point: any) => ({ longitude: point[0], latitude: point[1], floor_id: data?.[0].id })));

				if (!err) {
					onClose();
					mutate('floors');
					toast.success('Floor create successfull!');
				} else {
					toast.error(err.message);
				}
			}
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	useEffect(() => {
		if (isOpen) {
			reset({
				...floor,
				points: floor ? JSON.stringify(floor.points.map((point: any) => [point.longitude, point.latitude])) : '',
			});
		}
	}, [isOpen]);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
				<div className="min-h-screen px-4 text-center ">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-50" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="inline-block h-screen align-middle" aria-hidden="true">
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
							<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
								{floor ? 'Floor Detail' : 'Add Floor'}
							</Dialog.Title>

							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="mt-2">
									<Input label="Name" {...register('name', { required: true, minLength: 6 })} />
								</div>
								<div className="mt-2">
									<Textarea
										label="Points"
										rows={10}
										{...register('points', {
											validate: {
												array: (value) => {
													try {
														const arr = JSON.parse(value);
														if (typeof arr !== 'object') return false;
														if (!(arr.length >= 0)) return false;
														if (
															arr.some((point: any) => {
																if (typeof point !== 'object') return true;
																if (!(point.length >= 2)) return true;
																return false;
															})
														)
															return false;
														return true;
													} catch (err) {
														return false;
													}
												},
											},
										})}
									/>
								</div>
								<div className="mt-4 flex justify-end ">
									<Button variant="secondary" onClick={onClose}>
										Cancel
									</Button>
									<Button variant="success" className="ml-2" type="submit" isLoading={formState.isSubmitting}>
										Submit
									</Button>
								</div>
							</form>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default FloorModal;

// component props
type FloorModalProps = {
	isOpen: boolean;
	onClose: () => any;
	floor?: any;
};
