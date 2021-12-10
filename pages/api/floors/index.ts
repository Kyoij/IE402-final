import { NextApiRequest, NextApiResponse } from 'next';

export default function (req: NextApiRequest, res: NextApiResponse) {
	if (req.method == 'GET') {
		res.status(200).json({ name: req.method });
	}
	res.status(400);
}
