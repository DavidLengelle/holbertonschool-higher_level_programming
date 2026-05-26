#!/usr/bin/python3
"""Convert a CSV file into a JSON file"""

import csv
import json


def convert_csv_to_json(filename):
    """Convert a CSV file to data.json and return True on success"""

    try:
        with open(filename, mode="r") as f:
            reader = csv.DictReader(f)
            data = list(reader)
        with open("data.json", mode="w") as f:
            json.dump(data, f)
        return True
    except Exception:
        return False
