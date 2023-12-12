-- CreateTable
CREATE TABLE "cases" (
    "iso_code" VARCHAR(8) NOT NULL,
    "date" VARCHAR(10) NOT NULL,
    "total_cases" REAL,

    CONSTRAINT "cases_pkey" PRIMARY KEY ("iso_code","date")
);

-- CreateTable
CREATE TABLE "deaths" (
    "iso_code" VARCHAR(8) NOT NULL,
    "date" VARCHAR(10) NOT NULL,
    "total_deaths" REAL,

    CONSTRAINT "deaths_pkey" PRIMARY KEY ("iso_code","date")
);

-- CreateTable
CREATE TABLE "vaccinations" (
    "iso_code" VARCHAR(8) NOT NULL,
    "date" VARCHAR(10) NOT NULL,
    "total_vaccinations" VARCHAR(50),

    CONSTRAINT "vaccinations_pkey" PRIMARY KEY ("iso_code","date")
);

