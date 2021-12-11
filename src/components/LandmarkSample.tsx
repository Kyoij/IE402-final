import { loadModules } from 'esri-loader';
import React, { FC, useEffect, useRef } from 'react';

const LandmarkSample: FC<any> = ({ ...props }) => {
	const layerRef = useRef<any>();

	useEffect(() => {
		loadModules(['esri/layers/GeoJSONLayer'])
			.then(([GeoJSONLayer]) => {
				const layer = new GeoJSONLayer({
					url: '/landmark_81.geojson',
					renderer: {
						type: 'simple',
						symbol: {
							type: 'polygon-3d',
							symbolLayers: [
								{
									type: 'extrude',
									size: 5.6,
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
	}, []);
	return null;
};

export default LandmarkSample;
