#!/usr/bin/env python3

import pandas as pd
from conf_values import *

dataframe = pd.read_csv(PATH_TO_DIR + CSV_NAME)


def update_csv(df, attributes, filename):
    df[attributes].to_csv(filename, index=False)


def create_all(df):
    update_csv(df, COUNTRY_ATTRIBUTES, PATH_TO_DIR + "country.csv")
    update_csv(df, CASES_ATTRIBUTES, PATH_TO_DIR + "cases.csv")
    update_csv(df, DEATHS_ATTRIBUTES, PATH_TO_DIR + "deaths.csv")
    update_csv(df, VACCINATIONS_ATTRIBUTES, PATH_TO_DIR + "vaccinations.csv")


def main():
    create_all(dataframe)


if __name__ == "__main__":
    main()
