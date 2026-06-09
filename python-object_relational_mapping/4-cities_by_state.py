#!/usr/bin/python3
"""Lists all cities with their state from hbtn_0e_4_usa"""

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
    query = ("SELECT cities.id, cities.name, states.name FROM cities "
             "JOIN states ON cities.state_id = states.id "
             "ORDER BY cities.id ASC")
    cur.execute(query)
    rows = cur.fetchall()
    for line in rows:
        print(line)
    cur.close()
    db.close()
