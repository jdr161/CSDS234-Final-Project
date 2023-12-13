-- AlterTable
ALTER TABLE "cases" DROP CONSTRAINT "cases_pkey",
DROP COLUMN "total_cases",
ADD COLUMN     "new_cases" REAL,
ADD COLUMN     "new_cases_per_million" REAL,
DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL,
ADD CONSTRAINT "cases_pkey" PRIMARY KEY ("iso_code", "date");

-- AlterTable
ALTER TABLE "deaths" DROP CONSTRAINT "deaths_pkey",
DROP COLUMN "total_deaths",
ADD COLUMN     "new_deaths" REAL,
ADD COLUMN     "new_deaths_per_million" REAL,
DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL,
ADD CONSTRAINT "deaths_pkey" PRIMARY KEY ("iso_code", "date");

-- AlterTable
ALTER TABLE "vaccinations" DROP CONSTRAINT "vaccinations_pkey",
DROP COLUMN "total_vaccinations",
ADD COLUMN     "new_vaccinations" REAL,
ADD COLUMN     "new_vaccinations_smoothed_per_million" REAL,
DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL,
ADD CONSTRAINT "vaccinations_pkey" PRIMARY KEY ("iso_code", "date");

-- AlterTable
ALTER TABLE "country" ADD COLUMN     "population" REAL;

