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

-- CreateTable
CREATE TABLE "country" (
    "iso_code" VARCHAR(50),
    "location" VARCHAR(50),
    "continent" VARCHAR(50)
);

-- CreateTable
CREATE TABLE "newtable" (
    "iso_code" VARCHAR(50) NOT NULL,
    "continent" VARCHAR(50),
    "location" VARCHAR(50),
    "date" VARCHAR(50) NOT NULL,
    "total_cases" REAL,
    "new_cases" REAL,
    "new_cases_smoothed" REAL,
    "total_deaths" REAL,
    "new_deaths" REAL,
    "new_deaths_smoothed" REAL,
    "total_cases_per_million" REAL,
    "new_cases_per_million" REAL,
    "new_cases_smoothed_per_million" REAL,
    "total_deaths_per_million" REAL,
    "new_deaths_per_million" REAL,
    "new_deaths_smoothed_per_million" REAL,
    "reproduction_rate" REAL,
    "icu_patients" VARCHAR(50),
    "icu_patients_per_million" VARCHAR(50),
    "hosp_patients" VARCHAR(50),
    "hosp_patients_per_million" VARCHAR(50),
    "weekly_icu_admissions" VARCHAR(50),
    "weekly_icu_admissions_per_million" VARCHAR(50),
    "weekly_hosp_admissions" VARCHAR(50),
    "weekly_hosp_admissions_per_million" VARCHAR(50),
    "total_tests" VARCHAR(50),
    "new_tests" VARCHAR(50),
    "total_tests_per_thousand" VARCHAR(50),
    "new_tests_per_thousand" VARCHAR(50),
    "new_tests_smoothed" VARCHAR(50),
    "new_tests_smoothed_per_thousand" VARCHAR(50),
    "positive_rate" VARCHAR(50),
    "tests_per_case" VARCHAR(50),
    "tests_units" VARCHAR(50),
    "total_vaccinations" VARCHAR(50),
    "people_vaccinated" VARCHAR(50),
    "people_fully_vaccinated" VARCHAR(50),
    "total_boosters" VARCHAR(50),
    "new_vaccinations" VARCHAR(50),
    "new_vaccinations_smoothed" VARCHAR(50),
    "total_vaccinations_per_hundred" VARCHAR(50),
    "people_vaccinated_per_hundred" VARCHAR(50),
    "people_fully_vaccinated_per_hundred" VARCHAR(50),
    "total_boosters_per_hundred" VARCHAR(50),
    "new_vaccinations_smoothed_per_million" VARCHAR(50),
    "new_people_vaccinated_smoothed" VARCHAR(50),
    "new_people_vaccinated_smoothed_per_hundred" VARCHAR(50),
    "stringency_index" REAL,
    "population_density" REAL,
    "median_age" REAL,
    "aged_65_older" REAL,
    "aged_70_older" REAL,
    "gdp_per_capita" REAL,
    "extreme_poverty" VARCHAR(50),
    "cardiovasc_death_rate" REAL,
    "diabetes_prevalence" REAL,
    "female_smokers" VARCHAR(50),
    "male_smokers" VARCHAR(50),
    "handwashing_facilities" REAL,
    "hospital_beds_per_thousand" REAL,
    "life_expectancy" REAL,
    "human_development_index" REAL,
    "population" REAL,
    "excess_mortality_cumulative_absolute" VARCHAR(50),
    "excess_mortality_cumulative" VARCHAR(50),
    "excess_mortality" VARCHAR(50),
    "excess_mortality_cumulative_per_million" VARCHAR(50),

    CONSTRAINT "newtable_pkey" PRIMARY KEY ("iso_code","date")
);

