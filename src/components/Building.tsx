import { FC, useEffect, useRef } from 'react';
import {} from '@esri/react-arcgis';
import useSWR from 'swr';
import { loadModules } from 'esri-loader';
import { toast } from 'react-toastify';

const Building: FC<any> = ({ id, ...props }) => {
	const layerRef = useRef<any>();
	const { data, error } = useSWR(
		['buildings', id, 'geojson'],
		() =>
			fetch(`/api/buildings/${id}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.error) throw new Error(data.error.message);
					else return data.data;
				}),
		{ onError: (err) => toast.error(err.message), shouldRetryOnError: true, errorRetryInterval: 1000 }
	);

	useEffect(() => {
		if (!data) return;
		loadModules(['esri/layers/GeoJSONLayer'])
			.then(([GeoJSONLayer]) => {
				const blob = new Blob([JSON.stringify(data.geojson)], {
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
									size: data.info.size,
									material: {
										color: data.info.color,
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
				layerRef.current = layer;
				props.map.layers.add(layer);
			})
			.catch((err) => toast.error(err.message));

		return function cleanup() {
			props.map.layers.remove(layerRef.current);
		};
	}, [data]);

	return null;
};

export default Building;
