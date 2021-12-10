import { FC, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { Dialog, Transition } from '@headlessui/react';
import Button from 'components/Button';
import Input from 'components/Input';
import supabase from 'libs/supabase';
import { definitions } from 'types/supabase';

const BuildingModal: FC<BuildingModalProps> = ({ isOpen, onClose, building }) => {
	const { register, handleSubmit, formState, reset } = useForm({ defaultValues: building });
	const { mutate } = useSWRConfig();

	const onSubmit = async (values: definitions['Building']) => {
		try {
			if (building) {
				const { data, error } = await supabase.from('Building').update(values).eq('id', building.id);
				if (!error) {
					mutate('buildings');
					onClose();
				}
			} else {
				const { data, error } = await supabase.from('Building').insert([values]);
				if (!error) {
					mutate('buildings');
					onClose();
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (isOpen) reset(building);
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
								{building ? 'Building Detail' : 'Add Building'}
							</Dialog.Title>

							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="mt-2">
									<Input label="Name" {...register('name', { required: true, minLength: 6 })} />
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

export default BuildingModal;

// component props
type BuildingModalProps = {
	isOpen: boolean;
	onClose: () => any;
	building?: definitions['Building'];
};
