-- CreateTable
CREATE TABLE "Highlights" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Highlights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestions" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queries" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "highlightId" TEXT NOT NULL,

    CONSTRAINT "Queries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Queries" ADD CONSTRAINT "Queries_highlightId_fkey" FOREIGN KEY ("highlightId") REFERENCES "Highlights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
