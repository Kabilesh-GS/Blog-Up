-- CreateTable
CREATE TABLE "Favourite" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "blogID" INTEGER NOT NULL,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_userID_blogID_key" ON "Favourite"("userID", "blogID");

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_blogID_fkey" FOREIGN KEY ("blogID") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
