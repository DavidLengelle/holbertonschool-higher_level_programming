#!/usr/bin/python3
"""Simple REST API built with the Flask framework"""

from flask import Flask, jsonify, request

app = Flask(__name__)

users = {}


@app.route("/")
def home():
    """Return a welcome message at the root URL"""

    return "Welcome to the Flask API!"


@app.route("/data")
def get_data():
    """Return the list of all stored usernames"""

    return jsonify(list(users.keys()))


@app.route("/status")
def status():
    """Return the API status"""

    return "OK"


@app.route("/users/<username>")
def get_user(username):
    """Return the full object for a given username"""

    if username in users:
        return jsonify(users[username])
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/add_user", methods=["POST"])
def add_user():
    """Add a new user from the posted JSON data"""

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"error": "Invalid JSON"}), 400

    if "username" not in data:
        return jsonify({"error": "Username is required"}), 400

    username = data["username"]

    if username in users:
        return jsonify({"error": "Username already exists"}), 409

    users[username] = data
    return jsonify({"message": "User added", "user": data}), 201


if __name__ == "__main__":
    app.run()
