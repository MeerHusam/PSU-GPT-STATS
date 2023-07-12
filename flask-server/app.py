from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Connect to the SQLite database (or create it)
conn = sqlite3.connect("ratings.db")

# Create a cursor object
cur = conn.cursor()


@app.route("/averageScore")
def average_score():
    rows = cur.execute("SELECT AVG(rating) FROM llm_data").fetchall()
    conn.close()
    return jsonify(rows)


@app.route("/numResponses")
def index():
    rows = cur.execute("SELECT * FROM llm_data WHERE rating IS NOT NULL").fetchall()
    conn.close()
    return jsonify({"numResponses": len(rows)})


@app.route("/ratingsCount")
def ratings_count():
    rows = cur.execute(
        "SELECT column_name, COUNT(*) FROM llm_data GROUP BY column_name"
    ).fetchall()
    conn.close()
    # Convert tuple to dictionary
    results_dict = {str(rating): count for rating, count in rows}
    return jsonify(results_dict)


if __name__ == "__main__":
    app.run(debug=True)
