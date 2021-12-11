import { FC, useEffect } from 'react';
import {} from '@esri/react-arcgis';
import useSWR from 'swr';
import Floor from './Floor';

const Building: FC<any> = ({ id, ...props }) => {
	const { data, error } = useSWR(['buildings', id, 'geojson'], () =>
		fetch(`/api/buildings/${id}`)
			.then((res) => res.json())
			.then((data) => data.data)
	);

	return (
		<>
			{data?.map((floor: any) => (
				<Floor floor={floor} {...props} key={floor.info.id} />
			))}
		</>
	);
};

export default Building;
