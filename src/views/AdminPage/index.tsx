import Tabs from 'components/Tabs';
import { useUser } from 'contexts/UserContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import FloorTab from './FloorTab';
import BuildingTab from './BuildingTab';
import BlockTab from './BlockTab';

const AdminPage = () => {
	const router = useRouter();
	const { user, isLoading } = useUser();

	useEffect(() => {
		if (isLoading) return;
		if (!user) router.replace('/');
	}, [user]);
	if (!user) return null;
	return (
		<Tabs
			tabs={[
				{ id: 'building', label: 'Building', content: <BuildingTab /> },
				{ id: 'block', label: 'Block', content: <BlockTab /> },
				{ id: 'floor', label: 'Floor', content: <FloorTab /> },
			]}
		/>
	);
};

export default AdminPage;
