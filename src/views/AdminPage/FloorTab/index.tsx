import Button from 'components/Button';
import useDisclosure from 'hooks/useDisclosure';
import supabase from 'libs/supabase';
import useSWR from 'swr';
import BuildingTable from 'components/BuildingTable';
import FloorTable from 'components/FloorTable';
import FloorModal from 'components/FloorModal';
import { toast } from 'react-toastify';

const FloorTab = () => {
	const addController = useDisclosure();
	const { data, error } = useSWR(
		'floors',
		async () => {
			let { data, error: err } = await supabase.from('Floor').select('id,name,points:Point(*)').order('id', { ascending: false });
			if (err) throw new Error(err.message);
			return data;
		},
		{ onError: (err) => toast.error(err.message) }
	);

	return (
		<div>
			<div className="flex justify-end">
				<Button onClick={addController.onOpen}>Add floor</Button>
			</div>
			<FloorTable floors={data} isLoading={!error && !data} />
			<FloorModal isOpen={addController.isOpen} onClose={addController.onClose} />
		</div>
	);
};

export default FloorTab;
