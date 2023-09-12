-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "favoriteById" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_favoriteById_fkey" FOREIGN KEY ("favoriteById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
