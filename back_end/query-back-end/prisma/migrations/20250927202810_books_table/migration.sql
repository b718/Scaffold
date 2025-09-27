-- CreateTable
CREATE TABLE "public"."Books" (
    "bookId" TEXT NOT NULL,
    "bookAuthor" TEXT NOT NULL,
    "bookChapters" TEXT[],
    "bookTtile" TEXT NOT NULL,
    "bookPublishDate" TIMESTAMP(3) NOT NULL,
    "bookImageUrl" TEXT NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("bookId")
);
