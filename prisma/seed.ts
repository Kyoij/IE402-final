import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
	// await prisma.point.create({ data: { latitude: 10, longitude: 19 } });
};

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
