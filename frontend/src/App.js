import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
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
  
	const itemNameInputRef = useRef(null);
	const itemValueInputRef = useRef(null);
	const [isClearConfirmVisible, setIsClearConfirmVisible] = useState(false);
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
			// Send the items as an array of objects, not as a key-value pair object
			const response = await axios.post(
				"http://127.0.0.1:5000/optimize",
				{ items: items, cost }
			);
			setResult(response.data);
		} catch (error) {
			console.error("Error in optimization request", error);
		}
	};

    const handleClearData = () => {
        setIsClearConfirmVisible(true);
    };
	
    const confirmClearData = () => {
        Cookies.remove("items");
        Cookies.remove("cost");
        Cookies.remove("result");
        setItems([]);
        setCost(0);
        setResult(null);
        setIsClearConfirmVisible(false); // Close the modal after clearing
    };

	const cancelClearData = () => {
        setIsClearConfirmVisible(false); // Close the modal without clearing
    };

    const handleRemoveHighlightedItems = () => {
        if (result && result.selectedItems) {
            const highlightedNames = result.selectedItems.map(item => item.name);
            const remainingItems = items.filter(item => !highlightedNames.includes(item.name));
            setItems(remainingItems);
        }
    };
	// Apply styles for the background
    const handleItemNameKeyDown = (e) => {
        if (e.keyCode === 13) { // Enter key
            e.preventDefault();
            itemValueInputRef.current.focus();
        }
    };


	const handleItemValueKeyDown = (e) => {
        if (e.keyCode === 13) { // Enter key
            e.preventDefault();
            handleAddItem(e);
            itemNameInputRef.current.focus();
        }
    };
    return (
        <div className="min-h-screen min-w-full bg-cover bg-center" style={{backgroundImage: `url('/lethal-company-dance.gif')`}}>
            <div className="container mx-auto p-4 text-white">
                <h1 className="text-center text-4xl mb-4">
                    Belal's Quota Optimizer
                </h1>
                <div className="text-center">
                    <button onClick={toggleTutorialModal} className="bg-blue-500 text-white py-2 px-4 rounded mb-3 transform transition duration-150 ease-in-out active:scale-75">Tutorial</button>
                </div>
                <form onSubmit={handleAddItem} className="mb-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="form-label">
                                Item Name (optional)
                            </label>
							<input
								type="text"
								className="w-full p-2 border-4 border-slate-900 rounded bg-gray-700 text-white"
								value={newItemName}
								onChange={(e) => setNewItemName(e.target.value)}
								onKeyDown={handleItemNameKeyDown}
								ref={itemNameInputRef}
								placeholder="Enter item name"
							/>
							<p className="text-xs text-gray-300">
                                Pro Tip: Press Enter to move to the next field!
                            </p>
                        </div>
                        <div>
                            <label className="form-label">
                                Item Value
                            </label>
							<input
								type="number"
								className="w-full p-2 border-4 border-slate-900 rounded bg-gray-700 text-white"
								value={newItemValue}
								onChange={(e) => setNewItemValue(e.target.value)}
								onKeyDown={handleItemValueKeyDown}
								ref={itemValueInputRef}
								placeholder="Enter item value"
							/>
							<p className="text-xs text-gray-300">
                                Pro Tip: Press Enter to add the item!
                            </p>
                        </div>
                        <div className="flex justify-end">
						<button
							className="bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 text-white py-2 px-4 rounded transform transition duration-150 ease-in-out active:scale-75 shadow-lg font-semibold"
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
						className="w-full p-2 border-4 border-slate-900 rounded bg-gray-700 text-white"
						value={cost}
						onChange={(e) => setCost(parseFloat(e.target.value))}
					/>
				</div>

				<div className="flex flex-wrap justify-between">
					<div className="mt-2 sm:mt-0">
						<button
                            className="bg-blue-500 text-white py-2 px-4 rounded transform transition duration-150 ease-in-out active:scale-75"
                            onClick={handleSubmit}
                        >
								Optimize
						</button>
					</div>

					{result && result.selectedItems && (
						<div className="mt-2 sm:mt-1">
							<button
								className="bg-amber-800 text-white py-2 px-4 rounded transform transition duration-150 ease-in-out active:scale-75"
								onClick={handleRemoveHighlightedItems}
							>
								Delete Highlighted Items
							</button>
						</div>
					)}
					<div className="mt-2 sm:mt-0">
					<button
                            className="bg-red-500 text-white py-2 px-4 rounded transform transition duration-150 ease-in-out active:scale-75"
                            onClick={handleClearData}
                        >
							Clear List
						</button>
					</div>
				</div>

				{items.length > 0 && (
				<ul className="flex mt-3 flex-col gap-2">
					{items.map((item, index) => {
						const isHighlighted = result && result.selectedItems.some(selectedItem => selectedItem.name === item.name);
						const itemClasses = `list-group-item ${isHighlighted ? 'border-4 border-green-900 bg-green-700' : 'border-4 border-slate-900 bg-gray-700'} text-white flex justify-between items-center rounded p-2`;

						return (
							<li key={index} className={itemClasses}>
								{item.name}: ${item.value}
								<button
									className="bg-red-500 text-white py-1 px-2 rounded text-xs transform transition duration-150 ease-in-out active:scale-75"
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
                    <div className="p-3 mt-3 rounded bg-green-700 text-white">
                        <div>
                            Optimal Selection:{" "}
                            {result.selectedItems.map(item => `${item.name} ($${item.value})`).join(', ')}
                        </div>
                        <div>Total Value: ${result.totalValue}</div>
                    </div>
                )}
				            {isClearConfirmVisible && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="bg-red-800 p-5 rounded">
                        <h2>Are you sure you want to clear the list?</h2>
                        <div className="flex justify-around mt-4">
                            <button onClick={confirmClearData} className="bg-green-500 text-white py-2 px-4 rounded">
                                Yes, Clear List
                            </button>
                            <button onClick={cancelClearData} className="bg-red-500 text-white py-2 px-4 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
				
                <TutorialModal isVisible={isTutorialVisible} onClose={toggleTutorialModal} gifUrl="/Tutorial.gif" />
            </div>
        </div>
    );
}

export default App;