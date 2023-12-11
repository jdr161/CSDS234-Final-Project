#!/usr/bin/env python3

import requests
import psycopg2
from conf_values import *
from split_big_csv import *

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


def connect_and_update():

    connection = psycopg2.connect(user=DB_USER, password=DB_PASS,
                                  host=DB_HOST, port=DB_PORT, database=DB_NAME)

    cursor = connection.cursor()

    # open csv
    f = open(PATH_TO_DIR + CSV_NAME, 'r')

    # skip header
    f.readline()

    # remove old data
    cursor.execute("DELETE FROM " + DB_SCHEMA + "." + DB_TABLE)

    # commit
    connection.commit()

    # insert csv
    cursor.copy_from(f, DB_TABLE, sep=',', null="")

    # commit
    connection.commit()

    # close
    connection.close()


def main():
    update_CSV()
    connect_and_update()

if __name__ == "__main__":
    main()
