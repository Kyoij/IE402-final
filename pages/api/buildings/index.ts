import supabase from 'libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'GET') {
		const { data: buildings, error } = await supabase.from('Building').select('*');
		return res.status(200).json({ data: buildings, error });
	}
	res.status(400);
}
