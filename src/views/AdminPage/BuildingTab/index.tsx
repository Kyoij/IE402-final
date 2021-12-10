import BuildingModal from 'components/BuildingModal';
import Button from 'components/Button';
import useDisclosure from 'hooks/useDisclosure';
import supabase from 'libs/supabase';
import useSWR from 'swr';
import BuildingTable from 'components/BuildingTable';

const BuildingTab = () => {
	const addController = useDisclosure();
	const { data } = useSWR('buildings', async () => {
		let { data } = await supabase.from('Building').select('*').order('id', { ascending: false });
		return data;
	});

	return (
		<div>
			<div className="flex justify-end">
				<Button onClick={addController.onOpen}>Add building</Button>
			</div>
			<BuildingTable buildings={data} />
			<BuildingModal isOpen={addController.isOpen} onClose={addController.onClose} />
		</div>
	);
};

export default BuildingTab;
