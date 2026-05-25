#!/usr/bin/python3
"""Serialize and deserialize a custom object with pickle"""

import pickle


class CustomObject:
    """Represent a custom object that can be pickled"""

    def __init__(self, name, age, is_student):
        """Initialize the object with name, age and is_student"""

        self.name = name
        self.age = age
        self.is_student = is_student

    def display(self):
        """Print the object attributes"""

        print("Name: {}".format(self.name))
        print("Age: {}".format(self.age))
        print("Is Student: {}".format(self.is_student))

    def serialize(self, filename):
        """Serialize the current object into a binary file"""

        try:
            with open(filename, mode="wb") as f:
                pickle.dump(self, f)
        except Exception:
            return None

    @classmethod
    def deserialize(cls, filename):
        """Load and return an object from a binary file"""

        try:
            with open(filename, mode="rb") as f:
                return pickle.load(f)
        except Exception:
            return None
