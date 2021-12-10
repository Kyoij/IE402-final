import { Map, Scene } from '@esri/react-arcgis';

const LandmarkMap = () => {
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
		/>
	);
};

export default LandmarkMap;
