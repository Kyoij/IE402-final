import { Map, Scene } from '@esri/react-arcgis';
import supabase from 'libs/supabase';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import Building from './Building';

const LandmarkMap = () => {
	const { data: buildings } = useSWR(
		'buildings',
		async () => {
			let { data, error: err } = await supabase.from('Building').select('*').order('id', { ascending: false });
			if (err) throw new Error(err.message);
			return data;
		},
		{ onError: (err) => toast.error(err.message) }
	);

	return (
		<Scene
			style={{ width: '100vw', height: 'calc(100vh - 64px)' }}
			mapProperties={{ basemap: 'topo-vector', ground: 'world-elevation' }}
			viewProperties={{
				camera: {
					position: [106.72222137451173, 10.78961379262691, 300],
					heading: 0,
					tilt: 75,
					fov: 120,
				},
				popup: { defaultPopupTemplateEnabled: true },
			}}
		>
			{buildings?.map((building) => (
				<Building id={building.id} key={building.id} />
			))}
		</Scene>
	);
};

export default LandmarkMap;
