import { Map, Scene } from '@esri/react-arcgis';
import supabase from 'libs/supabase';
import { useEffect } from 'react';
import useSWR from 'swr';
import Building from './Building';
import LandmarkSample from './LandmarkSample';

const LandmarkMap = () => {
	const { data: buildings } = useSWR('buildings', async () => {
		let { data } = await supabase.from('Building').select('*').order('id', { ascending: false });
		return data;
	});

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
			}}
		>
			{buildings?.map((building) => (
				<Building id={building.id} key={building.id} />
			))}
			{/* <LandmarkSample /> */}
		</Scene>
	);
};

export default LandmarkMap;
