import supabase from 'libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'GET') {
		const floorsData = await supabase.from('Floor').select('id,height,size,index,name,building_id').eq('building_id', req.query.id);

		if (floorsData.error) return res.status(400).json(qr(undefined, floorsData.error));

		const pointsData = await supabase
			.from('Point')
			.select('longitude,latitude,floor_id,floor:Floor(id,height,size,index,name,building_id)')
			.in(
				'floor_id',
				floorsData.data.map((floor) => floor.id)
			);

		if (pointsData.error) return res.status(400).json(qr(undefined, pointsData.error));

		const data = floorsData.data.map((floor) => ({
			info: floor,
			geojson: {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'MultiPolygon',
							coordinates: [
								[
									pointsData.data
										.filter((point) => point.floor_id == floor.id)
										.map((point) => [point.longitude, point.latitude, floor.height]),
								],
							],
						},
						properties: floor,
						id: floor.id,
					},
				],
			},
		}));

		return res.status(200).json(qr(data, null));
	}
	res.status(400);
}

const qr = (data: any, error: any) => ({ data, error });
