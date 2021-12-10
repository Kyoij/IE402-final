-- CreateTable
CREATE TABLE "Point" (
    "id" SERIAL NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "floor_id" INTEGER NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Floor" (
    "id" SERIAL NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "index" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "building_id" INTEGER NOT NULL,

    CONSTRAINT "Floor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "Floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Floor" ADD CONSTRAINT "Floor_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
