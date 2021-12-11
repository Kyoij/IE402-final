import Tabs from 'components/Tabs';
import { useUser } from 'contexts/UserContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BuildingTab from './BuildingTab';
import FloorTab from './FloorTab';

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
				{ id: 'floor', label: 'Floor', content: <FloorTab /> },
			]}
		/>
	);
};

export default AdminPage;
