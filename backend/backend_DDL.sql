-- public.cases definition
-- Drop table
-- DROP TABLE public.cases;
CREATE TABLE public.cases (
  iso_code varchar(8) NOT NULL,
  "date" date NOT NULL,
  total_cases_per_million float4 NULL,
  CONSTRAINT cases_pkey PRIMARY KEY (iso_code, date)
);

CREATE INDEX cases_date ON public.cases USING btree (date);

CREATE INDEX cases_total ON public.cases USING btree (total_cases_per_million);

-- public.deaths definition
-- Drop table
-- DROP TABLE public.deaths;
CREATE TABLE public.deaths (
  iso_code varchar(8) NOT NULL,
  "date" date NOT NULL,
  total_deaths_per_million float4 NULL,
  CONSTRAINT deaths_pkey PRIMARY KEY (iso_code, date)
);

-- public.vaccinations definition
-- Drop table
-- DROP TABLE public.vaccinations;
CREATE TABLE public.vaccinations (
  iso_code varchar(8) NOT NULL,
  "date" date NOT NULL,
  total_vaccinations_per_hundred varchar(50) NULL,
  CONSTRAINT vaccinations_pkey PRIMARY KEY (iso_code, date)
);

-- public.max_cases_date source
CREATE MATERIALIZED VIEW public.max_cases_date TABLESPACE pg_default AS
SELECT
  iso_code,
  date,
  max(total_cases_per_million) AS max_per_million
FROM
  cases
GROUP BY
  iso_code,
  date WITH DATA;

-- View indexes:
CREATE INDEX matview_cases_date ON public.max_cases_date USING btree (date);

-- public.max_deaths_date source
CREATE MATERIALIZED VIEW public.max_deaths_date TABLESPACE pg_default AS
SELECT
  iso_code,
  date,
  max(total_deaths_per_million) AS max_deaths_per_million
FROM
  deaths
GROUP BY
  iso_code,
  date WITH DATA;

-- View indexes:
CREATE INDEX matview_deaths_date ON public.max_deaths_date USING btree (date);

-- public.max_vaccinations_date source
CREATE MATERIALIZED VIEW public.max_vaccinations_date TABLESPACE pg_default AS
SELECT
  iso_code,
  date,
  max(total_vaccinations_per_hundred :: text) AS max_vaccinations_per_hundred
FROM
  vaccinations
GROUP BY
  iso_code,
  date WITH DATA;

-- View indexes:
CREATE INDEX matview_vaccinations_date ON public.max_vaccinations_date USING btree (date);