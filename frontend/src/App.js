import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DarkMode.css";

function App() {
	const [items, setItems] = useState([]);
	const [newItemName, setNewItemName] = useState("");
	const [newItemValue, setNewItemValue] = useState("");
	const [cost, setCost] = useState(0);
	const [result, setResult] = useState(null);

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

	const handleSubmit = async () => {
		try {
			const itemsObject = items.reduce(
				(obj, item) => ({ ...obj, [item.name]: item.value }),
				{}
			);
			const response = await axios.post(
				"http://localhost:5000/optimize",
				{ items: itemsObject, cost }
			);
			setResult(response.data);
		} catch (error) {
			console.error("Error in optimization request", error);
		}
	};

	return (
		<div className="container mt-5 custom-dark">
			<h1 className="text-center mb-4 text-white">Belal's Item Optimizer</h1>

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
							onChange={(e) => setNewItemValue(e.target.value)}
						/>
					</div>
					<div className="col-auto">
						<button className="btn custom-dark-btn" type="submit">
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

			<button
				className="btn btn-success mb-3 custom-dark-btn"
				onClick={handleSubmit}
			>
				Optimize
			</button>

			{items.length > 0 && (
				<ul className="list-group custom-dark-list">
					{items.map((item, index) => (
						<li
							key={index}
							className="list-group-item custom-dark-list-item"
						>
							{item.name}: ${item.value}
						</li>
					))}
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
	);
}

export default App;
