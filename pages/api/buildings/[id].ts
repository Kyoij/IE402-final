import supabase from 'libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'GET') {
		try {
			const [buildingData, blocksData] = await Promise.all([
				supabase.from('Building').select('*').eq('id', req.query.id),
				supabase
					.from('Block')
					.select('id,height,index,name,floor_id')
					.eq('building_id', req.query.id)
					.order('index', { ascending: true }),
			]);

			if (buildingData.error || blocksData.error) return res.status(400).json(qr(undefined, buildingData.error || blocksData.error));
			const floorIds = [...new Set<number>(blocksData.data.map((block) => block.floor_id))];
			const pointsData = await Promise.all(
				floorIds.map((floorId) =>
					supabase
						.from('Point')
						.select('*')
						.eq('floor_id', floorId)
						.then((res) => {
							if (res.error) throw new Error(res.error.message);
							else return { floorId, points: res.data };
						})
				)
			);
			const data = {
				info: buildingData.data[0],
				geojson: {
					type: 'FeatureCollection',
					features: blocksData.data.map((block) => ({
						type: 'Feature',
						geometry: {
							type: 'MultiPolygon',
							coordinates: [
								[
									pointsData
										.find((x) => x.floorId == block.floor_id)
										?.points.map((point) => [point.longitude, point.latitude, block.height]) || [],
								],
							],
						},
						properties: { ...block, building: buildingData.data[0].name },
						id: block.id,
					})),
				},
			};

			return res.status(200).json(qr(data, null));
		} catch (err: any) {
			res.status(400).json(qr(undefined, err));
		}
	}
	res.status(400);
}

const qr = (data: any, error: any) => ({ data, error });
