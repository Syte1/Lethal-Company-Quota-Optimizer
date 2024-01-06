from itertools import combinations

def knapsack_dp(items, cost):
    # List of item values
    values = list(items.values())
    # Total number of items
    n = len(values)

    # Maximum value could be the sum of all values
    max_value = sum(items.values())

    # Initialize the DP table
    # dp[i][j] will hold the minimum excess when considering the first i items to achieve a total value of j
    dp = [[float('inf')] * (max_value + 1) for _ in range(n + 1)]
    
    # Base case: minimum excess is 0 when total value is 0
    for i in range(n + 1):
        dp[i][0] = 0

    # Build the table in a bottom-up manner
    for i in range(1, n + 1):
        for j in range(1, max_value + 1):
            # If the current item's value is greater than the current total value j
            # we can't include this item
            if values[i - 1] > j:
                dp[i][j] = dp[i - 1][j]
            else:
                # Otherwise, we decide to include or exclude the item
                # and take the minimum of these two choices
                dp[i][j] = min(dp[i - 1][j], 
                               dp[i - 1][j - values[i - 1]] + values[i - 1])

    # Find the minimum value >= cost
    for j in range(cost, max_value + 1):
        if dp[n][j] != float('inf'):
            final_value = j
            break

    # Backtrack to find which items are included
    selected_items = []
    for i in range(n, 0, -1):
        if dp[i][j] != dp[i - 1][j]:
            item_name = list(items.keys())[i - 1]
            item_value = items[item_name]
            selected_items.append((item_name, item_value))
            j -= values[i - 1]

    return selected_items, final_value

# Apply the dynamic programming solution
# items = {
#     "cap": 53,
#     "baseball": 42,
#     "snake": 21,
#     "banana": 3,
#     "shoe": 31,
#     "cash register": 95,
#     "league": 2,
#     "daniel": 31,
#     "ape": 32,
#     "computer": 254,
#     "rocket": 149
# }
# cost = 421
# selected_items, total_value = knapsack_dp(items, cost)
# print(selected_items, total_value)

