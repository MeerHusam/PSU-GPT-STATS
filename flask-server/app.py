from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


def get_db_connection():
    conn = sqlite3.connect("ratings.db")
    cur = conn.cursor()
    return conn, cur


@app.route("/averageScore")
def average_score():
    conn, cur = get_db_connection()
    try:
        rows = cur.execute("SELECT AVG(rating) FROM llm_data").fetchall()
    except Exception as e:
        print(e)
        return jsonify({"error": "Database error"}), 500
    finally:
        conn.close()
    return jsonify(rows)


@app.route("/numResponses")
def num_responses():
    conn, cur = get_db_connection()
    try:
        rows = cur.execute(
            "SELECT * FROM llm_data WHERE rating IS NOT NULL").fetchall()
    except Exception as e:
        print(e)
        return jsonify({"error": "Database error"}), 500
    finally:
        conn.close()
    return jsonify({"numResponses": len(rows)})


@app.route("/ratingsCount")
def ratings_count():
    conn, cur = get_db_connection()
    try:
        rows = cur.execute(
            "SELECT rating, COUNT(*) FROM llm_data GROUP BY rating"
        ).fetchall()
    except Exception as e:
        print(e)
        return jsonify({"error": "Database error"}), 500
    finally:
        conn.close()
    results_dict = {str(rating): count for rating, count in rows}
    return jsonify(results_dict)


if __name__ == "__main__":
    app.run(debug=True)
