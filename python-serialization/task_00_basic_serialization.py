#!/usr/bin/python3
"""Serialize a dictionary to a JSON file and deserialize it back"""

import json


def serialize_and_save_to_file(data, filename):
    """Serialize a dictionary and save it to a JSON file"""

    with open(filename, mode="w") as f:
        json.dump(data, f)


def load_and_deserialize(filename):
    """Load a JSON file and deserialize it into a dictionary."""

    with open(filename, mode="r") as f:
        data = json.load(f)
    return data
