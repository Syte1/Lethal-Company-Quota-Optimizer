from flask import Flask, request, jsonify
from flask_cors import CORS
from find_best_items import knapsack_dp

app = Flask(__name__)
CORS(app)

@app.route('/optimize', methods=['POST'])
def optimize():
    data = request.json
    items_data = data['items']
    cost = data['cost']

    # Convert items data from dictionaries to tuples
    items = [(item['name'], item['value']) for item in items_data]

    selected_items, total_value = knapsack_dp(items, cost)
    formatted_selected_items = [{"name": name, "value": value} for name, value in selected_items]
    return jsonify({"selectedItems": formatted_selected_items, "totalValue": total_value})

if __name__ == '__main__':
    app.run(debug=True)
