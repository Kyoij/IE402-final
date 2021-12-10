import { FC, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { useSWRConfig } from 'swr';
import { Dialog, Transition } from '@headlessui/react';
import Button from 'components/Button';
import Input from 'components/Input';
import supabase from 'libs/supabase';
import { definitions } from 'types/supabase';
import Textarea from 'components/Textarea';
import Select from 'components/Select';

const FloorModal: FC<FloorModalProps> = ({ isOpen, onClose, floor, building_id }) => {
	const { data: buildings } = useSWR('buildings', async () => {
		let { data } = await supabase.from('Building').select('*').order('id', { ascending: false });
		return data;
	});
	const { register, handleSubmit, formState, reset, getValues } = useForm();
	const { mutate } = useSWRConfig();

	const onSubmit = async (values: any) => {
		try {
			if (floor) {
				const { data, error } = await supabase
					.from('Floor')
					.update([{ building_id: values.building_id, height: values.height, index: values.index, name: values.name }])
					.eq('id', floor.id);
				if (error) return console.log(error);

				const { error: err1 } = await supabase.from('Point').delete().eq('floor_id', floor.id);
				if (err1) return console.log(err1);

				const points = JSON.parse(values.points);
				const { error: err } = await supabase
					.from('Point')
					.insert(points.map((point: any) => ({ longitude: point[0], latitude: point[1], floor_id: data?.[0].id })));

				if (!err) {
					onClose();
					mutate(['building', building_id, 'floors']);
				}
			} else {
				const { data, error } = await supabase
					.from('Floor')
					.insert([{ building_id: values.building_id, height: values.height, index: values.index, name: values.name }]);

				if (error) return console.log(error);

				const points = JSON.parse(values.points);
				const { error: err } = await supabase
					.from('Point')
					.insert(points.map((point: any) => ({ longitude: point[0], latitude: point[1], floor_id: data?.[0].id })));

				if (!error) {
					onClose();
					mutate(['building', building_id, 'floors']);
				}
			}
		} catch (err) {
			console.log(err);
		}

		// try {
		// 	if (floor) {
		// 		const { data, error } = await supabase.from('Building').update(values).eq('id', floor.id);
		// 		if (!error) {
		// 			mutate('buildings');
		// 			onClose();
		// 		}
		// 	} else {
		// 		const { data, error } = await supabase.from('Building').insert([values]);
		// 		if (!error) {
		// 			mutate('buildings');
		// 			onClose();
		// 		}
		// 	}
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	useEffect(() => {
		if (isOpen) {
			reset({
				building_id,
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
									<Select label="Building" options={buildings || []} {...register('building_id')} />
								</div>
								<div className="mt-2">
									<Input
										type="number"
										label="Index"
										{...register('index', { required: true, min: 1, valueAsNumber: true })}
									/>
								</div>
								<div className="mt-2">
									<Input label="Name" {...register('name', { required: true, minLength: 1 })} />
								</div>
								<div className="mt-2">
									<Input
										type="number"
										label="Height"
										step="0.01"
										{...register('height', { required: true, min: 0, valueAsNumber: true })}
									/>
								</div>
								<div className="mt-2">
									<Input
										type="number"
										label="Size"
										step="0.01"
										{...register('size', { required: true, min: 0, valueAsNumber: true })}
									/>
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
														console.log(err);
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
									<Button variant="success" className="ml-2" type="submit" disabled={formState.isSubmitting}>
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
	building_id: number;
};
