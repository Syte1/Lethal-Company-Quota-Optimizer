import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import "./DarkMode.css";
import TutorialModal from './TutorialModal';
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
  const toggleTutorialModal = () => {
    setIsTutorialVisible(!isTutorialVisible);
  };

	const [newItemName, setNewItemName] = useState("");
	const [newItemValue, setNewItemValue] = useState("");
  const [isTutorialVisible, setIsTutorialVisible] = useState(false);

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
			itemNameInputRef.current.focus();
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
				"http://127.0.0.1:5000/optimize",
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
            const highlightedNames = result.selectedItems.map(item => item.name);
            const remainingItems = items.filter(item => !highlightedNames.includes(item.name));
            setItems(remainingItems);
        }
    };
	// Apply styles for the background
	const backgroundStyle = {
		minWidth: "100vh", // Minimum height to fill the viewport height
    minHeight: "100vh",
		background: `url('/lethal-company-dance.gif') no-repeat center center`,
		backgroundSize: "cover", // Cover the entire viewport
	};
	const itemNameInputRef = useRef(null);
	return (
		<div style={backgroundStyle}>
			<div className="container mt-5 custom-dark">
				<h1 className="text-center mb-4 text-white">
					Belal's Quota Optimizer
				</h1>
        <div className="text-center">
        <button onClick={toggleTutorialModal} className="btn btn-info mb-3">Tutorial</button>
        </div>
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
								ref={itemNameInputRef}
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
					<label className="form-label text-white">Quota</label>
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
                            const isHighlighted = result && result.selectedItems.some(selectedItem => selectedItem.name === item.name);
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
                            )
                        })}
                    </ul>
                )}

                {result && (
                    <div className="alert alert-info mt-3 custom-dark-alert">
                        <div>
                            Optimal Selection:{" "}
                            {result.selectedItems.map(item => `${item.name} ($${item.value})`).join(', ')}
                        </div>
                        <div>Total Value: ${result.totalValue}</div>
                    </div>
                )}
                <TutorialModal isVisible={isTutorialVisible} onClose={toggleTutorialModal} gifUrl="/Tutorial.gif" />
            </div>
        </div>
    );
}

export default App;