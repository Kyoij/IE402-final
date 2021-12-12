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
import { toast } from 'react-toastify';

const QuickAddBuildingModal: FC<QuickAddBuildingModalProps> = ({ isOpen, onClose }) => {
	const { register, handleSubmit, formState, reset, getValues } = useForm();
	const { mutate } = useSWRConfig();

	const onSubmit = async (values: any) => {
		try {
			const geojson = JSON.parse(values.geojson);

			// add building
			const addBuildingData = await supabase.from('Building').insert([{ name: values.name, size: values.size, color: values.color }]);
			if (addBuildingData.error) return toast.error(addBuildingData.error.message);

			// add floor
			geojson.features.forEach(async (feature: any, index: any) => {
				const { data, error } = await supabase.from('Floor').insert([
					{
						building_id: addBuildingData.data[0].id,
						height: values.size * index,
						index: index + 1,
						name: `Tầng ${index + 1}`,
					},
				]);

				if (error) return toast.error(error.message);

				const { error: err } = await supabase.from('Point').insert(
					feature.geometry.coordinates[0][0].map((point: any) => ({
						longitude: point[0],
						latitude: point[1],
						floor_id: data?.[0].id,
					}))
				);

				if (!err) {
					onClose();
					mutate('buildings');
					toast.success('Building add successfull!');
				} else {
					toast.error(err.message);
				}
			});
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	useEffect(() => {
		if (isOpen) reset();
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
								Quick Add
							</Dialog.Title>

							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="mt-2">
									<Input label="Name" {...register('name', { required: true, minLength: 6 })} />
								</div>
								<div className="mt-2">
									<Input
										label="Size"
										type="number"
										step={0.01}
										{...register('size', { required: true, min: 0, valueAsNumber: true })}
									/>
								</div>
								<div className="mt-2">
									<Input label="Color" {...register('color', { required: true })} />
								</div>
								<div className="mt-2">
									<Textarea label="GeoJson" rows={10} {...register('geojson', { required: true })} />
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

export default QuickAddBuildingModal;

// component props
type QuickAddBuildingModalProps = {
	isOpen: boolean;
	onClose: () => any;
};
