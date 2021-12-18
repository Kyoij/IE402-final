import { FC, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { useSWRConfig } from 'swr';
import { Dialog, Transition } from '@headlessui/react';
import Button from 'components/Button';
import Input from 'components/Input';
import supabase from 'libs/supabase';
import Textarea from 'components/Textarea';
import Select from 'components/Select';
import { toast } from 'react-toastify';

const BlockModal: FC<BlockModalProps> = ({ isOpen, onClose, block, building_id }) => {
	const { data: buildings } = useSWR('buildings', async () => {
		let { data } = await supabase.from('Building').select('*').order('id', { ascending: false });
		return data;
	});
	const { data: floors } = useSWR(
		'floors',
		async () => {
			let { data, error: err } = await supabase.from('Floor').select('id,name,points:Point(*)').order('id', { ascending: false });
			if (err) throw new Error(err.message);
			return data;
		},
		{ onError: (err) => toast.error(err.message) }
	);
	const { register, handleSubmit, formState, reset, getValues } = useForm();
	const { mutate } = useSWRConfig();

	const onSubmit = async (values: any) => {
		try {
			if (block) {
				const { data, error, statusText } = await supabase.from('Block').update(values).eq('id', block.id);
				if (!error) {
					mutate(['buildings', building_id, 'blocks']);
					onClose();
					toast.success('Block update successfull!');
				} else {
					toast.error(error.message);
				}
			} else {
				const { data, error, statusText } = await supabase.from('Block').insert([values]);
				if (!error) {
					mutate(['buildings', building_id, 'blocks']);
					onClose();
					toast.success('Block add successfull!');
				} else {
					toast.error(error.message);
				}
			}
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	useEffect(() => {
		if (isOpen) reset(block);
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
								{block ? 'Floor Detail' : 'Add Floor'}
							</Dialog.Title>

							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="mt-2">
									<Select label="Building" options={buildings || []} {...register('building_id')} />
								</div>
								<div className="mt-2">
									<Select label="Floor" options={floors || []} {...register('floor_id')} />
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

export default BlockModal;

// component props
type BlockModalProps = {
	isOpen: boolean;
	onClose: () => any;
	block?: any;
	building_id: number;
};
