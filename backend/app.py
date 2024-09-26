from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
import os

openai.api_key = os.environ["OPENAI_API_KEY"]

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/news/<pref>', methods=['GET'])
def news(pref):
    print("news")
    if pref == "愛知":
        news = "とんでもなく大きい大根が取れました"
    else:
        prompt = f"{pref}に関するニュースを100文字以内で教えてください。"
        try:
            response = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "user", "content": prompt},
                ],
            )
            news = response.choices[0].message.content
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    return jsonify({"news": news})

if __name__ == '__main__':
    app.run(debug=True)