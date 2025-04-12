-- CreateTable
CREATE TABLE "RSVP" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "guests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "attending" BOOLEAN NOT NULL,
    "foodRestrictions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RSVP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RSVP_email_key" ON "RSVP"("email");
