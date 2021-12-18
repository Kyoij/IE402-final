import Button from 'components/Button';
import BlockModal from 'components/BlockModal';
import BlockTable from 'components/BlockTable';
import Select from 'components/Select';
import useDisclosure from 'hooks/useDisclosure';
import supabase from 'libs/supabase';
import React, { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { toast } from 'react-toastify';

const BlockTab = () => {
	const { data: buildings } = useSWR(
		'buildings',
		async () => {
			let { data, error: err } = await supabase.from('Building').select('*').order('id', { ascending: false });
			if (err) throw new Error(err.message);
			return data;
		},
		{ onError: (err) => toast.error(err.message) }
	);
	const [selectedBuilding, setSelectedBuilding] = useState<number>(buildings?.[0]?.id);
	const addController = useDisclosure();
	const { data, error } = useSWR(
		selectedBuilding ? ['buildings', selectedBuilding, 'blocks'] : null,
		async () => {
			let { data, error: err } = await supabase
				.from('Block')
				.select(
					`id,
					height,
					index,
					name,
					floor_id,
					building_id`
				)
				.eq('building_id', selectedBuilding)
				.order('index', { ascending: false });
			if (err) throw new Error(err.message);
			return data;
		},
		{ onError: (err) => toast.error(err.message) }
	);

	useEffect(() => {
		if (!selectedBuilding && buildings) setSelectedBuilding(buildings[0]?.id);
	}, [buildings]);

	return (
		<div>
			<div className="flex justify-between">
				<Select options={buildings || []} value={selectedBuilding} onChange={(e) => setSelectedBuilding(Number(e.target.value))} />
				<Button onClick={addController.onOpen}>Add Block</Button>
			</div>
			<BlockTable blocks={data} isLoading={!!selectedBuilding && !error && !data} />
			<BlockModal isOpen={addController.isOpen} onClose={addController.onClose} building_id={selectedBuilding} />
		</div>
	);
};

export default BlockTab;
