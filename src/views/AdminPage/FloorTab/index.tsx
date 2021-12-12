import Button from 'components/Button';
import FloorModal from 'components/FloorModal';
import FloorTable from 'components/FloorTable';
import Select from 'components/Select';
import useDisclosure from 'hooks/useDisclosure';
import supabase from 'libs/supabase';
import React, { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

const FloorTab = () => {
	const { cache } = useSWRConfig();
	const { data: buildings } = useSWR('buildings', async () => {
		let { data } = await supabase.from('Building').select('*').order('id', { ascending: false });
		return data;
	});
	const [selectedBuilding, setSelectedBuilding] = useState<number>(buildings?.[0]?.id);
	const addController = useDisclosure();
	const { data, error } = useSWR(selectedBuilding ? ['building', selectedBuilding, 'floors'] : null, async () => {
		let { data } = await supabase
			.from('Floor')
			.select(
				`id,
				building_id,
				height,
				index,
				name,
				points:Point(*)`
			)
			.eq('building_id', selectedBuilding)
			.order('index', { ascending: false });
		return data;
	});

	useEffect(() => {
		if (!selectedBuilding && buildings) setSelectedBuilding(buildings[0]?.id);
	}, [buildings]);

	return (
		<div>
			<div className="flex justify-between">
				<Select options={buildings || []} value={selectedBuilding} onChange={(e) => setSelectedBuilding(Number(e.target.value))} />
				<Button onClick={addController.onOpen}>Add Floor</Button>
			</div>
			<FloorTable floors={data} isLoading={!error && !data} />
			<FloorModal isOpen={addController.isOpen} onClose={addController.onClose} building_id={selectedBuilding} />
		</div>
	);
};

export default FloorTab;
