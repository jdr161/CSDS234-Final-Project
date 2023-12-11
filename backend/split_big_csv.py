#!/usr/bin/env python3

import pandas as pd
from conf_values import *

country_attributes = ['iso_code', 'location', 'continent']
cases_attributes = ['iso_code', 'date', 'total_cases']
deaths_attributes = ['iso_code', 'date', 'total_deaths']
vaccinations_attributes = ['iso_code', 'date', 'total_vaccinations']

df = pd.read_csv(PATH_TO_DIR + CSV_NAME)

def create_df(attributes, filename):
    df[attributes].to_csv(filename, index=False)

def create_all():
    create_df(country_attributes, PATH_TO_DIR + "country.csv")
    create_df(cases_attributes, PATH_TO_DIR + "cases.csv")
    create_df(deaths_attributes, PATH_TO_DIR + "deaths.csv")
    create_df(vaccinations_attributes, PATH_TO_DIR + "vaccinations.csv")

def main():
    create_all()

if __name__ == "__main__":
    main()