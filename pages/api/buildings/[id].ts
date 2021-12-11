import supabase from 'libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'GET') {
		const [buildingData, floorsData] = await Promise.all([
			supabase.from('Building').select('*').eq('id', req.query.id),
			supabase.from('Floor').select('id,height,index,name').eq('building_id', req.query.id).order('index', { ascending: true }),
		]);

		if (buildingData.error || floorsData.error) return res.status(400).json(qr(undefined, buildingData.error || floorsData.error));

		const pointsData = await supabase
			.from('Point')
			.select('longitude,latitude,floor_id,floor:Floor(id,height,index,name,building_id)')
			.in(
				'floor_id',
				floorsData.data.map((floor) => floor.id)
			);

		if (pointsData.error) return res.status(400).json(qr(undefined, pointsData.error));

		const data = {
			info: buildingData.data[0],
			geojson: {
				type: 'FeatureCollection',
				features: floorsData.data.map((floor) => ({
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
					properties: { ...floor, building: buildingData.data[0].name },
					id: floor.id,
				})),
			},
		};

		return res.status(200).json(qr(data, null));
	}
	res.status(400);
}

const qr = (data: any, error: any) => ({ data, error });
