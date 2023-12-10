import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import "./DarkMode.css";
// import animationGif from "./lethal-company-dance.gif";

function App() {
	// Initialize state with values from cookies or default to empty array / null
	const [items, setItems] = useState(() => {
		const savedItems = Cookies.get("items");
		return savedItems ? JSON.parse(savedItems) : [];
	});
	const [cost, setCost] = useState(() => {
		const savedCost = Cookies.get("cost");
		return savedCost ? parseFloat(savedCost) : 0;
	});
	const [result, setResult] = useState(() => {
		const savedResult = Cookies.get("result");
		return savedResult ? JSON.parse(savedResult) : null;
	});
	const [newItemName, setNewItemName] = useState("");
	const [newItemValue, setNewItemValue] = useState("");

	useEffect(() => {
		// Update cookies whenever items or result change
		Cookies.set("items", JSON.stringify(items));
		Cookies.set("cost", cost);
		Cookies.set("result", JSON.stringify(result));
	}, [items, cost, result]);

	const handleAddItem = (e) => {
		e.preventDefault();
		if (newItemValue) {
			const newItem = {
				name: newItemName || `Item ${items.length + 1}`,
				value: parseFloat(newItemValue),
			};
			setItems([...items, newItem]);
			setNewItemName("");
			setNewItemValue("");
		} else {
			alert("Please enter a value for the item.");
		}
	};
	const handleDeleteItem = (index) => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setItems(newItems);
		// Optionally remove or update the result since the item list has changed
		setResult(null);
	};

	const handleSubmit = async () => {
		try {
			const itemsObject = items.reduce(
				(obj, item) => ({ ...obj, [item.name]: item.value }),
				{}
			);
			const response = await axios.post(
				"https://lethal-company-item-optimizer-backend.onrender.com/optimize",
				{ items: itemsObject, cost }
			);
			setResult(response.data);
		} catch (error) {
			console.error("Error in optimization request", error);
		}
	};

	const handleClearData = () => {
		Cookies.remove("items");
		Cookies.remove("cost");
		Cookies.remove("result");
		setItems([]);
		setCost(0);
		setResult(null);
	};

  const handleRemoveHighlightedItems = () => {
    if (result && result.selectedItems) {
        const remainingItems = items.filter(item => !result.selectedItems.includes(item.name));
        setItems(remainingItems);
        // Optionally, you can also clear the result if you want
        // setResult(null);
    }
};
	// Apply styles for the background
	const backgroundStyle = {
		minWidth: "100vh", // Minimum height to fill the viewport height
    minHeight: "100vh",
		background: `url('/lethal-company-dance.gif') no-repeat center center`,
		backgroundSize: "cover", // Cover the entire viewport
	};

	return (
		<div style={backgroundStyle}>
			<div className="container mt-5 custom-dark">
				<h1 className="text-center mb-4 text-white">
					Belal's Item Optimizer
				</h1>

				<form onSubmit={handleAddItem} className="mb-3">
					<div className="row g-3 align-items-end">
						<div className="col">
							<label className="form-label text-white">
								Item Name (optional)
							</label>
							<input
								type="text"
								className="form-control custom-dark-input"
								value={newItemName}
								onChange={(e) => setNewItemName(e.target.value)}
							/>
						</div>
						<div className="col">
							<label className="form-label text-white">
								Item Value
							</label>
							<input
								type="number"
								className="form-control custom-dark-input"
								value={newItemValue}
								onChange={(e) =>
									setNewItemValue(e.target.value)
								}
							/>
						</div>
						<div className="col-auto">
							<button
								className="btn custom-dark-btn"
								type="submit"
							>
								Add Item
							</button>
						</div>
					</div>
				</form>

				<div className="mb-3">
					<label className="form-label text-white">Cost</label>
					<input
						type="number"
						className="form-control custom-dark-input"
						value={cost}
						onChange={(e) => setCost(parseFloat(e.target.value))}
					/>
				</div>

				<div className="mb-3 d-flex justify-content-between">
					<button
						className="btn btn-success custom-dark-btn"
						onClick={handleSubmit}
					>
						Optimize
					</button>
					<button
						className="btn btn-danger custom-dark-btn"
						onClick={handleClearData}
					>
						Clear List
					</button>
          {result && result.selectedItems && (
                        <button
                            className="btn btn-warning custom-dark-btn"
                            onClick={handleRemoveHighlightedItems}
                        >
                            Remove Highlighted Items
                        </button>
                    )}
				</div>

        {items.length > 0 && (
            <ul className="list-group custom-dark-list">
                {items.map((item, index) => {
                    // Check if the item is in the optimized list
                    const isHighlighted = result && result.selectedItems.includes(item.name);
                    const itemClasses = `list-group-item custom-dark-list-item ${isHighlighted ? 'highlighted-item' : ''} d-flex justify-content-between align-items-center`;
                    return (
                        <li key={index} className={itemClasses}>
                            {item.name}: ${item.value}
								<button
									className="btn btn-sm btn-danger"
									onClick={() => handleDeleteItem(index)}
								>
									x
								</button>
							</li>
						)})}
					</ul>
				)}

				{result && (
					<div className="alert alert-info mt-3 custom-dark-alert">
						<div>
							Optimal Selection:{" "}
							{JSON.stringify(result.selectedItems)}
						</div>
						<div>Total Value: ${result.totalValue}</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
