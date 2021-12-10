import Tabs from 'components/Tabs';
import { useRouter } from 'next/router';
import React from 'react';
import BuildingTab from './BuildingTab';
import FloorTab from './FloorTab';

const AdminPage = () => {
	const router = useRouter();

	return (
		<Tabs
			tabs={[
				{ id: 'building', label: 'Building', content: <BuildingTab /> },
				{ id: 'floor', label: 'Floor', content: <FloorTab /> },
			]}
		/>
	);
};

export default AdminPage;
