from flask import Flask, request, jsonify
from flask_cors import CORS
from find_best_items import knapsack_dp

app = Flask(__name__)
CORS(app)

@app.route('/optimize', methods=['POST'])
def optimize():
    data = request.json
    items = data['items']
    cost = data['cost']
    selected_items, total_value = knapsack_dp(items, cost)
    return jsonify({"selectedItems": selected_items, "totalValue": total_value})

if __name__ == '__main__':
    app.run(debug=True)