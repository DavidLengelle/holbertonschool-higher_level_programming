#!/usr/bin/python3
"""Displays all states matching the argument, safe from SQL injection"""

import MySQLdb
import sys


if __name__ == "__main__":
    db = MySQLdb.connect(
        host="localhost",
        port=3306,
        user=sys.argv[1],
        passwd=sys.argv[2],
        db=sys.argv[3]
    )
    cur = db.cursor()
    query = "SELECT * FROM states WHERE BINARY name = %s ORDER BY id ASC"
    cur.execute(query, (sys.argv[4], ))
    rows = cur.fetchall()
    for line in rows:
        print(line)
    cur.close()
    db.close()
