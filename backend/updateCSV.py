#!/usr/bin/env python3

import requests
import psycopg2
from conf_values import *
import split_big_csv as split
import pandas as pd



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

    dataframe = pd.read_csv(PATH_TO_DIR + CSV_NAME)

    split.create_all(dataframe)


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

    # open csv
    # for tablename in DB_TABLES:
    #    with open(PATH_TO_DIR + tablename + ".csv", 'r') as f:
    #        # skip header
    #        f.readline()
    #
    #        # remove old data
    #        cursor.execute("TRUNCATE " + DB_SCHEMA + "." + tablename)
    #
    #        # commit
    #        connection.commit()
    #
    #        # insert csv
    #        cursor.copy_from(f, tablename, sep=',', null="")
    #
    #        # commit
    #        connection.commit()

    connection.close()



def main():
    update_CSV()
    connect_and_update()


if __name__ == "__main__":
    main()
