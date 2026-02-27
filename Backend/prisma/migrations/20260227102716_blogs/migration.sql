-- CreateTable
CREATE TABLE "Blogs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
