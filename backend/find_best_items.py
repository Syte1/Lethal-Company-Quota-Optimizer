from itertools import combinations

def knapsack_dp(items, cost):
    # Convert list of tuples to list of values and names
    values = [item[1] for item in items]
    names = [item[0] for item in items]
    n = len(values)

    # Maximum value could be the sum of all values
    max_value = sum(values)

    # Initialize the DP table with tuples (float('inf'), [])
    dp = [[(float('inf'), []) for _ in range(max_value + 1)] for _ in range(n + 1)]
    
    # Base case: minimum excess is 0 when total value is 0
    for i in range(n + 1):
        dp[i][0] = (0, [])

    # Build the table in a bottom-up manner
    for i in range(1, n + 1):
        for j in range(1, max_value + 1):
            # Exclude the item
            dp[i][j] = dp[i - 1][j]

            # Include the item, if possible
            if values[i - 1] <= j:
                prev_excess, prev_items = dp[i - 1][j - values[i - 1]]
                new_excess = prev_excess + values[i - 1]

                # Update if this leads to a lower excess
                if new_excess < dp[i][j][0]:
                    dp[i][j] = (new_excess, prev_items + [(names[i - 1], values[i - 1])])

    # Find the minimum value >= cost
    for j in range(cost, max_value + 1):
        if dp[n][j][0] != float('inf'):
            final_value, selected_items = dp[n][j]
            break

    return selected_items, final_value

# List of items as tuples (name, value)
# items = [
#     ("cap", 53),
#     ("baseball", 42),
#     ("snake", 21),
#     ("banana", 4),
#     ("cash register", 95),
#     ("ape", 32),
#     ("banana", 33),
#     ("banana", 1),
#     ("computer", 254),
#     ("rocket", 149)
# ]

# cost = 34
# selected_items, total_value = knapsack_dp(items, cost)
# print(selected_items, total_value)
