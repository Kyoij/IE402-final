import Tabs from 'components/Tabs';
import { useUser } from 'contexts/UserContext';
import React from 'react';
import BuildingTab from './BuildingTab';
import FloorTab from './FloorTab';

const AdminPage = () => {
	const { user } = useUser();

	if (!user) return null;

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
