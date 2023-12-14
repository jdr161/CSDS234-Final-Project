#!/usr/bin/env python3

import requests
import psycopg2
from conf_values import *
import pandas as pd


def split_csv(df, attributes, filename):
    df[attributes].drop_duplicates().to_csv(filename, index=False)


def create_all(df):
    #split_csv(df, COUNTRY_ATTRIBUTES, PATH_TO_DIR + "country.csv")
    split_csv(df, CASES_ATTRIBUTES, PATH_TO_DIR + "cases.csv")
    split_csv(df, DEATHS_ATTRIBUTES, PATH_TO_DIR + "deaths.csv")
    split_csv(df, VACCINATIONS_ATTRIBUTES, PATH_TO_DIR + "vaccinations.csv")


def update_CSV():

    try:
        r = requests.get(REQUEST_URL)
    except requests.exceptions.RequestException as e:
        print("Bad Request")
        print("Error: ", e)

    num_bytes = len(r.content)
    bytes_written = 0
    with open(PATH_TO_DIR + CSV_NAME, 'wb') as f:
        bytes_written = f.write(r.content)

    if (bytes_written != num_bytes):
        print("Bad Write")

    dataframe = pd.read_csv(PATH_TO_DIR + CSV_NAME,
                            usecols=ALL_ATTRIBUTES, low_memory=True)

    create_all(dataframe)


def truncate(tablenames, con, cur):
    for tablename in tablenames:
        cur.execute("TRUNCATE " + DB_SCHEMA + "." + tablename)
        con.commit()


def copy_to_db(tablenames, con, cur):
    for tablename in tablenames:
        f = open(PATH_TO_DIR + tablename + ".csv", 'r')
        f.readline()
        cur.copy_from(f, tablename, sep=',', null="")
        con.commit()
        f.close()


def connect_and_update():

    connection = psycopg2.connect(
        user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT, database=DB_NAME)

    cursor = connection.cursor()

    truncate(DB_TABLES, connection, cursor)

    copy_to_db(DB_TABLES, connection, cursor)

    connection.close()


def main():
    update_CSV()
    connect_and_update()


if __name__ == "__main__":
    main()
