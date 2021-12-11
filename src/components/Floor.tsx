import { loadModules } from 'esri-loader';
import { FC, useEffect, useRef } from 'react';

const Floor: FC<any> = ({ floor, ...props }) => {
	const layerRef = useRef<any>();

	useEffect(() => {
		loadModules(['esri/layers/GeoJSONLayer'])
			.then(([GeoJSONLayer]) => {
				const blob = new Blob([JSON.stringify(floor.geojson)], {
					type: 'application/json',
				});

				// URL reference to the blob
				const url = URL.createObjectURL(blob);
				const layer = new GeoJSONLayer({
					url,
					renderer: {
						type: 'simple',
						symbol: {
							type: 'polygon-3d',
							symbolLayers: [
								{
									type: 'extrude',
									size: floor.info.size,
									material: {
										color: 'rgba(97,195,162,1)',
									},
									edges: {
										type: 'solid',
										color: [50, 50, 50, 1],
									},
								},
							],
						},
					},
				});
				// setGraphic(graphic);
				layerRef.current = layer;
				props.map.layers.add(layer);
			})
			.catch((err) => console.error(err));

		return function cleanup() {
			props.map.layers.remove(layerRef.current);
		};
	}, [floor]);
	return null;
};

export default Floor;
